import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthFetch } from "../Auth/useAuthFetch";
import type { Task } from "@/types/Task/Task";
import { taskKeys } from "@/lib/queryKeys";

export const useToggleTask = () => {
  const { authFetch } = useAuthFetch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => {
      return authFetch<Task>(`/api/tasks/${id}`, {
        method: "PATCH",
      });
    },
    onMutate: async (id) => {
      //Cancella query in corso
      await queryClient.cancelQueries({ queryKey: taskKeys.all() });

      //snapshot
      const previousTasks = queryClient.getQueryData<Task[]>(taskKeys.list());
      // aggiorna cache ottimisticamente
      queryClient.setQueryData<Task[]>(taskKeys.list(), (old) =>
        (old ?? []).map((t) =>
          t.id === id ? { ...t, completed: !t.completed } : t,
        ),
      );
      //ritorna snapshot per rollback
      return { previousTasks };
    },
    onError: (_err, _title, context) => {
      //rollback
      if (context?.previousTasks) {
        queryClient.setQueryData(taskKeys.list(), context.previousTasks);
      }
    },
    onSettled: () => {
      // ri sincronizza
      queryClient.invalidateQueries({ queryKey: taskKeys.list() });
    },
  });
};
