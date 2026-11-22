import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link } from 'react-router';
import type { Task } from '../models/task.interface';
import { formatTaskDate } from '../utils/date';
import {
  TASK_TITLE_MAX_LENGTH,
  validateTaskTitle,
} from '../utils/task-validation';
import { TaskStatusBadge } from './TaskStatusBadge';

interface TaskItemProps {
  task: Task;
  onToggleStatus: (task: Task) => Promise<boolean>;
  onEditTask: (task: Task, title: string) => Promise<boolean>;
  onDeleteTask: (task: Task) => Promise<boolean>;
}

export function TaskItem({
  task,
  onToggleStatus,
  onEditTask,
  onDeleteTask,
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(task.title);
  const [error, setError] = useState('');
  const [isBusy, setIsBusy] = useState(false);

  function startEditing(): void {
    setDraftTitle(task.title);
    setError('');
    setIsEditing(true);
  }

  function cancelEditing(): void {
    setDraftTitle(task.title);
    setError('');
    setIsEditing(false);
  }

  function handleDraftChange(value: string): void {
    setDraftTitle(value);

    if (error) {
      setError(validateTaskTitle(value) ?? '');
    }
  }

  async function handleEditSubmit(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    const validationMessage = validateTaskTitle(draftTitle);

    if (validationMessage) {
      setError(validationMessage);
      return;
    }

    setIsBusy(true);
    const wasUpdated = await onEditTask(task, draftTitle.trim());
    setIsBusy(false);

    if (wasUpdated) {
      setIsEditing(false);
      setError('');
    }
  }

  async function handleToggle(): Promise<void> {
    setIsBusy(true);
    await onToggleStatus(task);
    setIsBusy(false);
  }

  async function handleDelete(): Promise<void> {
    setIsBusy(true);
    await onDeleteTask(task);
    setIsBusy(false);
  }

  return (
    <article
      className={`task-item task-item--${task.status}`}
      role="listitem"
      aria-busy={isBusy}
    >
      <div className="task-item__content">
        {isEditing ? (
          <form
            className="task-item__edit-form"
            onSubmit={(event) => void handleEditSubmit(event)}
            noValidate
          >
            <label className="sr-only" htmlFor={`edit-task-${task.id}`}>
              Editar título de la tarea
            </label>

            <input
              id={`edit-task-${task.id}`}
              className="task-item__edit-input"
              value={draftTitle}
              maxLength={TASK_TITLE_MAX_LENGTH}
              disabled={isBusy}
              onChange={(event) => handleDraftChange(event.target.value)}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? `edit-error-${task.id}` : undefined}
              autoFocus
            />

            {error && (
              <p
                id={`edit-error-${task.id}`}
                className="field-error"
                role="alert"
              >
                {error}
              </p>
            )}

            <div className="task-item__edit-actions">
              <button type="submit" disabled={isBusy}>
                Guardar
              </button>
              <button type="button" disabled={isBusy} onClick={cancelEditing}>
                Cancelar
              </button>
            </div>
          </form>
        ) : (
          <>
            <h3 className="task-item__title">{task.title}</h3>
            <TaskStatusBadge status={task.status} />
            <p className="task-item__date">
              Actualizada:{' '}
              <time dateTime={task.updatedAt}>
                {formatTaskDate(task.updatedAt)}
              </time>
            </p>
          </>
        )}
      </div>

      <div
        className="task-item__actions"
        role="group"
        aria-label={`Acciones para ${task.title}`}
      >
        {!isEditing && (
          <Link
            className="button-link button-link--secondary"
            to={`/tasks/${task.id}`}
          >
            Ver detalle
          </Link>
        )}
        <button
          type="button"
          disabled={isBusy || isEditing}
          onClick={() => void handleToggle()}
        >
          {task.status === 'completed' ? 'Reabrir' : 'Completar'}
        </button>
        <button
          type="button"
          disabled={isBusy || isEditing}
          onClick={startEditing}
        >
          Editar
        </button>
        <button
          type="button"
          className="button-danger"
          disabled={isBusy || isEditing}
          onClick={() => void handleDelete()}
        >
          Eliminar
        </button>
      </div>
    </article>
  );
}
