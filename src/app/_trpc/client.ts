"use client"
import { createTRPCReact } from "@trpc/react-query";

import type { AppRouter } from "@/server/api";

export const trpc = createTRPCReact<AppRouter>();

export { type RouterInputs, type RouterOutputs } from "@/server/api";
