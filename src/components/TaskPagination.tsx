import type { PageMeta } from '../models/api.types';

interface TaskPaginationProps {
  meta: PageMeta;
  disabled: boolean;
  onPageChange: (page: number) => void;
}

export function TaskPagination({
  meta,
  disabled,
  onPageChange,
}: TaskPaginationProps) {
  if (meta.totalPages <= 1) {
    return null;
  }

  return (
    <nav className="panel task-pagination" aria-label="Paginación de tareas">
      <button
        type="button"
        disabled={disabled || !meta.hasPreviousPage}
        onClick={() => onPageChange(meta.page - 1)}
      >
        Anterior
      </button>

      <p role="status" aria-live="polite">
        Página {meta.page} de {meta.totalPages}
      </p>

      <button
        type="button"
        disabled={disabled || !meta.hasNextPage}
        onClick={() => onPageChange(meta.page + 1)}
      >
        Siguiente
      </button>
    </nav>
  );
}
