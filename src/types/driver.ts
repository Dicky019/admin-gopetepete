import { z } from "zod";
import { ILocation } from "./location";
import { UserRole } from "@prisma/client";
import { driverCreateSchema, driverEditSchema } from "@/schemas/driver";

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

export interface IDriver {
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
  status: string;
  location?: ILocation;
  user: IUserDriver;
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
