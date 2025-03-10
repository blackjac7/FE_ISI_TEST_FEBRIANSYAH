/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";
import { signin, signup } from "@/utils/authToken";
import { z } from "zod";
import { redirect } from "next/navigation";
import { COOKIE_NAME } from "@/utils/constants";

const authSchemaRegister = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" }),
  email: z.string().email({ message: "Invalid email format" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
  role_id: z.string().nonempty({ message: "Role is required" }),
});

const authSchemaSignin = z.object({
  email: z.string().email({ message: "Invalid email format" }),
  password: z.string(),
});

export const registerUser = async (prevState: unknown, formData: FormData) => {
  const values = {
    name: formData.get("name") || "",
    email: formData.get("email") || "",
    password: formData.get("password") || "",
    role_id: formData.get("role_id") || "",
  };

  try {
    const data = authSchemaRegister.parse(values);
    const { token } = await signup(data);
    (await cookies()).set(COOKIE_NAME, token);
  } catch (e) {
    if (e instanceof z.ZodError) {
      return {
        errors: e.format(),
        message: "Validation failed. Please check your input.",
        values,
      };
    }
    if (e instanceof Error && e.message) {
      return {
        message: e.message,
        values,
      };
    } else if (typeof e === "object" && e !== null && "message" in e) {
      return {
        message: (e as { message: string }).message,
        values,
      };
    } else {
      return { message: "Failed to register user", values };
    }
  }

  redirect("/dashboard");
};

export const signinUser = async (
  prevState: { message: string | null; errors: any },
  formData: FormData
) => {
  const values = {
    email: formData.get("email") || "",
    password: formData.get("password") || "",
  };

  try {
    const data = authSchemaSignin.parse(values);

    const { token } = await signin(data);
    (await cookies()).set(COOKIE_NAME, token);
  } catch (e) {
    console.error(e);
    if (e instanceof z.ZodError) {
      return { errors: e.errors, message: null };
    }
    if (e instanceof Error && e.message) {
      return {
        message: e.message,
        errors: null,
        values,
      };
    } else {
      return { message: "Failed to signin user", errors: null, values };
    }
  }

  redirect("/dashboard");
};

export const logoutUser = async () => {
  (await cookies()).delete(COOKIE_NAME);
  redirect("/login");
};
