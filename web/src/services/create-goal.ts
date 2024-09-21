import API from "../libs/axios";

type CreateGoalRequest = {
  title: string;
  desiredWeeklyFrequency: number;
};

export async function createGoal(data: CreateGoalRequest): Promise<void> {
  try {
    await API.post("/goals", data);
  } catch (error) {
    throw new Error("Ocorreu um erro...");
  }
}
