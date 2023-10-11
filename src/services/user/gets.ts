"use server";
import { UserRole } from "@prisma/client";
import { prisma } from "@/server/db";
import { sameDay } from "~/lib/utils";
import { IUser } from "~/types/user";

const date = new Date();

export async function getsUser() {
  const users = await prisma.user.findMany({
    where: {
      role: UserRole.passenger,
    },
  });

  const all = users.map(({ status, ...value }) => ({
    ...value,
    status: status ? "done" : "canceled",
  }));
  const todays = all.filter(({ createdAt }) => sameDay(createdAt, date));

  return {
    all: all as IUser[],
    todays: todays as IUser[],
  };
}
