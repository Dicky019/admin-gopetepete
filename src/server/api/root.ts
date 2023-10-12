import { authRouter } from "./router/auth";
import { driverRouter } from "./router/driver";
import { ruteRouter } from "./router/rute";
import { userRouter } from "./router/user";

// import { postRouter } from "./router/post";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  driver: driverRouter,
  user: userRouter,
  rute: ruteRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
