import API from "../libs/axios";

type SummaryResponse = {
  completed: number;
  total: number;
  goalsPerDay: Record<
    string,
    {
      id: string;
      title: string;
      completedAt: string;
    }[]
  >;
};
export async function getSummary(): Promise<SummaryResponse> {
  try {
    const response = await API.get<{ summary: SummaryResponse }>("/summary");
    if (!response) {
      throw new Error();
    }

    return response.data.summary;
  } catch (error) {
    throw new Error("Ocorreu um erro...");
  }
}
