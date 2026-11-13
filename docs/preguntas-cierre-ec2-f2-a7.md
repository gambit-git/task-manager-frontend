# Preguntas de cierre - EC2 F2 A7

## 1. ¿Qué diferencia existe entre una variable local y el estado de React?

Una variable local se vuelve a crear cada vez que el componente se renderiza,
así que pierde su valor y, si la cambio, React no se entera ni actualiza la
pantalla. El estado, en cambio, React lo guarda entre renderizados y, cuando
lo actualizo con su función set, vuelve a renderizar el componente con el
nuevo valor.

## 2. ¿Qué valores devuelve useState?

Devuelve un arreglo con dos elementos: el valor actual del estado y una
función para pedir el siguiente valor. Por ejemplo,
`const [tasks, setTasks] = useState<Task[]>(...)` me da la colección actual
en `tasks` y la función `setTasks` para reemplazarla.

## 3. ¿Por qué useState se declara en el nivel superior del componente?

Porque React identifica cada Hook por el orden en que se llama en cada
renderizado. Si lo pusiera dentro de un if, un ciclo o una función interna,
el orden podría cambiar de un renderizado a otro y React asociaría el estado
equivocado a cada Hook.

## 4. ¿Qué significa que un campo sea controlado?

Que su valor lo decide el estado de React y no el DOM. En TaskForm el input
recibe `value={title}` y en `onChange` se llama a `setTitle` con lo que
escribe el usuario, de modo que el campo y el estado siempre están
sincronizados. Eso me permite limpiar el campo, contar caracteres y
deshabilitar el botón cuando el título está vacío.

## 5. ¿Por qué handleSubmit utiliza preventDefault?

Porque el comportamiento normal de un formulario HTML al enviarse es recargar
la página. Si la página se recarga se pierde el estado en memoria, así que
`event.preventDefault()` evita esa recarga y deja que React maneje el
registro de la tarea.

## 6. ¿Cómo comunica TaskForm una nueva tarea a App?

App le pasa la función `handleAddTask` mediante la prop `onAddTask`. Cuando
se envía el formulario, TaskForm llama a `onAddTask(normalizedTitle)` con el
título ya recortado. TaskForm solo avisa qué título se quiere registrar; App
es quien construye la tarea y actualiza el estado.

## 7. ¿Por qué App funciona como fuente de verdad?

Porque la colección de tareas se guarda una sola vez, en el estado de App.
TaskSummary y TaskList reciben el mismo arreglo por props y los hijos solo
notifican acciones mediante funciones. Así no hay copias del estado que
haya que sincronizar y el resumen y la lista siempre coinciden.

## 8. ¿Cómo se implementa Create sin utilizar push?

Se crea un objeto `newTask` con `crypto.randomUUID()` como id, estado
`pending` y la fecha actual en `createdAt` y `updatedAt`. Luego se construye
un arreglo nuevo con spread: `[newTask, ...currentTasks]`. Así la tarea
queda al inicio y el arreglo anterior no se modifica.

## 9. ¿Cómo permite map actualizar una sola tarea?

`map` recorre todas las tareas y devuelve un arreglo nuevo. Para cada tarea
compara su `id` con el seleccionado: si no coincide la devuelve igual, y si
coincide devuelve una copia `{ ...task, ... }` con el nuevo estado o título y
un `updatedAt` nuevo. Como se copia con spread, el `id` y el `createdAt` se
conservan.

## 10. ¿Cómo utiliza filter la operación Delete?

`filter` crea un arreglo nuevo solo con las tareas que cumplen la condición
`task.id !== id`, es decir, todas menos la que se quiere eliminar. Antes de
eso se pide confirmación con `window.confirm`; si el usuario cancela, no se
llama a `setTasks`. En el desafío usé la misma idea con
`task.status !== 'completed'` para quitar todas las completadas.

## 11. ¿Por qué se emplea una función actualizadora en setTasks?

Porque el siguiente estado depende del anterior. Con
`setTasks((currentTasks) => ...)` React me entrega la versión más reciente
del estado, aunque haya otras actualizaciones pendientes, y así no trabajo
con una copia vieja de `tasks` que podría hacer que se pierdan cambios.

## 12. ¿Qué información conserva TaskItem como estado local?

Solo el estado temporal de la edición: `isEditing`, que indica si se muestra
el formulario en línea, y `draftTitle`, que es el borrador del título
mientras se escribe. La tarea real sigue en App; el borrador solo se envía
con `onEditTask` al guardar, y al cancelar se descarta restaurando el título
original.

## 13. ¿Por qué los cambios desaparecen al recargar la página?

Porque el estado de React vive en la memoria del navegador mientras la página
está abierta. Al recargar, la aplicación vuelve a iniciar y `useState` toma
otra vez las tareas iniciales de `src/data/tasks.ts`. Todavía no se usa
localStorage ni la API REST para guardar los datos.

## 14. ¿Qué dificultad encontraste y cómo la resolviste?

En la actividad 6 había extraído la insignia de estado al componente
TaskStatusBadge, pero el código de la guía para TaskItem volvía a escribir
el `span` directamente. Para no duplicar esa lógica, mantuve
TaskStatusBadge dentro de TaskItem. También tuve que pensar dónde calcular
`completedCount` para el desafío: lo dejé en App, derivado de `tasks`, en
lugar de guardarlo en otro estado, para que siempre coincida con la
colección.
