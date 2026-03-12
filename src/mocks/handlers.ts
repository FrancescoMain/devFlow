import type { LoginResponse } from "@/types/Api/LoginResponse";
import type { Task } from "@/types/Task/Task";
import { http, HttpResponse } from "msw";

//MOCKS
let tasks: Task[] = [
  { id: "1", title: "Setup TanStack Query", completed: true },
  { id: "2", title: "Implementare optimistic updates", completed: false },
  { id: "3", title: "Creare pagina Tasks", completed: false },
];

export const handlers = [
  // AUTH
  http.post("/api/login", async ({ request }) => {
    const body = (await request.json()) as { email: string; password: string };

    if (body.email === "test@test.com" && body.password === "password") {
      return HttpResponse.json<LoginResponse>({
        token: "mock-jwt-token",
        user: { name: "Francesco", surname: "Cesarano", gender: "M" },
      });
    }
    return HttpResponse.json(
      { message: "Invalid credentials", status: 401 },
      { status: 401 },
    );
  }),

  http.get("/api/me", () => {
    return HttpResponse.json<LoginResponse>({
      token: "mock-jwt-token",
      user: { name: "Francesco", surname: "Cesarano", gender: "M" },
    });
  }),

  //TASK
  http.get("/api/tasks", async () => {
    return HttpResponse.json<Task[]>(tasks);
  }),
  http.post("/api/tasks", async ({ request }) => {
    const body = (await request.json()) as { title: string };
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: body.title,
      completed: false,
    };
    tasks.push(newTask);
    return HttpResponse.json<Task>(newTask);
  }),

  http.patch("/api/tasks/:id", async ({ params }) => {
    const task = tasks.find((t) => t.id === params.id);
    if (!task)
      return HttpResponse.json({ message: "Not found" }, { status: 404 });
    task.completed = !task.completed;
    return HttpResponse.json<Task>(task);
  }),
  http.delete("/api/tasks/:id", async ({ params }) => {
    tasks = tasks.filter((t) => t.id !== params.id);
    return HttpResponse.json({ success: true });
  }),
];
