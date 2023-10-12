import { locationSchema } from "@/schemas/location";
import { z } from "zod";

export type ILocationCreate = z.infer<typeof locationSchema>;

export interface ILocation {
  id: string;
  lat: string;
  long: string;
}
