import { taskKeys } from "@/lib/queryKeys";
import type { Task } from "@/types/Task/Task";
import { useQuery } from "@tanstack/react-query";
import { useAuthFetch } from "../Auth/useAuthFetch";

export const useTasks = () => {
  const { authFetch, isAuthenticated } = useAuthFetch();
  return useQuery({
    queryKey: taskKeys.list(),
    queryFn: () => authFetch<Task[]>("/api/tasks"),
    enabled: isAuthenticated,
  });
};
