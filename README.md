# Administrador de tareas - Frontend

Proyecto desarrollado por Gerard Andrei Hincapié Méndez para
la asignatura Diseño Frontend con Frameworks.

Actividad EC3 F2 A10: consumo de API REST y CRUD remoto con Fetch, sobre
la navegación SPA con React Router de la actividad 9.

## Tecnologías

- React
- React Router 7.18.4 (modo declarativo)
- TypeScript
- Vite
- PNPM
- CSS
- Fetch API (cliente HTTP propio)
- Git y GitHub

## Funciones actuales

- Navegación SPA: inicio, tareas, detalle y página 404.
- Listado paginado en el servidor (cinco por página).
- Búsqueda, filtro por estado y ordenamiento ejecutados por la API.
- Creación, edición y cambio de estado (POST y PATCH).
- Eliminación con confirmación (DELETE 204), también desde el detalle.
- Detalle consultado por identificador (GET /api/tasks/:id) con control
  de 404.
- Validación accesible del título (obligatorio, de 3 a 120 caracteres).
- Estados de carga, vacío, error y reintento.
- Cancelación de solicitudes obsoletas con AbortController.
- Interfaz adaptable a pantallas estrechas.

## Integración con la API REST

La aplicación consume la API de tareas mediante Fetch API. localStorage
ya no se usa: la API es la fuente de verdad.

### Requisitos

- Backend (task-api-express) disponible en http://localhost:3000 con el
  contrato de la guía: listado paginado `{ data, meta }` que acepta
  `page`, `limit`, `search`, `status`, `sortBy` y `order`.
- Frontend ejecutado mediante Vite (el proxy solo funciona con `pnpm dev`).
- MongoDB Atlas conectado desde el Backend.

### Configuración local

1. Copiar `.env.example` como `.env.local`.
2. Confirmar `VITE_API_URL=/api`. No es un secreto; las credenciales de
   Atlas pertenecen solo al `.env` del Backend.
3. Iniciar el Backend con `pnpm dev`.
4. Iniciar el Frontend con `pnpm dev`. El proxy de Vite reenvía `/api` a
   `http://localhost:3000`.

### Capas

| Archivo | Responsabilidad |
|---|---|
| config/env.ts | Lee y valida VITE_API_URL. |
| services/http.service.ts | Fetch, JSON, response.ok, 204 y errores normalizados (HttpError). |
| services/task.api.service.ts | Rutas, métodos y parámetros de consulta de las tareas. |
| hooks/useTaskList.ts | Consulta la lista, conserva meta, cancela solicitudes y permite reintentar. |
| models/api.types.ts | Contrato HTTP: respuestas, metadatos, errores y consulta. |

### Cambios respecto a la actividad 9

- Se retiraron el almacenamiento local, la consulta local y las tareas
  iniciales (data/tasks.ts, task-storage y task-query).
- App.tsx solo declara rutas; TasksPage coordina la consulta remota y
  TaskDetailPage consulta por id.
- Se retiró el botón "Eliminar completadas" porque la API no tiene esa
  ruta, y la búsqueda en la URL del desafío de la actividad 9.
- El resumen indica el total de la consulta y el conteo de la página
  actual, porque la API no entrega totales por estado.

## Rutas

| Ruta | Página | Responsabilidad |
|---|---|---|
| `/` | HomePage | Presenta la aplicación. |
| `/tasks` | TasksPage | CRUD remoto, consulta y paginación. |
| `/tasks/:taskId` | TaskDetailPage | Detalle de una tarea; mensaje si no existe. |
| `*` | NotFoundPage | Respuesta para direcciones inexistentes. |

## Requisitos

- Node.js
- PNPM
- Git para clonar el repositorio

## Instalación

```bash
git clone https://github.com/gambit-git/task-manager-frontend.git
cd task-manager-frontend
pnpm install
```

## Ejecución

```bash
pnpm dev
```

## Validación técnica

```bash
pnpm lint
pnpm build
```

## Estructura principal

- components: componentes visuales.
- config: variables de entorno.
- hooks: useTaskList.
- layouts: AppLayout (estructura compartida con Outlet).
- models: tipos e interfaces (Task, contrato HTTP, estados de solicitud).
- pages: HomePage, TasksPage, TaskDetailPage y NotFoundPage.
- services: cliente HTTP y servicio de tareas.
- utils: validación del título y formato de fechas.
- styles: estilos globales.
- docs: preguntas de cierre y pruebas.

## Modelos

Cada tarea contiene id, title, status, createdAt y updatedAt. El campo
status solo admite pending y completed (tipo TaskStatus). Las fechas son
cadenas ISO. Los criterios de la interfaz (TaskFilter y TaskSort) se
traducen a `status`, `sortBy` y `order` en TasksPage.

## Desafíos individuales

- Actividad 5: AppFooter recibe courseName como propiedad.
- Actividad 6: TaskStatusBadge recibe status de tipo TaskStatus.
- Actividad 7: eliminar tareas completadas (retirado en la actividad 10
  porque la API no ofrece esa operación).
- Actividad 8: paginación; desde la actividad 10 la hace el servidor
  mediante page, limit y los metadatos de la respuesta.
- Actividad 9: búsqueda en la URL con useSearchParams (retirada al pasar
  la consulta a TasksPage; puede retomarse con el desafío de la
  actividad 10).
