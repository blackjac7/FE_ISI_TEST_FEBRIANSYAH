/* eslint-disable @typescript-eslint/no-unused-vars */
import jwt from "jsonwebtoken";
import { db } from "@/db/index";
import { eq } from "drizzle-orm";
import { users } from "@/db/schema";
import bcrypt from "bcrypt";

const SECRET = process.env.JWT_SECRET || "use_an_ENV_VAR";

export const createTokenForUser = (userId: string) => {
  const token = jwt.sign({ id: userId }, SECRET);
  return token;
};

export const getUserFromToken = async (token: {
  name: string;
  value: string;
}) => {
  const payload = jwt.verify(token.value, SECRET) as { id: string };

  const user = await db.query.users.findFirst({
    where: eq(users.id, payload.id),
    columns: {
      id: true,
      email: true,
      name: true,
      created_at: true,
      role_id: true,
    },
  });

  return user;
};

export const signin = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const match = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (!match) throw new Error("User not found");

  const correctPW = await comparePW(password, match.password);
  if (!correctPW) {
    throw new Error("Invalid password");
  }

  const token = createTokenForUser(match.id);
  const { password: pw, ...user } = match;

  return { user, token };
};

export const signup = async ({
  name,
  email,
  password,
  role_id,
}: {
  name: string;
  email: string;
  password: string;
  role_id: string;
}) => {
  const match = await db.query.users.findFirst({
    where: eq(users.email, email),
  });
  if (match) throw { message: "email already exists" };
  const hashedPW = await hashPW(password);
  const rows = await db
    .insert(users)
    .values({ name, email, password: hashedPW, role_id })
    .returning({
      id: users.id,
      email: users.email,
      createdAt: users.created_at,
    });

  const user = rows[0];
  const token = createTokenForUser(user.id);

  return { user, token };
};

export const hashPW = (password: string) => {
  return bcrypt.hash(password, 10);
};

export const comparePW = (password: string, hashedPW: string) => {
  return bcrypt.compare(password, hashedPW);
};
