export async function undoGoalCompletion(
  goalCompletionId: string
): Promise<void> {
  const response = await fetch('http://localhost:3333/undo-goal-completion', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      goalCompletionId,
    }),
  });
  const data = await response.json();

  return data;
}
