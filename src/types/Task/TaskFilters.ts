import z from "zod";

export const taskFilterSchema = z.object({
  search: z.string().default(""),
  status: z.enum(["all", "completed", "pending"]).default("all"),
});

export type TaskFilters = z.infer<typeof taskFilterSchema>;
