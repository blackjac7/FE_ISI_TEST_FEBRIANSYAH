import { getCurrentUser } from "@/utils/users";
import NavbarClient from "./NavbarClient";
import { db } from "@/db/index";
import { roles } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function Navbar() {
  const user = (await getCurrentUser()) as {
    id: string;
    created_at: Date;
    email: string;
    name: string;
    role_id: string;
  };

  if (user) {
    const userRole = await db.query.roles.findFirst({
      where: eq(roles.id, user.role_id),
    });
    if (!userRole || userRole.name !== "Lead") {
      return <NavbarClient user={user} isLead={false} />;
    } else {
      return <NavbarClient user={user} isLead={true} />;
    }
  } else {
    return <NavbarClient user={null} isLead={false} />;
  }
}
