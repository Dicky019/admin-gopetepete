import { NextRequest, NextResponse } from "next/server";
import { getUser } from "@/services/user/get";
import { driverEditSchema } from "@/schemas/driver";
import { updateDriver } from "@/services/driver/update";
import { getDriver } from "@/services/driver/get";
import { prisma } from "@/server/db";

type getIdParams = {
  params: { id: string };
};

export async function GET(request: NextRequest, { params }: getIdParams) {
  console.log({ request });

  const driverId = await prisma.user.findUnique({
    where: {
      id: params.id,
    },
    select: {
      driverId: true,
    },
  });

  if (!driverId || !driverId.driverId) {
    return NextResponse.json(
      {
        code: "404",
        // errors: [{ driver: ["Driver tidak ditemukan"] }],
        error: { message: "Driver tidak ditemukan" },
      },
      { status: 404 }
    );
  }

  const data = await getDriver(driverId.driverId);

  if (!data) {
    return NextResponse.json(
      {
        code: "404",
        // errors: [{ driver: ["Driver tidak ditemukan"] }],
        error: { message: "Driver tidak ditemukan" },
      },
      { status: 404 }
    );
  }

  return NextResponse.json({
    code: "200",
    data,
  });
}

export async function PUT(request: NextRequest, { params }: getIdParams) {
  const body = await request.json();

  const driverForm = driverEditSchema.safeParse({ id: params.id, ...body });

  if (!driverForm.success) {
    const errorsMassange = driverForm.error.formErrors.fieldErrors;
    return NextResponse.json({
      code: "400",
      errors: errorsMassange,
    });
  }

  const data = driverForm.data;
  const cekDriver = await getUser(data.user.email ?? "");

  if (cekDriver) {
    return NextResponse.json(
      {
        code: "400",
        // errors: [{ user: ["Email ini sudah ada"] }],
        error: { message: "Email ini sudah ada" },
      },
      { status: 400 }
    );
  }

  const driver = await updateDriver(data);

  if (!driver) {
    return NextResponse.json(
      {
        code: "404",
        // errors: [{ driver: ["Driver tidak ditemukan"] }],
        error: { message: "Driver tidak ditemukan" },
      },
      { status: 404 }
    );
  }

  const { ...result } = driver;

  return NextResponse.json({
    code: "200",
    data: result,
  });
}
