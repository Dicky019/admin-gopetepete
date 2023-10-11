import { userCreateSchema } from "@/schemas/user";
import { UserRole } from "@prisma/client";
import { z } from "zod";

export type IUserCreate = z.infer<typeof userCreateSchema>;

export interface IUser {
    id: string;
    name: string;
    email: string;
    password?: string;
    status: string;
    image?: string;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
  }
  