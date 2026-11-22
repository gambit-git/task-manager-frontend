# Preguntas de cierre - EC3 F1 A9

## 1. ¿Qué es una aplicación de página única?

Es una aplicación que carga un solo documento HTML y cambia lo que se ve
desde JavaScript. Cuando el usuario navega, no se pide otra página al
servidor: React Router cambia la dirección y renderiza el componente que
corresponde, así que el cambio es rápido y no se pierde el estado.

## 2. ¿Qué responsabilidad tiene BrowserRouter?

Da el contexto de navegación a toda la aplicación y se conecta con el
historial del navegador (la barra de direcciones y los botones Atrás y
Adelante). Se coloca una sola vez en `main.tsx`; sin él, hooks como
`useNavigate` o `useParams` fallan.

## 3. ¿Cuál es la diferencia entre Routes y Route?

`Routes` es el contenedor que mira la dirección actual y elige la rama que
coincide. `Route` declara una regla: relaciona un `path` con el `element`
que se debe mostrar.

## 4. ¿Qué es una ruta índice?

Es la página que se muestra por defecto dentro de una ruta padre cuando la
dirección no agrega nada más. Aquí `<Route index>` dentro del layout
muestra `HomePage` en `/`.

## 5. ¿Qué beneficio ofrece un layout?

Evita repetir encabezado, menú y pie de página en cada página. Esa
estructura se escribe una vez en `AppLayout` y cualquier cambio se hace en
un solo lugar.

## 6. ¿Qué función cumple Outlet?

Marca el lugar del layout donde se dibuja la página hija que React Router
seleccionó. Por eso `AppLayout` no necesita saber qué página está activa.

## 7. ¿Qué diferencia existe entre Link y NavLink?

Ambos navegan sin recargar. `NavLink` además informa si su ruta está activa
(`isActive`), lo que permite resaltar la opción actual del menú. `Link` se
usa para enlaces normales como "Ver detalle" o "Volver a tareas".

## 8. ¿Por qué no se utilizan enlaces a para navegar internamente?

Un `<a href>` pide el documento completo al servidor y recarga la página,
con lo que se reinicia el estado de React (por ejemplo, la búsqueda y el
filtro). `Link` solo cambia la ruta dentro de la SPA.

## 9. ¿Qué representa :taskId?

Una parte variable de la dirección. En `/tasks/:taskId`, lo que va después
de `/tasks/` es el identificador de la tarea, y una sola ruta sirve para
todas las tareas.

## 10. ¿Cómo se recupera un parámetro dinámico?

Con el hook `useParams`. En `TaskDetailPage` se hace
`const { taskId } = useParams()` y con ese valor se busca la tarea en el
arreglo. El nombre debe coincidir exactamente con el de la ruta.

## 11. ¿Cuándo debe utilizarse useNavigate?

Cuando hay que navegar como resultado de una acción y no por un clic en un
enlace. Aquí se usa al eliminar una tarea desde su detalle: la dirección
deja de ser válida, así que se vuelve a `/tasks` con `replace: true` para
que Atrás no regrese a un detalle eliminado.

## 12. ¿Qué función cumple la ruta *?

Captura cualquier dirección que no coincida con las demás y muestra
`NotFoundPage`, con un mensaje claro y un enlace para volver al inicio.

## 13. ¿Por qué el estado continúa administrado por App?

Porque `App` está por encima de todas las rutas. Si el estado viviera en una
página, se perdería al cambiar de ruta. Con `App` como fuente de verdad, las
páginas reciben los datos y las funciones por propiedades y no se duplica la
colección.

## 14. ¿Por qué localStorage permanece en esta actividad?

Porque esta actividad solo organiza la navegación. La conexión con la API
REST corresponde a la actividad 10; mientras tanto, localStorage conserva
las tareas al recargar.

## 15. ¿Qué dificultad encontraste y cómo la resolviste?

`onDeleteTask` devolvía `void`, pero el detalle necesita saber si el usuario
confirmó la eliminación antes de navegar. Lo resolví haciendo que
`handleDeleteTask` devuelva `boolean` (`false` si cancela o no existe,
`true` si elimina) y ajustando los tipos en `TaskList` y `TaskItem`.
