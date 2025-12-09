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
        // Lista de usuarios autorizados
        const users = [
          {
            id: "1",
            username: "admin",
            password: "admin123",
            email: "admin@viatana.com"
          },
          {
            id: "2",
            username: "viatana",
            password: "viatana2025",
            email: "info@viatana.com"
          }
          // Agregar más usuarios aquí:
          // {
          //   id: "3",
          //   username: "usuario3",
          //   password: "password3",
          //   email: "usuario3@viatana.com"
          // }
        ]

        if (!credentials?.username || !credentials?.password) {
          return null
        }

        // Buscar usuario en la lista
        const user = users.find(
          u => u.username === credentials.username && u.password === credentials.password
        )

        if (user) {
          return {
            id: user.id,
            name: user.username,
            email: user.email
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
