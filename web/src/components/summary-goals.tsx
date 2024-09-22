import { CheckCircle2, LogOut, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { DialogTrigger } from "./ui/dialog";
import { InOrbitIcon } from "./in-orbit-icon";
import { Progress, ProgressIndicator } from "./ui/progress-bar";
import { Separator } from "./ui/separator";
import { getSummary } from "../services/get-summary";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";

import ptBR from "dayjs/locale/pt-BR";
import { PendingGoals } from "./pending-goals";
import { Avatar } from "./ui/avatar";
import { useMemo } from "react";
import { undoGoalCompletion } from "../services/undo-goal-completion";

dayjs.locale(ptBR);

export function SummaryGoals() {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["summary"],
    queryFn: getSummary,
    staleTime: 1000 * 60, // 60 seconds
  });

  const firstDayOfWeek = dayjs().startOf("week").format("DD");
  const lastDayOfWeek = dayjs().endOf("week").format("DD MMMM");

  const completedPercentage = useMemo(() => {
    if (!data) return 0;
    return Math.round((data?.completed * 100) / data?.total);
  }, [data]);

  const [day, month] = lastDayOfWeek.split(" ");

  const goalsPerDay = useMemo(() => {
    if (!data) return;

    return Object.entries(data.goalsPerDay);
  }, [data]);

  async function handleUndoGoalCompletion(goalCompletionId: string) {
    await undoGoalCompletion(goalCompletionId);
    queryClient.invalidateQueries({
      queryKey: ["summary"],
    });
    queryClient.invalidateQueries({
      queryKey: ["pending-goals"],
    });
  }

  return (
    <div className="py-10 max-w-[480px] px-5 mx-auto flex flex-col gap-6">
      <div className="flex gap-3 items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar />
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-bold">Ivillys Gomes</h3>
            <span className="text-xs text-zinc-400">
              Desenvolvedor Web - React | NodeJs | Typescript
            </span>
          </div>
        </div>
        <button
          title="Sair"
          type="button"
          className="size-6 flex items-center justify-center rounded hover:bg-zinc-400"
        >
          <LogOut className="size-4" />
        </button>
      </div>

      <Separator />

      <div className="flex items-center justify-between">
        <div className="flex gap-3 items-center">
          <InOrbitIcon />
          <span className="text-lg font-semibold">
            {firstDayOfWeek} a{" "}
            <span>
              {day} de <span className="capitalize">{month}</span>
            </span>
          </span>
        </div>

        <DialogTrigger asChild>
          <Button size="sm">
            <Plus className="size-4" />
            Cadastrar meta
          </Button>
        </DialogTrigger>
      </div>

      <div className="flex flex-col gap-3">
        <Progress value={8} max={15}>
          <ProgressIndicator
            style={{
              width: `${completedPercentage}%`,
            }}
          />
        </Progress>
        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span>
            Você completou{" "}
            <span className="text-zinc-100">{data?.completed}</span> de{" "}
            <span className="text-zinc-100">{data?.total}</span> metas nessa
            semana.
          </span>
          <span>{completedPercentage}%</span>
        </div>

        <Separator />

        <PendingGoals />

        <div className="flex flex-col gap-6">
          <h2 className="text-xl font-medium">Sua semana</h2>
          {goalsPerDay && goalsPerDay?.length > 0 ? (
            goalsPerDay?.map(([date, goals]) => {
              const weekDay = dayjs(date).format("dddd");
              const formattedDate = dayjs(date).format("DD [de] MMMM");

              return (
                <div key={date} className="flex flex-col gap-4">
                  <h3 className="font-medium">
                    <span className="capitalize">{weekDay}</span>{" "}
                    <span className="text-zinc-400 text-sm">
                      ({formattedDate})
                    </span>
                  </h3>
                  <ul className="flex flex-col gap-3 max-h-[300px] overflow-auto">
                    {goals.map((goal) => {
                      const time = dayjs(goal.completedAt).format("HH:mm");
                      return (
                        <li key={goal.id} className="flex items-center gap-2">
                          <CheckCircle2 className="size-4 text-pink-500" />
                          <span className="text-sm text-zinc-400">
                            Você completou{" "}
                            <span className="text-zinc-100">
                              "{goal.title}"
                            </span>{" "}
                            às <span className="text-zinc-100">{time}h</span>
                          </span>
                          <button
                            type="button"
                            className="text-xs font-normal underline text-zinc-500"
                            onClick={() => handleUndoGoalCompletion(goal.id)}
                          >
                            Desfazer
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })
          ) : (
            <p className="text-sm text-zinc-400">
              Você ainda não completou nenhuma meta essa semana.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
