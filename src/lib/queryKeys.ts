export const userKeys = {
  all: () => ["users"] as const,
  me: () => [...userKeys.all(), "me"] as const,
};

export const taskKeys = {
  all: () => ["tasks"] as const,
  list: () => [...taskKeys.all(), "list"] as const,
};
