import { z } from "zod";

export const userSchema = z.object({
  name: z.string(),
  email: z.string(),
  image: z.string().optional(),
});

export const changeRuteSchema = z.object({
  id: z.string(),
  ruteId: z.string(),
});

export const driverCreateSchema = z.object({
  user: userSchema,
  namaLengkap: z.string(),
  alamat: z.string(),
  nik: z.string(),
  nokk: z.string(),
  noHp: z.string(),
  noPlatMobil: z.string(),
  maxPenumpang: z.number(),
  fotoKtp: z.string(),
  fotoMobil: z.string(),
});

export const driverEditSchema = z.object({
  id: z.string(),
  user: userSchema.merge(z.object({ id: z.string() })),
  namaLengkap: z.string(),
  alamat: z.string(),
  nik: z.string(),
  nokk: z.string(),
  noHp: z.string(),
  noPlatMobil: z.string(),
  maxPenumpang: z.number(),
  fotoKtp: z.string(),
  fotoMobil: z.string(),
});
