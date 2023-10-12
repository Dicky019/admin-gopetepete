import { z } from "zod";
import { UserRole } from "@prisma/client";
import { driverCreateSchema, driverEditSchema } from "@/schemas/driver";
import { inferRouterOutputs } from "@trpc/server";
import { AppRouter } from "@/server/api";

type RouterOutput = inferRouterOutputs<AppRouter>;
export type IDriver = RouterOutput["driver"]["getAll"]["all"][number];

export type IDriverCreate = z.infer<typeof driverCreateSchema>;
export type IDriverEdit = z.infer<typeof driverEditSchema>;

export interface IAPIDriver {
  id: string;
  namaLengkap: string;
  alamat: string;
  nik: string;
  nokk: string;
  noHp: string;
  noPlatMobil: string;
  maxPenumpang: number;
  fotoKtp: string;
  fotoMobil: string;
  user: {
    status: boolean;
  } & IUserDriver;
}


interface IUserDriver {
  id: string;
  name: string;
  email: string;
  // password: string;
  image?: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}
