import dayjs from 'dayjs';
import { client, db } from '.';
import { goalCompletions, goals, users } from './schema';

async function seed() {
  await db.delete(users);
  await db.delete(goals);

  const user = await db
    .insert(users)
    .values({
      name: 'root',
      email: 'root',
      githubId: '123',
    })
    .returning();

  const goalsResult = await db
    .insert(goals)
    .values([
      { title: 'Acordar cedo', desiredWeeklyFrequency: 5, userId: user[0].id },
      { title: 'Me exercitar', desiredWeeklyFrequency: 2, userId: user[0].id },
      { title: 'Meditar', desiredWeeklyFrequency: 1, userId: user[0].id },
    ])
    .returning();

  const startOfWeek = dayjs().startOf('week');

  await db.insert(goalCompletions).values([
    {
      goalId: goalsResult[0].id,
      createdAt: startOfWeek.toDate(),
    },
    {
      goalId: goalsResult[1].id,
      createdAt: startOfWeek.add(1, 'day').toDate(),
    },
  ]);
}

seed().finally(() => {
  client.end();
});
