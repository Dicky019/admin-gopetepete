
import { prisma } from "@/server/db";
import { IRute, IRuteEdit } from "@/types/rute";

interface EditRuteProps {
  data: IRuteEdit;
  isRevalidatePath?: boolean;
}

export async function updateRute({ data }: EditRuteProps) {
  // console.log({ data, "data.locations": data.locations });

  await prisma.location.deleteMany({
    where: {
      ruteId: data.id,
    },
  });

  for (const location of data.locations) {
    const { id, ...loc } = location;

    await prisma.location.upsert({
      where: {
        id: id,
      },
      update: loc,
      create: {
        ...loc,
        ruteId: data.id,
      },
    });
  }

  const rute = await prisma.rute.update({
    where: {
      id: data.id,
    },
    data: {
      kode: data.kode,
      name: data.name,
      color: data.color,
    },
    include: {
      locations: true,
    },
  });


  return rute satisfies IRute;
}
