# Preguntas de cierre - EC3 F2 A10

## 1. ¿Qué diferencia existe entre una falla de red y una respuesta HTTP 404?

Una falla de red significa que la solicitud no llegó o no volvió una
respuesta (API apagada, conexión caída): `fetch` rechaza la promesa. Un 404
sí es una respuesta del servidor, que llegó bien y dice que el recurso no
existe. En el cliente la primera se normaliza como `NETWORK_ERROR` (status
0) y la segunda como un `HttpError` con status 404.

## 2. ¿Por qué debe comprobarse response.ok después de fetch?

Porque `fetch` no rechaza la promesa con un 404 o un 500; solo lo hace ante
fallas de red. Sin comprobar `response.ok`, el código trataría un error como
si fuera un resultado válido. Por eso el cliente convierte cualquier estado
no satisfactorio en un `HttpError`.

## 3. ¿Qué responsabilidad tiene http.service.ts?

Es el único lugar que hace `fetch`: agrega los encabezados, interpreta el
JSON, maneja el 204 sin cuerpo, comprueba `response.ok` y normaliza los
errores en `HttpError`. No sabe nada de tareas ni de componentes.

## 4. ¿Qué responsabilidad tiene task.api.service.ts?

Concentra las rutas, los métodos HTTP y la construcción de la consulta
(`URLSearchParams`) de las tareas: listar, consultar por id, crear,
actualizar y eliminar. Así los componentes no arman direcciones ni repiten
`JSON.stringify`.

## 5. ¿Por qué VITE_API_URL no debe contener credenciales?

Porque Vite incluye en el paquete del navegador toda variable que empiece
con `VITE_`, y cualquiera puede leerla. Solo debe tener la ruta pública
(`/api`); la cadena de Atlas va únicamente en el `.env` del Backend.

## 6. ¿Qué problema resuelve el proxy de Vite durante el desarrollo?

El Frontend corre en el puerto 5173 y la API en el 3000, y el navegador los
trata como orígenes distintos (CORS). El proxy recibe `/api` en el 5173 y lo
reenvía al 3000, así que para el navegador todo es del mismo origen.

## 7. ¿Por qué el proxy no sustituye la configuración de producción?

Porque solo existe en el servidor de desarrollo (`pnpm dev`); el resultado de
`pnpm build` son archivos estáticos sin proxy. En producción hay que
configurar el servidor (redirecciones o CORS), lo cual corresponde a la
actividad 12.

## 8. ¿Qué función cumple AbortController?

Permite cancelar una solicitud en curso. En `useTaskList`, la función de
limpieza del efecto aborta la consulta anterior cuando cambian la búsqueda,
el filtro, el orden o la página, para que una respuesta vieja no reemplace a
una más reciente.

## 9. ¿Por qué la ruta de detalle consulta la tarea por id?

Porque el detalle no debe depender de que la tarea esté en la página que se
cargó en la lista. Con `GET /api/tasks/:id`, abrir o recargar directamente
`/tasks/:taskId` funciona, y un id inexistente devuelve un 404 que se
muestra como "Tarea no encontrada".

## 10. ¿Por qué el formulario se limpia únicamente después de un POST satisfactorio?

Para no perder lo que escribió el usuario si la creación falla. `onAddTask`
devuelve una promesa con `true` o `false` y el formulario solo se limpia
cuando devuelve `true`.

## 11. ¿Qué ventaja ofrece separar la consulta remota de los componentes visuales?

Los componentes quedan simples y reutilizables, la lógica HTTP se prueba y
cambia en un solo lugar y, cuando llegue la autenticación, solo hay que
modificar el cliente HTTP y no cada componente.

## 12. ¿Qué cambio fue más difícil y cómo comprobaste que funcionaba?

Escribe aquí tu respuesta cuando hayas probado la integración con la API
(por ejemplo, con la pestaña Network y deteniendo el Backend para ver el
error y el botón Reintentar).
