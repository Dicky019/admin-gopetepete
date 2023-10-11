import { z } from "zod";

const regLocationLat = /^-?([0-8]?[0-9]|90)(\.[0-9]{1,10})$/;
const regLocationLong = /^-?([0-9]{1,2}|1[0-7][0-9]|180)(\.[0-9]{1,10})$/;

export const locationSchema = z.object({
  id: z.string(),
  latAwal: z.string().regex(regLocationLat),
  latAkhir: z.string().regex(regLocationLat),
  longAwal: z.string().regex(regLocationLong),
  longAkhir: z.string().regex(regLocationLong),
});

export type ILocationCreate = z.infer<typeof locationSchema>;

export interface ILocation {
  id: string;
  lat: string;
  long: string;
}
