"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "~/lib/db";

export async function getDriver(id: string) {
  const drivers = await prisma.driver.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
    },
  });

  revalidatePath("/");

  return drivers;
}
