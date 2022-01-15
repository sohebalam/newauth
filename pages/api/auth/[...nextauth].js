import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import TwitterProvider from "next-auth/providers/twitter"
import LinkedInProvider from "next-auth/providers/linkedin"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import connectDB from "../../../connectDB"
import NUser from "../../../models/userModel"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../../../lib/mongodb"


export default NextAuth({
  providers: [
    // OAuth authentication providers
    CredentialsProvider({
      async authorize(credentials) {
        connectDB()

        const { email, password } = credentials

        // console.log(credentials)

        // Check if email and password is entered
        if (!email || !password) {
          throw new Error("Please enter email or password")
        }

        // Find user in the database
        const user = await NUser.findOne({ email }).select("+password")

        if (!user) {
          throw new Error("Invalid Email or Password")
        }

        // Check if password is correct or not
        const match = await bcrypt.compare(password, user.password)
        if (!match) {
          throw new Error("Invalid Email or Password")
        }

        return Promise.resolve(user)
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),

    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_ID,
      clientSecret: process.env.TWITTER_SECRET,
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_ID,
      clientSecret: process.env.LINKEDIN_SECRET,
    }),
  ],
  //   pages: {
  //     signIn: "/login",
  //   },
  adapter: MongoDBAdapter(clientPromise),
  // database: process.env.DB,

  session: {
    jwt: true,
  },
  secret: process.env.SECRET,
  jwt: {
    secret: process.env.JWT_SECRET,
  },

  callbacks: {
    async jwt({ token, user }) {
      // console.log("token", token)
      return token
    },
    async session({ session, token }) {
      session.user.id = token?.sub

      // console.log("nextauth", session.user)

      return session
    },
  },
})
