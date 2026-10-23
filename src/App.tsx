import { AppHeader } from './components/AppHeader';
import { TaskFilters } from './components/TaskFilters';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { TaskSummary } from './components/TaskSummary';
import { AppFooter } from './components/AppFooter';
import { tasks } from './data/task';

export default function App() {
  const completed = tasks.filter((task) => task.status === 'completed').length;
  const pending = tasks.length - completed;

  return (
    <div className="app-shell">
      <AppHeader />

      <main className="app-main">
        <TaskForm />
        <TaskFilters />

        <TaskSummary
          total={tasks.length}
          pending={pending}
          completed={completed}
        />

        <TaskList tasks={tasks} />
      </main>

      <AppFooter courseName="Diseño Frontend con Frameworks" />
    </div>
  );
}