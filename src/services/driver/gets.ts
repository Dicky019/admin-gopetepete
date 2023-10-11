"use server";
import { Driver, User, UserRole } from "@prisma/client";
import { prisma } from "~/lib/db";
import { sameDay } from "~/lib/utils";
import { IDriver } from "~/types/driver";

const date = new Date();

export async function getDrivers() {
  const drivers = await prisma.driver.findMany({
    include: {
      user: true,
    },
  });

  const all: IDriver[] = mappingDrivers(drivers as MappingDriversProps);

  const todays = all.filter(({ user }) => sameDay(user.createdAt, date));

  return {
    all,
    todays,
  };
}

type MappingDriversProps = ({
  user: User;
} & Driver)[];

const mappingDrivers = (values: MappingDriversProps) => {
  return values.map(({ user, ...v }) => ({
    ...v,
    status: user?.status ? "done" : "canceled",
    user: {
      id: user?.id ?? "",
      email: user?.email ?? "",
      name: user?.name ?? "",
      // password: user?.password ?? "",
      role: user?.role ?? UserRole.driver,
      createdAt: user?.createdAt ?? date,
      updatedAt: user?.updatedAt ?? date,
    },
  }));
};
