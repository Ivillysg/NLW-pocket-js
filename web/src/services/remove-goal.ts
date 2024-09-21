import API from "../libs/axios";

export async function removeGoal(goalId: string): Promise<void> {
  try {
    await API.delete("/remove-goal", {
      data: {
        goalId,
      },
    });
  } catch (error) {
    throw new Error("Ocorreu um erro...");
  }
}
