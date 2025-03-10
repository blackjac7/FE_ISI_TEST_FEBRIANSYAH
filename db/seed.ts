import { db } from "@/db/index";
import { roles } from "@/db/schema";

const seedRoles = async () => {
  try {
    const existingRoles = await db.query.roles.findMany();

    if (existingRoles.length > 0) {
      console.log("Roles has been seeded before");
      return;
    }

    const insertedRoles = await db
      .insert(roles)
      .values([{ name: "Lead" }, { name: "Team" }])
      .returning();

    console.log("Roles is seeded: ", insertedRoles);
  } catch (error) {
    console.error("Failed to seed :", error);
  }
};

seedRoles();
