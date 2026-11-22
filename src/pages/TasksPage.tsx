import { TaskActions } from '../components/TaskActions';
import { TaskFilters } from '../components/TaskFilters';
import { TaskForm } from '../components/TaskForm';
import { TaskList } from '../components/TaskList';
import { TaskPagination } from '../components/TaskPagination';
import { TaskSummary } from '../components/TaskSummary';
import type { Task } from '../models/task.interface';
import type { TaskFilter, TaskSort } from '../models/task-view.types';

interface TasksPageProps {
  tasks: Task[];
  visibleCount: number;
  paginatedTasks: Task[];
  currentPage: number;
  totalPages: number;
  completedCount: number;
  query: string;
  filter: TaskFilter;
  sortBy: TaskSort;
  emptyMessage: string;
  onAddTask: (title: string) => void;
  onQueryChange: (value: string) => void;
  onFilterChange: (value: TaskFilter) => void;
  onSortChange: (value: TaskSort) => void;
  onClearCriteria: () => void;
  onClearCompleted: () => void;
  onPreviousPage: () => void;
  onNextPage: () => void;
  onToggleStatus: (id: string) => void;
  onEditTask: (id: string, title: string) => void;
  onDeleteTask: (id: string) => boolean;
}

export function TasksPage({
  tasks,
  visibleCount,
  paginatedTasks,
  currentPage,
  totalPages,
  completedCount,
  query,
  filter,
  sortBy,
  emptyMessage,
  onAddTask,
  onQueryChange,
  onFilterChange,
  onSortChange,
  onClearCriteria,
  onClearCompleted,
  onPreviousPage,
  onNextPage,
  onToggleStatus,
  onEditTask,
  onDeleteTask,
}: TasksPageProps) {
  return (
    <div className="page-stack">
      <section className="page-introduction" aria-labelledby="tasks-page-title">
        <p className="section-heading__eyebrow">Gestión</p>
        <h2 id="tasks-page-title">Mis tareas</h2>
        <p>
          Registra, consulta y actualiza las actividades almacenadas en el
          navegador.
        </p>
      </section>
      <TaskForm onAddTask={onAddTask} />
      <TaskFilters
        query={query}
        filter={filter}
        sortBy={sortBy}
        resultCount={visibleCount}
        onQueryChange={onQueryChange}
        onFilterChange={onFilterChange}
        onSortChange={onSortChange}
        onClear={onClearCriteria}
      />
      <TaskSummary tasks={tasks} />
      <TaskActions
        completedCount={completedCount}
        onClearCompleted={onClearCompleted}
      />
      <TaskList
        tasks={paginatedTasks}
        emptyMessage={emptyMessage}
        onToggleStatus={onToggleStatus}
        onEditTask={onEditTask}
        onDeleteTask={onDeleteTask}
      />
      <TaskPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPrevious={onPreviousPage}
        onNext={onNextPage}
      />
    </div>
  );
}
