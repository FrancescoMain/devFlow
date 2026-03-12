import { taskFilterSchema, type TaskFilters } from "@/types/Task/TaskFilters";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "../useDebounce";

export const useTaskFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const filters = taskFilterSchema.parse({
    search: searchParams.get("search") ?? undefined,
    status: searchParams.get("status") ?? undefined,
  });
  const debounceSearch = useDebounce(filters.search, 300);

  const debouncedFilters: TaskFilters = {
    ...filters,
    search: debounceSearch,
  };

  const setFilters = (update: Partial<TaskFilters>) => {
    const next = { ...filters, ...update };
    const params = new URLSearchParams();
    if (next.search) params.set("search", next.search);
    if (next.status) params.set("status", next.status);
    setSearchParams(params, { replace: true });
  };
  return { filters, debouncedFilters, setFilters };
};
