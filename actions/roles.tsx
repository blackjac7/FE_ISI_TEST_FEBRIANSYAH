'use server';

import { db } from '@/db/db';
import { roles } from '@/db/schema';

export const getRoles = async () => {
  return await db.select().from(roles);
};
