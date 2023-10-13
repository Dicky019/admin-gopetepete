import { UserRole } from "@prisma/client";
import { z } from "zod";

export const userCreateSchema = z.object({
  name: z.string(),
  email: z.string(),
  status: z.boolean(),
  image: z.string().optional(),
  role: z.nativeEnum(UserRole),
});

export const userChangeStatusSchema = z.object({
  id: z.string(),
  status: z.boolean(),
});
