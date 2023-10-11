import jwt, { type JwtPayload } from "jsonwebtoken";
import { env } from "@/env";

interface SignOption {
  expiresIn?: string | number;
}

const DEFAULT_SIGN_OPTION: SignOption = {
  expiresIn: "20d",
};

export function signJwtAccessToken(
  payload: JwtPayload,
  options: SignOption = DEFAULT_SIGN_OPTION
) {
  const secret_key = env.NEXTAUTH_SECRET;
  const token = jwt.sign(payload, secret_key ?? "", options);
  return token;
}

export function verifyJwt(token: string) {
  try {
    const secret_key = env.NEXTAUTH_SECRET;
    const decoded = jwt.verify(token, secret_key ?? "");
    return decoded as JwtPayload;
  } catch (error) {
    console.log(error);
    return null;
  }
}