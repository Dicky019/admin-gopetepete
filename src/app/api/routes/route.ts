import { NextResponse } from "next/server";
import { prisma } from "@/server/db";

export const revalidate = 0;

export async function GET() {
  const data = await prisma.rute.findMany({
    include: {
      locations: true,
    },
  });

  return NextResponse.json(
    {
      code: "200",
      data,
    },
    {
      status: 200,
    }
  );
}
