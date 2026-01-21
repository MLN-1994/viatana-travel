import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { supabaseAdmin } from "./supabase"

// Tipos para la tabla admin_users
interface AdminUser {
  id: string
  email: string
  username: string
  password_hash: string
  role: string
  is_active: boolean
  login_attempts: number
  locked_until: string | null
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET,
  trustHost: true,
  providers: [
    Credentials({
      credentials: {
        username: { label: "Usuario", type: "text" },
        password: { label: "Contraseña", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null
        }

        try {
          // Buscar usuario por username o email
          const { data: user, error } = await supabaseAdmin
            .from('admin_users')
            .select('*')
            .or(`username.eq.${credentials.username},email.eq.${credentials.username}`)
            .single()

          if (error || !user) {
            // Registrar intento fallido
            await logLoginAttempt(credentials.username as string, false, null)
            return null
          }

          const adminUser = user as AdminUser

          // Verificar si la cuenta está activa
          if (!adminUser.is_active) {
            return null
          }

          // Verificar si la cuenta está bloqueada
          if (adminUser.locked_until && new Date(adminUser.locked_until) > new Date()) {
            return null
          }

          // Verificar contraseña
          const isValidPassword = await bcrypt.compare(
            credentials.password as string,
            adminUser.password_hash
          )

          if (!isValidPassword) {
            // Incrementar contador de intentos fallidos
            await incrementLoginAttempts(adminUser.id)
            await logLoginAttempt(credentials.username as string, false, adminUser.id)
            return null
          }

          // Login exitoso: resetear intentos fallidos y actualizar last_login
          await supabaseAdmin
            .from('admin_users')
            .update({ 
              login_attempts: 0, 
              locked_until: null,
              last_login: new Date().toISOString()
            })
            .eq('id', adminUser.id)

          // Registrar login exitoso
          await logLoginAttempt(adminUser.email, true, adminUser.id)

          return {
            id: adminUser.id,
            name: adminUser.username,
            email: adminUser.email,
            role: adminUser.role
          }
        } catch (error) {
          console.error('Error en autenticación:', error)
          return null
        }
      }
    })
  ],
  pages: {
    signIn: "/admin/login"
  },
  session: {
    strategy: "jwt",
    maxAge: 12 * 60 * 60 // 43,200 segundos (12 horas)
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = (user as any).role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
      }
      return session
    }
  }
})

// Función para incrementar intentos de login fallidos
async function incrementLoginAttempts(userId: string) {
  const { data: user } = await supabaseAdmin
    .from('admin_users')
    .select('login_attempts')
    .eq('id', userId)
    .single()

  if (user) {
    const newAttempts = (user.login_attempts || 0) + 1
    const updates: any = { login_attempts: newAttempts }

    // Bloquear cuenta después de 5 intentos fallidos (15 minutos)
    if (newAttempts >= 5) {
      updates.locked_until = new Date(Date.now() + 15 * 60 * 1000).toISOString()
    }

    await supabaseAdmin
      .from('admin_users')
      .update(updates)
      .eq('id', userId)
  }
}

// Función para registrar intentos de login (auditoría)
async function logLoginAttempt(
  email: string, 
  success: boolean, 
  userId: string | null
) {
  try {
    await supabaseAdmin
      .from('admin_login_logs')
      .insert({
        user_id: userId,
        email: email,
        success: success,
        // ip_address y user_agent se pueden agregar desde el request
      })
  } catch (error) {
    console.error('Error logging login attempt:', error)
  }
}
