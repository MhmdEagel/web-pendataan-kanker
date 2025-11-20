import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/db";
import { getUserById } from "./data/user";
import { getTwoFactorConfirmationById } from "./data/two-factor-confirmation";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
  callbacks: {
    async signIn({ user }) {
      const existingUser = await getUserById(user.id);
      if (existingUser?.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationById(
          existingUser.id
        );
        if (!twoFactorConfirmation) return false;

        // delete 2fa confirmation for the next sign in
        await db.twoFactorConfirmation.delete({
          where: {
            id: twoFactorConfirmation.id,
          },
        });
      }
      return true;
    },
    async session({ token, session }) {
      if (token.sub && session.user && token.role) {
        session.user.id = token.sub;
      }
      if (session.user && token.fullname) {
        session.user.fullname = token.fullname;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (!token.sub) return token;
      if (user) {
        token.fullname = user.fullname;
      }
      return token;
    },
  },
});
