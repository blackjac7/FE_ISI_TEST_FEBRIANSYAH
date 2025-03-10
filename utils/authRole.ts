import { db } from "@/db/index";
import { users, roles } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getCurrentUser } from "./users";

export const requireLeadRole = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error("Unauthorized: User tidak login");
  }

  const userRecord = await db.query.users.findFirst({
    where: eq(users.id, currentUser.id),
  });
  if (!userRecord) {
    throw new Error("User tidak ditemukan");
  }

  const userRole = await db.query.roles.findFirst({
    where: eq(roles.id, userRecord.role_id),
  });
  if (!userRole || userRole.name !== "Lead") {
    throw new Error("Hanya Lead yang dapat melakukan aksi ini");
  }

  return userRecord;
};
