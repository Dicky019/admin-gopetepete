import { userCreateSchema } from "@/schemas/user";
import { z } from "zod";

export type IUserCreate = z.infer<typeof userCreateSchema>;