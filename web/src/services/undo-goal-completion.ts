import API from "../libs/axios";

export async function undoGoalCompletion(
  goalCompletionId: string
): Promise<void> {
  try {
    await API.delete("/undo-goal-completion", {
      data: {
        goalCompletionId,
      },
    });
  } catch (error) {
    throw new Error("Ocorreu um erro...");
  }
}
