import { Dialog } from "./components/ui/dialog";
import { CreateGoal } from "./components/create-goal";
import { EmptyGoals } from "./components/empty-goals";
import { Summary } from "./components/summary";

import logo from "./assets/logo-in-orbit.svg";

import { useQuery } from "@tanstack/react-query";
import { getSummary } from "./services/get-summary";
import { Spinner } from "./components/ui/spinner";

export function App() {
  const { data, isLoading } = useQuery({
    queryKey: ["summary"],
    queryFn: getSummary,
    staleTime: 1000 * 60, // 60 seconds
  });

  return (
    <Dialog>
      {isLoading ? (
        <div className="h-screen flex flex-col items-center justify-center gap-8">
          <img src={logo} alt="in.orbit" />
          <div className="flex items-center gap-2">
            <Spinner />
            <p className="text-zinc-300 leading-relaxed max-w-80 text-center">
              Carregando...
            </p>
          </div>
        </div>
      ) : data?.total && data.total > 0 ? (
        <Summary />
      ) : (
        <EmptyGoals />
      )}

      <CreateGoal />
    </Dialog>
  );
}
