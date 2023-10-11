import { PrismaAdapter } from "@auth/prisma-adapter";
import type { DefaultSession, NextAuthOptions } from "next-auth";
import NextAuth, { getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import { prisma } from "@/server/db";

import { env } from "@/env";
import type { GetServerSidePropsContext } from "next";
import { signInCheck, signInGoogle } from "@/services/sign-in";
import { User,} from "@prisma/client";

export type { Session } from "next-auth";

// Update this whenever adding new providers so that the client can
export const providers = ["google"] as const;
export type OAuthProviders = (typeof providers)[number];

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }

  interface Profile {
    email_verified: boolean;
    picture: string;
  }

  interface User {
    id: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string;
    email: string;
    picture: string;
    sub: string;
    iat: number;
    exp: number;
    jti: string;
    user: User;
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  // debug: env.NODE_ENV === "development",
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    signIn: async ({ profile, account, user }) => {
      console.log({ user, profile });

      if (account?.provider === "google") {
        if (!profile) {
          throw Error("Ada Yang Salah");
        }

        console.log({ account });

        return await signInGoogle({
          profile,
          account,
        });
      }

      const checkUser = await signInCheck({ user });

      if (!checkUser) {
        throw Error("Akun Kamu Tidak Terdaftar");
      }

      return checkUser != null;
    },
    // session: ({ session, user }) => ({
    //   ...session,
    //   user: {
    //     ...session.user,
    //     id: user.id,
    //   },
    // }),

    // // @TODO - if you wanna have auth on the edge
    jwt: ({ token, user }) => {
      user && (token.user = user as User);

      return token;
    },
    session: ({ session, token }) => {
      const user = token.user;
      return { ...session, user };
    },
    // // @TODO
    // authorized({ auth }) {
    //   console.log({ auth });

    //   return !!auth?.user;
    // },
  },
};

export const handler = NextAuth(authOptions);

type TContext = {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
} | null;

export const getServerAuthSession = (ctx: TContext = null) => {
  if (ctx) {
    return getServerSession(ctx.req, ctx.res, authOptions);
  }
  return getServerSession(authOptions);
};
