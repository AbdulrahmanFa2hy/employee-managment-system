import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'

const users = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('adminpassword', 10),
    role: 'Admin'
  },
  {
    id: '2',
    name: 'HR User',
    email: 'hr@example.com',
    password: bcrypt.hashSync('hrpassword', 10),
    role: 'HR'
  }
]

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials) return null
        const user = users.find(user => user.email === credentials.email)
        if (user && bcrypt.compareSync(credentials.password, user.password)) {
          return { id: user.id, name: user.name, email: user.email, role: user.role }
        }
        return null
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role
      }
      return session
    }
  },
  pages: {
    signIn: '/auth/signin',
  }
})