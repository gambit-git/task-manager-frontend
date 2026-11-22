# Pruebas de API REST - EC3 F2 A10

## Entorno

- Rama: feature/api-rest-crud-remoto
- Dirección pública usada por el Frontend: /api
- Resultado de pnpm lint: sin errores
- Resultado de pnpm build: sin errores

## Casos ejecutados

Las pruebas contra la API real están **pendientes**. El Backend local
(task-api-express) todavía no implementa paginación, búsqueda, filtro por
estado ni ordenamiento: GET /api/tasks devuelve solo `{ data }`, sin
`meta`. Eso corresponde al Backend EC2 F3 A8. Completar la columna
"Obtenido" cuando ese Backend esté disponible.

| Caso | Método y ruta | Esperado | Obtenido | Resultado |
|---|---|---:|---:|---|
| Listar | GET /api/tasks | 200 | | Pendiente |
| Crear | POST /api/tasks | 201 | | Pendiente |
| Actualizar | PATCH /api/tasks/:id | 200 | | Pendiente |
| Eliminar | DELETE /api/tasks/:id | 204 | | Pendiente |
| Inexistente | GET /api/tasks/:id | 404 | | Pendiente |
| API detenida | GET /api/tasks | Error de red | | Pendiente |

## Evidencias

- Captura de la lista:
- Captura de Network:
- Captura del error y reintento:
- Observaciones: no se incluyen URI, usuario ni contraseña de MongoDB Atlas.
