import { NextRequest, NextResponse } from "next/server";
import { signInFormSchema } from "@/schemas/auth";
import { prisma } from "@/server/db";
import { getUser } from "@/services/user/get";
import { signJwtAccessToken } from "@/lib/jwt";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const signInForm = signInFormSchema.safeParse(body);

  if (!signInForm.success) {
    const errorsMassange = signInForm.error.formErrors.fieldErrors;

    return NextResponse.json({
      code: "400",
      errors: errorsMassange,
    });
  }

  const signInFormData = signInForm.data;

  const oldUser = await getUser(signInFormData.email ?? "");

  if (oldUser) {
    const accessToken = signJwtAccessToken(oldUser);

    const data = {
      ...oldUser,
      accessToken,
    };

    // if (!data.status) {
    //   return NextResponse.json(
    //     {
    //       code: "404",
    //       error: { message: "Status Non Active" },
    //     },
    //     { status: 404 }
    //   );
    // }

    return NextResponse.json({
      code: "200",
      data: data,
    });
  }

  const newUser = await prisma.user.create({
    data: {
      name: signInFormData.name,
      email: signInFormData.email,
      image: signInFormData.image,
      role: "passenger",
      status: true,
    },
  });

  const { ...userWithoutPass } = newUser;
  const accessToken = signJwtAccessToken(userWithoutPass);

  const data = {
    ...userWithoutPass,
    accessToken,
  };

  return NextResponse.json({
    code: "200",
    data: data,
  });
}
