import { z } from "zod";
import { locationSchema } from "./location";

const regColor = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;
const regKode = /[A-Z]/;

export const ruteCreateSchema = z.object({
  name: z.string(),
  kode: z
    .string()
    .max(1)
    .regex(regKode)
    .transform((v) => v.toUpperCase()),
  color: z.string().regex(regColor),
  locations: z.array(locationSchema),
  // locationAkhir: locationSchema,
});

export type IRuteCreate = z.infer<typeof ruteCreateSchema>;

export type IRuteEdit = {
  id: string;
} & z.infer<typeof ruteCreateSchema>;

export type IRute = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  kode: string;
  color: string;
  locations: {
    id: string;
    latAwal: string;
    longAwal: string;
    latAkhir: string;
    longAkhir: string;
  }[];
};
