import type { NextAuthOptions } from "next-auth";
import credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "../db/dbConnect";
import User from "@/lib/db/models/User";

export const authOptions: NextAuthOptions = {
  providers: [
    credentials({
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        await dbConnect();
        const user = await User.findOne({
          email: credentials?.email
        })
          .select("+password +isDeleted")
          .exec();

        if (!user) throw new Error("Wrong Email");

        if (user.isDeleted) throw new Error("User Deleted");

        const passwordMatch = await bcrypt.compare(credentials!.password, user.password);

        if (!passwordMatch) throw new Error("Wrong Password");
        return { ...user.toObject(), role: user.role };
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 15 * 60 * 1000
  },
  callbacks: {
    jwt({ token, user, account }) {
      if (account) {
        token.accessToken = account.access_token as string;
      }
      if (user) {
        token.role = (user as any).role;
        token.image = (user as any).image;
        token.phone = (user as any).phone;
        token.sub = (user as any)._id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
        session.user.image = token.image as string;
        session.user.phone = token.phone as string;
        session.user.id = token.sub as string;
        session.accessToken = token.access_token as string;
      }
      return { ...session, user: session.user, accessToken: session.accessToken };
    }
  },
  secret: process.env.AUTH_SECRET
};
