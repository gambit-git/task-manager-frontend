import { useEffect, useState } from "react";
import { AppHeader } from "./components/AppHeader";
import { TaskFilters } from "./components/TaskFilters";
import { TaskForm } from "./components/TaskForm";
import { TaskList } from "./components/TaskList";
import { TaskPagination } from "./components/TaskPagination";
import { TaskSummary } from "./components/TaskSummary";
import { TaskActions } from "./components/TaskActions";
import { AppFooter } from "./components/AppFooter";
import { tasks as initialTasks } from "./data/tasks";
import type { Task } from "./models/task.interface";
import type { TaskFilter, TaskSort } from "./models/task-view.types";
import { getVisibleTasks } from "./services/task-query.service";
import { loadTasks, saveTasks } from "./services/task-storage.service";

const PAGE_SIZE = 5;

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(() => loadTasks(initialTasks));
  const [query, setQuery] = useState("");
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

  function handleDeleteTask(id: string): void {
    const selectedTask = tasks.find((task) => task.id === id);
    if (!selectedTask) {
      return;
    }
    const shouldDelete = window.confirm(
      `¿Eliminar la tarea "${selectedTask.title}"?`,
    );
    if (!shouldDelete) {
      return;
    }
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id));
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
    setQuery(value);
    setCurrentPage(1);
  }

  function handleFilterChange(value: TaskFilter): void {
    setFilter(value);
    setCurrentPage(1);
  }

  function handleClearCriteria(): void {
    setQuery("");
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
    <div className="app-shell">
      <AppHeader />
      <main className="app-main">
        <TaskForm onAddTask={handleAddTask} />
        <TaskFilters
          query={query}
          filter={filter}
          sortBy={sortBy}
          resultCount={visibleTasks.length}
          onQueryChange={handleQueryChange}
          onFilterChange={handleFilterChange}
          onSortChange={setSortBy}
          onClear={handleClearCriteria}
        />
        <TaskSummary tasks={tasks} />
        <TaskActions
          completedCount={completedCount}
          onClearCompleted={handleClearCompleted}
        />
        <TaskList
          tasks={paginatedTasks}
          emptyMessage={emptyMessage}
          onToggleStatus={handleToggleStatus}
          onEditTask={handleEditTask}
          onDeleteTask={handleDeleteTask}
        />
        <TaskPagination
          currentPage={safePage}
          totalPages={totalPages}
          onPrevious={handlePreviousPage}
          onNext={handleNextPage}
        />
      </main>
      <AppFooter courseName="Diseño Frontend con Frameworks" />
    </div>
  );
}
