
import type { NextAuthOptions } from "next-auth";
import credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectDB } from "./connection";
import User from "@/models/User";

export const authOptions: NextAuthOptions = {
  providers: [
    credentials({
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "text" },
      },
      async authorize(credentials) {
        await connectDB();
        const user = await User.findOne({
          email: credentials?.email,
        }).select("+password").select("+role");

        if (!user) throw new Error("Wrong Email");

        const passwordMatch = await bcrypt.compare(
          credentials!.password,
          user.password
        );

        if (!passwordMatch) throw new Error("Wrong Password");
        return { ...user.toObject(), role: user.role }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.image = (user as any).image;
        token.phone = (user as any).phone;
        token.sub = (user as any)._id;

      }
      return token;
    },
    session({ session, token }) {
      session.user.role = token.role as string;
      session.user.image = token.image as string;
      session.user.phone = token.phone as string;
      session.user.id = token.sub as string;
      return session;
    },
  },

};
