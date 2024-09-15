export async function removeGoal(goalId: string): Promise<void> {
  const response = await fetch('http://localhost:3333/remove-goal', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      goalId,
    }),
  });
  const data = await response.json();

  return data;
}
