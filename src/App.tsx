import { useEffect, useState } from "react";
import { Route, Routes, useSearchParams } from "react-router";
import { tasks as initialTasks } from "./data/tasks";
import { AppLayout } from "./layouts/AppLayout";
import type { Task } from "./models/task.interface";
import type { TaskFilter, TaskSort } from "./models/task-view.types";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { TaskDetailPage } from "./pages/TaskDetailPage";
import { TasksPage } from "./pages/TasksPage";
import { getVisibleTasks } from "./services/task-query.service";
import { loadTasks, saveTasks } from "./services/task-storage.service";

const PAGE_SIZE = 5;

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(() => loadTasks(initialTasks));
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const [filter, setFilter] = useState<TaskFilter>("all");
  const [sortBy, setSortBy] = useState<TaskSort>("updated-desc");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const visibleTasks = getVisibleTasks(tasks, {
    query,
    filter,
    sortBy,
  });

  const totalPages = Math.max(1, Math.ceil(visibleTasks.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * PAGE_SIZE;
  const paginatedTasks = visibleTasks.slice(startIndex, startIndex + PAGE_SIZE);

  const hasActiveCriteria = query.trim() !== "" || filter !== "all";

  const emptyMessage = hasActiveCriteria
    ? "No hay tareas que coincidan con la búsqueda y el filtro."
    : "Utiliza el formulario para registrar una nueva actividad.";

  function handleAddTask(title: string): void {
    const now = new Date().toISOString();
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      status: "pending",
      createdAt: now,
      updatedAt: now,
    };
    setTasks((currentTasks) => [newTask, ...currentTasks]);
  }

  function handleToggleStatus(id: string): void {
    const now = new Date().toISOString();
    setTasks((currentTasks) =>
      currentTasks.map((task) => {
        if (task.id !== id) {
          return task;
        }
        return {
          ...task,
          status: task.status === "pending" ? "completed" : "pending",
          updatedAt: now,
        };
      }),
    );
  }

  function handleEditTask(id: string, title: string): void {
    const now = new Date().toISOString();
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              title,
              updatedAt: now,
            }
          : task,
      ),
    );
  }

  function handleDeleteTask(id: string): boolean {
    const selectedTask = tasks.find((task) => task.id === id);
    if (!selectedTask) {
      return false;
    }
    const shouldDelete = window.confirm(
      `¿Eliminar la tarea "${selectedTask.title}"?`,
    );
    if (!shouldDelete) {
      return false;
    }
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id));
    return true;
  }

  const completedCount = tasks.filter(
    (task) => task.status === "completed",
  ).length;

  function handleClearCompleted(): void {
    if (completedCount === 0) {
      return;
    }
    const shouldClear = window.confirm(
      `¿Eliminar ${completedCount} tarea(s) completada(s)?`,
    );
    if (!shouldClear) {
      return;
    }
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.status !== "completed"),
    );
  }

  function handleQueryChange(value: string): void {
    setSearchParams(
      (currentParams) => {
        const nextParams = new URLSearchParams(currentParams);
        if (value.trim() === "") {
          nextParams.delete("q");
        } else {
          nextParams.set("q", value);
        }
        return nextParams;
      },
      { replace: true },
    );
    setCurrentPage(1);
  }

  function handleFilterChange(value: TaskFilter): void {
    setFilter(value);
    setCurrentPage(1);
  }

  function handleClearCriteria(): void {
    setSearchParams(
      (currentParams) => {
        const nextParams = new URLSearchParams(currentParams);
        nextParams.delete("q");
        return nextParams;
      },
      { replace: true },
    );
    setFilter("all");
    setSortBy("updated-desc");
    setCurrentPage(1);
  }

  function handlePreviousPage(): void {
    setCurrentPage(Math.max(1, safePage - 1));
  }

  function handleNextPage(): void {
    setCurrentPage(Math.min(totalPages, safePage + 1));
  }

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<HomePage tasks={tasks} />} />
        <Route
          path="tasks"
          element={
            <TasksPage
              tasks={tasks}
              visibleCount={visibleTasks.length}
              paginatedTasks={paginatedTasks}
              currentPage={safePage}
              totalPages={totalPages}
              completedCount={completedCount}
              query={query}
              filter={filter}
              sortBy={sortBy}
              emptyMessage={emptyMessage}
              onAddTask={handleAddTask}
              onQueryChange={handleQueryChange}
              onFilterChange={handleFilterChange}
              onSortChange={setSortBy}
              onClearCriteria={handleClearCriteria}
              onClearCompleted={handleClearCompleted}
              onPreviousPage={handlePreviousPage}
              onNextPage={handleNextPage}
              onToggleStatus={handleToggleStatus}
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
            />
          }
        />
        <Route
          path="tasks/:taskId"
          element={
            <TaskDetailPage tasks={tasks} onDeleteTask={handleDeleteTask} />
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
