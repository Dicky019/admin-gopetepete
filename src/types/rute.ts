import { ruteCreateSchema, ruteUpdateSchema } from "@/schemas/rute";
import { z } from "zod";
import { inferRouterOutputs } from "@trpc/server";
import { AppRouter } from "@/server/api";

type RouterOutput = inferRouterOutputs<AppRouter>;

export type IRuteCreate = z.infer<typeof ruteCreateSchema>;
export type IRuteUpdate = z.infer<typeof ruteUpdateSchema>;

export type IRuteEdit = {
  id: string;
} & z.infer<typeof ruteCreateSchema>;

export type IRutes = RouterOutput["rute"]["getAll"]["all"];
export type IRute = RouterOutput["rute"]["get"];
