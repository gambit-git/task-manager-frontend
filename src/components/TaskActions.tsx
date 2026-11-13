interface TaskActionsProps {
  completedCount: number;
  onClearCompleted: () => void;
}

export function TaskActions({
  completedCount,
  onClearCompleted,
}: TaskActionsProps) {
  const completedLabel =
    completedCount === 1
      ? '1 tarea completada'
      : `${completedCount} tareas completadas`;

  return (
    <section className="panel task-actions" aria-label="Acciones generales">
      <p>{completedLabel}</p>

      <button
        type="button"
        className="button-danger"
        onClick={onClearCompleted}
        disabled={completedCount === 0}
      >
        Eliminar completadas
      </button>
    </section>
  );
}
