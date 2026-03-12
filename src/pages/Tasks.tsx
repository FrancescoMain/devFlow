import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { useTasks } from "@/hooks/Task/useTasks";
import { useAddTask } from "@/hooks/Task/useAddTask";
import { useToggleTask } from "@/hooks/Task/useToggleTask";
import { useDeleteTask } from "@/hooks/Task/useDeleteTask";

export default function Tasks() {
  const [title, setTitle] = useState("");

  const addTask = useAddTask().mutate;
  const { data: tasks = [], isLoading, isError } = useTasks();
  const toggleTask = useToggleTask().mutate;
  const deleteTask = useDeleteTask().mutate;

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim()) return;
    addTask(title);
    setTitle("");
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Tasks</h1>
        <Badge variant="muted" size="sm">
          {tasks.filter((t) => t.completed).length}/{tasks.length}
        </Badge>
      </div>

      <form onSubmit={handleAdd} className="flex gap-2">
        <Input
          placeholder="Nuova task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button type="submit" disabled={!title.trim()}>
          Aggiungi
        </Button>
      </form>

      {isLoading && (
        <p className="text-center text-sm text-muted">Caricamento...</p>
      )}

      {isError && (
        <p className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-500">
          Errore nel caricamento delle task
        </p>
      )}

      <ul className="space-y-2">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex items-center gap-3 rounded-lg border border-border bg-surface px-4 py-3 transition-colors hover:bg-surface-hover"
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => {
                toggleTask(task.id);
              }}
              className="h-4 w-4 rounded border-border accent-primary"
            />
            <span
              className={`flex-1 text-sm ${task.completed ? "text-muted line-through" : "text-foreground"}`}
            >
              {task.title}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                deleteTask(task.id);
              }}
              className="text-muted hover:text-red-500"
            >
              Elimina
            </Button>
          </li>
        ))}
      </ul>

      {!isLoading && tasks.length === 0 && (
        <p className="text-center text-sm text-muted">
          Nessuna task. Aggiungine una!
        </p>
      )}
    </div>
  );
}
