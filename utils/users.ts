import { COOKIE_NAME } from "./constants";
import { cookies } from "next/headers";
import { getUserFromToken } from "./authToken";

export const getCurrentUser = async () => {
  const token = (await cookies()).get(COOKIE_NAME);
  if (!token) return null;

  const user = await getUserFromToken(token);

  return user || null;
};
