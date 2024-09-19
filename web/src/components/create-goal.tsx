import { X } from 'lucide-react';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from './ui/dialog';
import { Label } from './ui/label';
import {
  RadioGroup,
  RadioGroupIndicator,
  RadioGroupItem,
} from './ui/radio-group';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { createGoal } from '../services/create-goal';
import { useQueryClient } from '@tanstack/react-query';

const numberOfTimesPerWeek = [
  {
    value: 1,
    title: '1x na semana',
    emoji: '🥱',
  },
  {
    value: 2,
    title: '2x na semana',
    emoji: '🙂',
  },
  {
    value: 3,
    title: '3x na semana',
    emoji: '😎',
  },
  {
    value: 4,
    title: '4x na semana',
    emoji: '😜',
  },
  {
    value: 5,
    title: '5x na semana',
    emoji: '🤨',
  },
  {
    value: 6,
    title: '6x na semana',
    emoji: '🤯',
  },
  {
    value: 7,
    title: 'Todos dias da semana',
    emoji: '🔥',
  },
];

const createGoalSchema = z.object({
  title: z.string().min(1, 'Informe a atividade que deseja realizar'),
  desiredWeeklyFrequency: z.coerce.number().min(1).max(7),
});

type CreateGoalForm = z.infer<typeof createGoalSchema>;

export function CreateGoal() {
  const queryClient = useQueryClient();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateGoalForm>({
    resolver: zodResolver(createGoalSchema),
  });

  async function handleCreateGoal(data: CreateGoalForm) {
    await createGoal({
      title: data.title,
      desiredWeeklyFrequency: data.desiredWeeklyFrequency,
    });
    queryClient.invalidateQueries({
      queryKey: ['pending-goals'],
    });
    queryClient.invalidateQueries({
      queryKey: ['summary'],
    });

    reset();
  }

  return (
    <DialogContent>
      <div className="flex flex-col gap-6 h-full">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <DialogTitle>Cadastrar meta</DialogTitle>
            <DialogClose>
              <X className="size-5 text-zinc-600" />
            </DialogClose>
          </div>
          <DialogDescription>
            Adicione atividades que te fazem bem e que você quer continuar
            praticando toda semana.
          </DialogDescription>
        </div>
        <form
          onSubmit={handleSubmit(handleCreateGoal)}
          className="flex flex-col justify-between flex-1"
        >
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <Label htmlFor="title">Qual a atividade?</Label>
              <Input
                id="title"
                autoFocus
                placeholder="Praticar exercícios, meditar, etc..."
                {...register('title')}
              />
              {errors.title && (
                <p className="text-red-400 text-sm">{errors.title.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="title">Quantas vezes na semana?</Label>
              <Controller
                name="desiredWeeklyFrequency"
                control={control}
                defaultValue={3}
                render={({ field }) => (
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={String(field.value)}
                  >
                    {numberOfTimesPerWeek.map(option => (
                      <RadioGroupItem
                        value={option.value.toString()}
                        key={option.value}
                      >
                        <RadioGroupIndicator />
                        <span className="text-zinc-300 text-s font-medium leading-none">
                          {option.title}
                        </span>
                        <span className="text-lg leading-none">
                          {option.emoji}
                        </span>
                      </RadioGroupItem>
                    ))}
                  </RadioGroup>
                )}
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <DialogClose asChild>
              <Button type="button" variant="secondary" className="flex-1">
                Fechar
              </Button>
            </DialogClose>
            <Button className="flex-1">Salvar</Button>
          </div>
        </form>
      </div>
    </DialogContent>
  );
}
