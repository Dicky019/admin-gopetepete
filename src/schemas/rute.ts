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
