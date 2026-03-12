import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthFetch } from "../Auth/useAuthFetch";
import type { Task } from "@/types/Task/Task";
import { taskKeys } from "@/lib/queryKeys";

export const useAddTask = () => {
  const { authFetch } = useAuthFetch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (title: string) => {
      return authFetch<Task>("/api/tasks", {
        method: "POST",
        body: JSON.stringify({ title }),
      });
    },
    onMutate: async (title) => {
      //Cancella query in corso
      await queryClient.cancelQueries({ queryKey: taskKeys.all() });

      //snapshot
      const previousTasks = queryClient.getQueryData<Task[]>(taskKeys.list());
      // aggiorna cache ottimisticamente
      queryClient.setQueryData<Task[]>(taskKeys.list(), (old) => [
        ...(old ?? []),
        { id: crypto.randomUUID(), title, completed: false }, // task "finta" temporanea
      ]);
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
