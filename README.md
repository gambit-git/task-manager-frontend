# Administrador de tareas - Frontend

Proyecto desarrollado por Gerard Andrei Hincapié Méndez para
la asignatura Diseño Frontend con Frameworks.

Actividad EC2 F2 A7: estado local, eventos y operaciones CRUD de
tareas con React y TypeScript, como continuidad de la actividad 6.

## Tecnologías

- React
- TypeScript
- Vite
- PNPM
- CSS
- Git y GitHub

## Alcance actual

La aplicación administra una colección local de tareas mediante
estado de React (useState en App). Actualmente permite:

- Registrar tareas mediante un formulario controlado.
- Consultar la colección.
- Completar y reabrir tareas.
- Editar títulos mediante un formulario en línea.
- Cancelar una edición sin alterar la tarea.
- Eliminar con confirmación.
- Eliminar todas las tareas completadas en una sola operación.
- Calcular el resumen automáticamente.
- Mostrar una colección vacía.

Los cambios permanecen en memoria y se reinician al recargar.
La búsqueda, los filtros, el ordenamiento y la persistencia se
implementarán en la actividad 8.

## Operaciones CRUD

- Create: registro mediante el formulario (spread, sin push).
- Read: renderizado de la colección con map.
- Update: cambio de estado y edición del título con map y spread.
- Delete: eliminación confirmada con filter.

Todas las operaciones usan una función actualizadora en setTasks
y producen un arreglo nuevo, sin mutar el estado existente.

## Requisitos

- Node.js
- PNPM
- Git para clonar el repositorio

## Instalación

Clonar el repositorio:

```bash
git clone https://github.com/gambit-git/task-manager-frontend.git
cd task-manager-frontend
```

Instalar las dependencias:

```bash
pnpm install
```

## Ejecución

```bash
pnpm dev
```

Abrir en el navegador la dirección local que indique Vite.

## Análisis del código

```bash
pnpm lint
```

## Compilación

```bash
pnpm build
```

## Estructura principal

- components: componentes visuales.
- data: colección local de tareas.
- models: tipos e interfaces.
- styles: estilos globales.
- docs: preguntas de cierre y documentación.

## Modelo Task

Cada tarea contiene id, title, status, createdAt y updatedAt.
El campo status solo admite los valores pending y completed
(tipo TaskStatus). Las fechas se guardan como cadenas ISO.

## Componentes principales

| Componente | Responsabilidad |
|---|---|
| App | Fuente de verdad: guarda Task[] con useState e implementa las operaciones CRUD. |
| AppHeader | Presenta el título y la descripción del proyecto. |
| TaskForm | Formulario controlado que notifica una nueva tarea mediante onAddTask. |
| TaskFilters | Presenta los controles de búsqueda, estado y orden. |
| TaskSummary | Calcula y muestra el total, pendientes y completadas a partir de la colección. |
| TaskActions | Elimina todas las tareas completadas con confirmación. |
| TaskList | Recorre la colección con map, reenvía las acciones y muestra el mensaje de lista vacía. |
| TaskItem | Muestra una tarea y permite completar, reabrir, editar, cancelar y eliminar. Conserva solo el estado temporal de edición. |
| TaskStatusBadge | Muestra la insignia Pendiente o Completada según un TaskStatus. |
| AppFooter | Muestra el pie de página y recibe el nombre del curso. |

## Desafíos individuales

- Actividad 5: el pie de página se extrajo de App.tsx al componente
  AppFooter, que recibe courseName como propiedad de tipo string.
- Actividad 6: la insignia de estado se extrajo de TaskItem al
  componente TaskStatusBadge, que recibe status de tipo TaskStatus,
  sin utilizar estado ni eventos.
- Actividad 7: el componente TaskActions recibe completedCount y
  onClearCompleted, se deshabilita cuando no hay completadas, solicita
  confirmación y App elimina las tareas completadas mediante filter.
