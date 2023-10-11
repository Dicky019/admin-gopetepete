"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/server/db";

export async function updateStatusUser(id: string, status: boolean) {
  const driver = await prisma.user.update({
    where: { id },
    data: {
      status: status,
    },
  });

  revalidatePath("/");

  return driver;
}
