import { NextRequest, NextResponse } from "next/server";
import { getUser } from "@/services/user/get";
import { createDriver } from "@/services/driver/create";
import { driverCreateSchema } from "@/schemas/driver";
import { signJwtAccessToken } from "@/lib/jwt";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const driverForm = driverCreateSchema.safeParse(body);

  if (!driverForm.success) {
    const errorsMassange = driverForm.error.formErrors.fieldErrors;
    return NextResponse.json({
      code: "400",
      errors: errorsMassange,
    });
  }

  const data = driverForm.data;

  const cekDriver = await getUser(data.user.email);

  if (cekDriver) {
    return NextResponse.json(
      {
        code: "400",
        // errors: [{ user: ["Email ini sudah ada"] }],
        error: { message: "Email ini sudah ada" },
      },
      {
        status: 400,
      }
    );
  }

  const driver = await createDriver(data);

  if (!driver) {
    return NextResponse.json({
      code: "404",
      // errors: [{ driver: ["Driver tidak ditemukan"] }],
      error: { message: "Driver tidak ditemukan" },
    });
  }

  const { user, ...driverWithoutPass } = driver;
  // const { ...userWithoutPass } = newUser;
  const accessToken = signJwtAccessToken(user);

  const result = {
    ...driverWithoutPass,
    accessToken,
    user,
  };

  return NextResponse.json({
    code: "200",
    data: result,
  });
}
