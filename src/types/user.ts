import { userCreateSchema } from "@/schemas/user";

import { z } from "zod";
import { inferRouterOutputs } from "@trpc/server";
import { AppRouter } from "@/server/api";

type RouterOutput = inferRouterOutputs<AppRouter>;

export type IUserCreate = z.infer<typeof userCreateSchema>;

export type IUser = RouterOutput["user"]["getAll"]["all"][number];
