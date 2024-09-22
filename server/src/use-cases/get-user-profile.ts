import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

interface GetUserProfileRequest {
  userId: string;
}
export async function getUserProfile({ userId }: GetUserProfileRequest) {
  const profile = await db.query.users.findFirst({
    where: eq(users.id, userId),
  });

  if (!profile) {
    throw new Error('User not found');
  }

  return { profile };
}
