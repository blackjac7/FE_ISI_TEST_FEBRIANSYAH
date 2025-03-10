import { randomUUID } from "crypto";
import { pgTable, text, timestamp, varchar, pgEnum } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

const id = () =>
  text("id")
    .primaryKey()
    .$default(() => randomUUID());

export const taskStatusEnum = pgEnum("task_status", [
  "Not Started",
  "On Progress",
  "Done",
  "Reject",
]);

export const roles = pgTable("roles", {
  id: id(),
  name: text("name").notNull().unique(),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export const users = pgTable("users", {
  id: id(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  name: varchar("name").notNull(),
  role_id: text("role_id")
    .notNull()
    .references(() => roles.id),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});

export const tasks = pgTable("tasks", {
  id: id(),
  title: text("title").notNull(),
  description: text("description"),
  status: taskStatusEnum("status").notNull().default("Not Started"),
  created_by: text("created_by")
    .references(() => users.id)
    .notNull(),
  assigned_to: text("assigned_to").references(() => users.id),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});

export const usersRelations = relations(users, ({ one }) => ({
  role: one(roles, {
    fields: [users.role_id],
    references: [roles.id],
  }),
}));

export const tasksRelations = relations(tasks, ({ one }) => ({
  createdBy: one(users, {
    fields: [tasks.created_by],
    references: [users.id],
  }),
  assignedTo: one(users, {
    fields: [tasks.assigned_to],
    references: [users.id],
  }),
}));
