"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/server/db";

export async function deleteUser(
  id: string,
  isRevalidatePath: boolean = false
) {
  const rutes = await prisma.user.delete({
    where: { id },
  });
  if (isRevalidatePath) {
    revalidatePath("/rute");
  }

  return rutes;
}
