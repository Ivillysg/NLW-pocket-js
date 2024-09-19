import { Plus, X } from 'lucide-react';
import { OutlineButton } from './ui/outline-button';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getPendingGoals } from '../services/get-pending-goals';
import { createGoalCompletion } from '../services/create-goal-completion';
import { removeGoal } from '../services/remove-goal';
import { useState } from 'react';
import { Skeleton } from './ui/skeleton';

export function PendingGoals() {
  const [hoveredGoal, setHoveredGoal] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['pending-goals'],
    queryFn: getPendingGoals,
  });

  async function handleCompleteGoal(goalId: string) {
    await createGoalCompletion(goalId);
    queryClient.invalidateQueries({ queryKey: ['summary'] });
    queryClient.invalidateQueries({ queryKey: ['pending-goals'] });
  }

  async function handleRemoveGoal(goalId: string) {
    await removeGoal(goalId);
    queryClient.invalidateQueries({ queryKey: ['summary'] });
    queryClient.invalidateQueries({ queryKey: ['pending-goals'] });
  }

  if (isLoading) {
    return (
      <div className="flex flex-wrap gap-3 ">
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-3 ">
      {data?.map(goal => {
        return (
          <div className="relative" key={goal.id}>
            <OutlineButton
              onMouseEnter={() => setHoveredGoal(goal.id)}
              onMouseLeave={() => setHoveredGoal(null)}
              disabled={goal.completionCount >= goal.desiredWeeklyFrequency}
              onClick={() => handleCompleteGoal(goal.id)}
            >
              <Plus className="size-4 text-zinc-600" />
              {goal.title}
            </OutlineButton>
            <button
              type="button"
              onClick={() => handleRemoveGoal(goal.id)}
              onMouseEnter={() => setHoveredGoal(goal.id)}
              onMouseLeave={() => setHoveredGoal(null)}
              className="absolute right-0 -top-0 bg-red-500 rounded"
              style={{
                display: hoveredGoal === goal.id ? 'inline' : 'none',
              }}
            >
              <X className="size-3" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
