/* eslint-disable @typescript-eslint/no-unused-vars */
import NewTaskForm from "@/components/NewTaskForm";
import { getTeamMembers } from "@/server/actions/task";
import { requireLeadRole } from "@/utils/authRole";
import { redirect } from "next/navigation";

export default async function NewTaskPage() {
  try {
    await requireLeadRole();
  } catch (error) {
    redirect("/dashboard");
  }

  const teamMembers = await getTeamMembers();

  return <NewTaskForm teamMembers={teamMembers} />;
}
