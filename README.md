# Administrador de tareas - Frontend

Proyecto desarrollado por Gerard Andrei Hincapié Méndez para
la asignatura Diseño Frontend con Frameworks.

Actividad EC2 F3 A8: validación accesible, búsqueda, filtros,
ordenamiento y persistencia local con React y TypeScript, como
continuidad de la actividad 7.

## Tecnologías

- React
- TypeScript
- Vite
- PNPM
- CSS
- Web Storage (localStorage)
- Git y GitHub

## Funciones actuales

La aplicación administra una colección de tareas mediante estado de
React (useState en App) y la conserva en el navegador. Permite:

- Registrar tareas mediante un formulario controlado.
- Validar el título al registrar y al editar (obligatorio, mínimo de
  3 y máximo de 120 caracteres) con mensajes accesibles.
- Completar y reabrir tareas.
- Editar títulos mediante un formulario en línea y cancelar la edición
  sin alterar la tarea.
- Eliminar con confirmación.
- Eliminar todas las tareas completadas en una sola operación.
- Buscar por título sin distinguir mayúsculas, minúsculas ni espacios
  externos.
- Filtrar por estado: todas, pendientes o completadas.
- Ordenar por actualización reciente, creación reciente o título A-Z.
- Limpiar los criterios de consulta.
- Calcular el resumen con todas las tareas, sin importar los filtros.
- Mostrar un mensaje distinto cuando no hay tareas y cuando ninguna
  coincide con la consulta.
- Conservar las tareas al recargar mediante localStorage.
- Adaptar los controles a pantallas estrechas.

## Alcance

Esta versión utiliza almacenamiento local del navegador y del origen
actual. La búsqueda, el filtro y el orden no se guardan: vuelven a su
valor inicial al recargar. No se usan Fetch API, Axios, autenticación
ni estado global. La conexión con la API REST se realizará en el
elemento de competencia 3.

## Flujo de datos

- Carga inicial: loadTasks lee localStorage (o usa las tareas
  iniciales) y el resultado se convierte en el estado tasks de App.
- Vista derivada: getVisibleTasks calcula visibleTasks durante el
  renderizado a partir de tasks, query, filter y sortBy. No se guarda
  como estado.
- Sincronización: un useEffect con dependencia [tasks] guarda la
  colección en localStorage cada vez que cambia.

## Operaciones CRUD

- Create: registro mediante el formulario (spread, sin push).
- Read: renderizado de la colección visible con map.
- Update: cambio de estado y edición del título con map y spread.
- Delete: eliminación confirmada con filter.

Todas las operaciones usan una función actualizadora en setTasks
y producen un arreglo nuevo, sin mutar el estado existente.

## Persistencia y seguridad de tipos

Los datos se guardan como JSON en la clave task-manager.tasks. Al
recuperarlos, el resultado de JSON.parse se trata como unknown y se
valida con los type guards isTaskStatus e isTask. Si el valor no
existe, no es JSON válido o no tiene la forma de Task[], la
aplicación inicia con las tareas de respaldo. Un arreglo vacío
guardado es válido y se conserva.

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

## Validación técnica

```bash
pnpm lint
pnpm build
```

## Estructura principal

- components: componentes visuales.
- data: colección inicial de tareas.
- models: tipos e interfaces (Task, TaskFilter, TaskSort).
- services: consulta de tareas y almacenamiento local.
- utils: validación del título.
- styles: estilos globales.
- docs: preguntas de cierre y documentación.

## Modelos

Cada tarea contiene id, title, status, createdAt y updatedAt.
El campo status solo admite los valores pending y completed
(tipo TaskStatus). Las fechas se guardan como cadenas ISO.

Los criterios de consulta se tipan en task-view.types.ts:
TaskFilter (all, pending o completed), TaskSort (updated-desc,
created-desc o title-asc) y TaskViewOptions.

## Servicios y utilidades

| Archivo | Responsabilidad |
|---|---|
| utils/task-validation.ts | validateTaskTitle devuelve un mensaje o null; define la longitud máxima. |
| services/task-query.service.ts | getVisibleTasks busca, filtra y ordena una copia sin modificar el estado. |
| services/task-storage.service.ts | loadTasks y saveTasks encapsulan localStorage y validan los datos recuperados. |

## Componentes principales

| Componente | Responsabilidad |
|---|---|
| App | Fuente de verdad: guarda Task[] y los criterios de consulta, implementa el CRUD y sincroniza localStorage. |
| AppHeader | Presenta el título y la descripción del proyecto. |
| TaskForm | Formulario controlado con validación accesible que notifica una nueva tarea mediante onAddTask. |
| TaskFilters | Controles controlados de búsqueda, estado y orden, con opción para limpiar criterios y el conteo de resultados. |
| TaskSummary | Calcula y muestra el total, pendientes y completadas de toda la colección. |
| TaskActions | Elimina todas las tareas completadas con confirmación. |
| TaskList | Recorre las tareas visibles con map, reenvía las acciones y muestra el mensaje de lista vacía recibido. |
| TaskItem | Muestra una tarea y permite completar, reabrir, editar con validación, cancelar y eliminar. Conserva solo el estado temporal de edición. |
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
- Actividad 8: el desafío opcional de paginación local no forma parte
  de esta entrega.
