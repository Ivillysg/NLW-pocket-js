import { eq } from 'drizzle-orm';
import { db } from '../db';
import { goals } from '../db/schema';

interface RemoveGoalRequest {
  goalId: string;
}
export async function removeGoal({ goalId }: RemoveGoalRequest) {
  const result = await db.delete(goals).where(eq(goals.id, goalId));

  return {
    result,
  };
}
