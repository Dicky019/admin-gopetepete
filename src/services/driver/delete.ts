"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "~/lib/db";

export async function deleteDriver(id: string) {
  const drivers = await prisma.driver.delete({
    where: { id },
  });

  revalidatePath("/");

  return drivers;
}
