import API from "../libs/axios";

export async function createGoalCompletion(goalId: string): Promise<void> {
  try {
    const response = await API.post("/completions", { goalId });
    return response.data;
  } catch (error) {
    throw new Error("Ocorreu um erro...");
  }
}
