import API from "../libs/axios";

type GetPendingGoalsResponse = {
  id: string;
  title: string;
  desiredWeeklyFrequency: number;
  completionCount: number;
}[];
export async function getPendingGoals(): Promise<GetPendingGoalsResponse> {
  try {
    const response = await API.get<{ pendingGoals: GetPendingGoalsResponse }>(
      "/pending-goals"
    );
    if (!response) {
      throw new Error();
    }

    return response.data.pendingGoals;
  } catch (error) {
    throw new Error("Ocorreu um erro...");
  }
}
