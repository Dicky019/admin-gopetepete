import { env } from "@/env";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const authRouter = createTRPCRouter({
  getSession: protectedProcedure.query(({ ctx }) => {
    return ctx.session;
  }),
  getSecretToken: publicProcedure.query(() => {
    // testing type validation of overridden next-auth Session in @acme/auth package
    const number = Math.floor(Math.random() * 11);
    // console.log({ number });

    return number;
  }),
});
