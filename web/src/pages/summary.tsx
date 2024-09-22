import { CreateGoal } from "../components/create-goal";
import { EmptyGoals } from "../components/empty-goals";
import { Dialog } from "../components/ui/dialog";
import { Spinner } from "../components/ui/spinner";
import { getSummary } from "../services/get-summary";

import { useQuery } from "@tanstack/react-query";
import { SummaryGoals } from "../components/summary-goals";
import { Loading } from "../components/loading";

export function Summary() {
  const { data, isLoading } = useQuery({
    queryKey: ["summary"],
    queryFn: getSummary,
    staleTime: 1000 * 60, // 60 seconds
  });

  return (
    <Dialog>
      {isLoading ? (
        <Loading />
      ) : data?.total && data.total > 0 ? (
        <SummaryGoals />
      ) : (
        <EmptyGoals />
      )}

      <CreateGoal />
    </Dialog>
  );
}
