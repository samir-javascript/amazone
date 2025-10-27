import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { api } from "./lib/api";


import { IUser } from "./types/actionTypes";
import { LoginValidationSchema } from "./lib/zod";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    // Credentials({
    //   async authorize(credentials) {
    //     const validatedFields = LoginValidationSchema.safeParse(credentials);

    //     if (validatedFields.success) {
    //       const { email, password } = validatedFields.data;

    //       const { data: existingUser } = (await api.users.getByEmail(
    //         email
    //       )) as ActionResponse<IUser>;
    //       if (!existingUser) return null;

    //       // const { data: existingAccount } = (await api.accounts.getByUserId(
    //       //   existingUser._id
    //       // )) as ActionResponse<IAccount>;
    //       // if (!existingAccount) return null;

    //       // Optional: enforce email verification
    //       // if (!existingUser.isVerified) throw new Error("Email is not verified. Please verify your email.");

    //       const isValidPassword = await bcrypt.compare(
    //         password,
    //         existingUser.hashedPassword!
    //       );

    //       if (isValidPassword) {
    //         return {
    //           id: existingUser._id,
    //           name: existingUser.fullName,
    //           email: existingUser.email,
    //           image: existingUser.profilePictureUrl,
    //           isAdmin: existingUser.isAdmin,
    //         };
    //       }
    //     }

    //     return null;
    //   },
    // }),
  ],

  // callbacks: {
  //   async session({ session, token }) {
  //     session.user.id = token.sub as string;
  //     session.user.isAdmin = token.isAdmin as boolean;
  //     return session;
  //   },

  //   async jwt({ token, user }) {
  //     if (user) {
  //       token.sub = user.id;
  //       token.isAdmin = user.isAdmin;
  //     }
  //     return token;
  //   },

  //   async signIn({ account }) {
  //     // Only allow credentials-based sign-in (no OAuth)
  //     return account?.type === "credentials";
  //   },
  // },
});
