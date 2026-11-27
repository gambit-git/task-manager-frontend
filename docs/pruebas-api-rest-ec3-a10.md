# Pruebas de API REST - EC3 F2 A10

## Entorno

- Rama: feature/api-rest-crud-remoto
- Dirección pública usada por el Frontend: /api
- Proxy de Vite: /api → http://localhost:3000
- Backend: task-api-express (versión con paginación, búsqueda, filtro y
  ordenamiento, sin autenticación en las rutas de tareas) conectado a MongoDB
  Atlas
- Resultado de pnpm lint: sin errores
- Resultado de pnpm build: sin errores

## Casos ejecutados

Todas las solicitudes pasaron por el proxy de Vite (`http://localhost:5173/api`),
igual que las que hace el navegador.

| Caso | Método y ruta | Esperado | Obtenido | Resultado |
|---|---|---:|---:|---|
| Listar | GET /api/tasks?page=1&limit=5&sortBy=createdAt&order=desc | 200 | 200 | Correcto |
| Buscar y filtrar | GET /api/tasks?search=Prueba%20A10&status=completed&sortBy=title&order=asc | 200 | 200 | Correcto |
| Crear | POST /api/tasks | 201 | 201 | Correcto |
| Consultar por id | GET /api/tasks/:id | 200 | 200 | Correcto |
| Actualizar | PATCH /api/tasks/:id | 200 | 200 | Correcto |
| Eliminar | DELETE /api/tasks/:id | 204 | 204 | Correcto |
| Inexistente | GET /api/tasks/:id (ya eliminada) | 404 | 404 `TASK_NOT_FOUND` | Correcto |
| Id inválido | GET /api/tasks/abc | 400 | 400 `INVALID_ID` | Correcto |
| API detenida | GET /api/tasks | Error de red | 502 del proxy → `NETWORK_ERROR` | Correcto |
| Reintento | GET /api/tasks (API levantada otra vez) | 200 | 200 | Correcto |

## Observaciones

- La respuesta del listado incluye `data` y `meta` (`page`, `limit`, `total`,
  `totalPages`, `hasNextPage`, `hasPreviousPage`), que coincide con
  `TaskListResponse` del Frontend.
- Con la API detenida, `fetch` no falla: el proxy de Vite responde
  `502 Bad Gateway` en texto plano. El cliente HTTP trata los estados 502, 503
  y 504 sin cuerpo de error de la API como falla de conexión y muestra
  "No fue posible conectar con la API." con el botón Reintentar.
- No se incluyen URI, usuario ni contraseña de MongoDB Atlas.

## Evidencias

- Captura de la lista:
- Captura de Network:
- Captura del error y reintento:
