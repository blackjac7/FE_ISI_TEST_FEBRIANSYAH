import { getCurrentUser } from '@/utils/users';
import NavbarClient from './NavbarClient';
import { db } from '@/db/db';
import { users, roles } from '@/db/schema';
import { eq } from 'drizzle-orm';

export default async function Navbar() {
  interface User {
    id: string;
  }

  const user: User | null = await getCurrentUser();

  if (user) {
    const userRecord = await db.query.users.findFirst({
      where: eq(users.id, user.id),
    });
    if (!userRecord) {
      throw new Error('User tidak ditemukan');
    }

    const userRole = await db.query.roles.findFirst({
      where: eq(roles.id, userRecord.role_id),
    });
    if (!userRole || userRole.name !== 'Lead') {
      return <NavbarClient user={user} isLead={false} />;
    } else {
      return <NavbarClient user={user} isLead={true} />;
    }
  } else {
    return <NavbarClient user={null} isLead={false} />;
  }
}
