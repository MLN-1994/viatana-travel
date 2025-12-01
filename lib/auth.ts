import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

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
        // Usuario admin hardcodeado
        const adminUser = {
          id: "1",
          username: "admin",
          password: "admin123"
        }

        if (!credentials?.username || !credentials?.password) {
          return null
        }

        // Verificar usuario y contraseña
        if (
          credentials.username === adminUser.username && 
          credentials.password === adminUser.password
        ) {
          return {
            id: adminUser.id,
            name: adminUser.username,
            email: "admin@viatana.com"
          }
        }

        return null
      }
    })
  ],
  pages: {
    signIn: "/admin/login"
  },
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
      }
      return session
    }
  }
})
