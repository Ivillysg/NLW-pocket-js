type CreateGoalRequest = {
  title: string;
  desiredWeeklyFrequency: number;
};

export async function createGoal(data: CreateGoalRequest): Promise<void> {
  await fetch('http://localhost:3333/goals', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: data.title,
      desiredWeeklyFrequency: data.desiredWeeklyFrequency,
    }),
  });
}
