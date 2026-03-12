import type { TaskFilters } from "@/types/Task/TaskFilters";

export const userKeys = {
  all: () => ["users"] as const,
  me: () => [...userKeys.all(), "me"] as const,
};

export const taskKeys = {
  all: () => ["tasks"] as const,
  list: (filters?: TaskFilters) =>
    [...taskKeys.all(), "list", filters] as const,
};
