"use server";

import { faker } from "@faker-js/faker";
import { revalidatePath } from "next/cache";
import { prisma } from "@/server/db";
import { IAPIDriver, IDriverCreate } from "@/types/driver";

export async function createDriver(data?: IDriverCreate) {
  if (!data) {
    const driver = await fakerDriver();
    revalidatePath("/");
    return driver as IAPIDriver;
  }

  const { user, ...newData } = data;

  const driver = await prisma.driver.create({
    data: {
      ...newData,
      user: {
        create: { ...user, role: "driver", status: false },
      },
    },
    include: {
      user: true,
    },
  });

  revalidatePath("/");
  return driver as IAPIDriver;
}

export const fakerDriver = async () => {
  const dataFaker = {
    email: faker.internet.email(),
    name: faker.internet.displayName(),
    password: faker.internet.password(),
    status: faker.datatype.boolean(),
    image: faker.datatype.boolean() ? faker.internet.avatar() : undefined,
  };

  const { user, ...newData }: IDriverCreate = {
    user: {
      email: dataFaker.email,
      name: dataFaker.name,
      // status: dataFaker.status,
      image: dataFaker.image,
    },
    alamat: faker.location.streetAddress(),
    fotoKtp: faker.image.avatarGitHub(),
    fotoMobil: faker.image.urlLoremFlickr({ category: "car" }),
    maxPenumpang: faker.number.int({ max: 10, min: 8 }),
    namaLengkap: faker.person.fullName(),
    nik: faker.phone.number("################"),
    noHp: faker.phone.number("08##-####-####"),
    nokk: faker.phone.number("################"),
    noPlatMobil: `DD ${faker.number.int({
      min: 1,
      max: 1999,
    })} ${faker.string.alpha(2).toUpperCase()}`,
  };

  const driver = await prisma.driver.create({
    data: {
      ...newData,
      user: {
        create: { ...user, role: "driver" },
      },
    },
    include: {
      user: true,
    },
  });
  return driver;
};
