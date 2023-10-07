import { appRouter, createTRPCContext } from "@acme/api";

export const serverClient = async () =>
  appRouter.createCaller(await createTRPCContext());
