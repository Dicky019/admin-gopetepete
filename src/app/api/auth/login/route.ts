import { NextRequest, NextResponse } from "next/server";
import { getUser } from "@/services/user/get";
import { verifyJwt } from "@/lib/jwt";
import { JWT } from "next-auth/jwt";

export async function GET(request: NextRequest) {
  const token = request.headers.get("authorization");

  const authToken = (token || "").split("Bearer ").at(1);

  console.log({ authToken, token });

  if (!authToken) {
    return NextResponse.json(
      {
        code: "401",
        status: "Unauthorized",
        error: { message: "Token Tidak ada" },
        // errors: [{ token: ["Token Null"] }],
      },
      { status: 401 }
    );
  }

  const JWT = verifyJwt(authToken) as JWT | undefined;
  if (!JWT) {
    return NextResponse.json(
      {
        code: "401",
        status: "Unauthorized",
        error: { message: "Invalid Auth Token" },
      },
      { status: 401 }
    );
  }

  const user = await getUser(JWT.email);

  console.log({ JWT, user });

  if (!user) {
    return NextResponse.json(
      {
        code: "404",
        status: "Not Found",
        error: { message: "Akun tidak ditemukan" },
        // errors: [{ email: ["Email tidak ditemukan"] }],
      },
      { status: 404 }
    );
  }

  // if (!user.status) {
  //   return NextResponse.json(
  //     {
  //       code: "404",
  //       status: "Not Found",
  //       error: { message: "Status Non Active" },
  //     },
  //     { status: 404 }
  //   );
  // }

  return NextResponse.json({
    code: "200",
    data: user,
  });
}
