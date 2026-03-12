import { taskKeys } from "@/lib/queryKeys";
import type { Task } from "@/types/Task/Task";
import { useQuery } from "@tanstack/react-query";
import { useAuthFetch } from "../Auth/useAuthFetch";
import type { TaskFilters } from "@/types/Task/TaskFilters";

export const useTasks = (filters: TaskFilters) => {
  const { authFetch, isAuthenticated } = useAuthFetch();

  const params = new URLSearchParams();
  if (filters.search) params.set("search", filters.search);
  if (filters.status !== "all") params.set("status", filters.status);
  const query = params.toString();

  return useQuery({
    queryKey: taskKeys.list(filters),
    queryFn: () => authFetch<Task[]>(`/api/tasks${query ? `?${query}` : ""}`),
    enabled: isAuthenticated,
  });
};
