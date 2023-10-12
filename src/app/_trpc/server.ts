import { appRouter, createTRPCContext } from "@/server/api";

export const serverClient = async () =>
  appRouter.createCaller(await createTRPCContext());
