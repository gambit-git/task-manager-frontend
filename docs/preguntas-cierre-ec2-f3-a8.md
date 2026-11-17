# Preguntas de cierre - EC2 F3 A8

## 1. ¿Por qué las reglas de validación se colocaron en una utilidad?

Porque el título se valida en dos lugares: al registrar en TaskForm y al
editar en TaskItem. Si la regla estuviera escrita dentro de cada
componente, tendría que mantenerla duplicada y podrían quedar con reglas
distintas. Con `validateTaskTitle` en `utils/task-validation.ts` hay una
sola fuente de la regla, y si cambia el mínimo o el máximo lo cambio en un
solo lugar.

## 2. ¿Qué significa el retorno string | null de validateTaskTitle?

Que la función devuelve un texto cuando hay un problema (el mensaje de
error) y `null` cuando el título es válido. Así quien la llama debe
comprobar el resultado antes de continuar: si hay mensaje lo muestra y se
detiene, y si es `null` sigue con el registro o la edición.

## 3. ¿Qué función cumplen aria-invalid, aria-describedby y role alert?

Son atributos de accesibilidad para quien usa un lector de pantalla.
`aria-invalid` indica que el valor del campo no es válido.
`aria-describedby` vincula el campo con el texto de ayuda y con el mensaje
de error, para que se lean junto con el campo. `role="alert"` hace que el
mensaje se anuncie en el momento en que aparece, sin que el usuario tenga
que buscarlo.

## 4. ¿Por qué query, filter y sortBy son estados controlados?

Porque su valor lo guarda App con `useState` y los controles solo lo
muestran con `value` y avisan los cambios con `onChange`. Así la pantalla y
el estado siempre coinciden, y desde App puedo calcular la lista visible y
también restablecer los tres criterios con el botón de limpiar.

## 5. ¿Por qué visibleTasks no debe almacenarse como estado independiente?

Porque se puede calcular en cada renderizado a partir de `tasks`, `query`,
`filter` y `sortBy`. Si lo guardara como otro estado tendría dos copias de
la colección que sincronizar, y bastaría olvidar actualizar una para que la
lista mostrara datos que no coinciden con las tareas reales.

## 6. ¿Cómo se normaliza una búsqueda?

Con `trim()` se quitan los espacios del inicio y del final, y con
`toLocaleLowerCase('es-MX')` se pasa el texto a minúsculas. El título de
cada tarea también se pasa a minúsculas antes de usar `includes`, así que
"Programar" y " programar " encuentran lo mismo.

## 7. ¿Por qué se crea una copia antes de utilizar sort?

Porque `sort` modifica el arreglo sobre el que se ejecuta. Si ordenara
directamente `tasks`, estaría mutando el estado de React. Por eso uso
`[...filteredTasks].sort(...)`: ordeno una copia y el arreglo original queda
igual.

## 8. ¿Qué responsabilidad tiene task-query.service.ts?

Transformar datos: recibe la colección y los criterios, y devuelve las
tareas que se deben mostrar, buscadas, filtradas y ordenadas. No conoce
componentes, no usa estado y no modifica lo que recibe, así que es una
función pura que se puede probar por separado.

## 9. ¿Por qué el resultado de JSON.parse se trata como unknown?

Porque lo guardado en localStorage puede ser cualquier cosa: alguien pudo
modificarlo desde las herramientas del navegador o pudo guardarse una
versión anterior con otra forma. Tratarlo como `unknown` me obliga a
comprobar su forma antes de usarlo como `Task[]`, en lugar de confiar en él
a ciegas.

## 10. ¿Qué comprueba la función isTask?

Que el valor sea un objeto y que tenga `id` y `title` de tipo texto, un
`status` válido (`pending` o `completed`) y `createdAt` y `updatedAt` como
texto que `Date.parse` pueda convertir en una fecha real. Si falla una de
estas condiciones, el valor no se considera una tarea y `loadTasks` usa las
tareas de respaldo.

## 11. ¿Qué ventaja ofrece la inicialización diferida de useState?

Con `useState(() => loadTasks(initialTasks))` React ejecuta la función solo
al crear el estado, es decir, una vez. Si escribiera `loadTasks(...)`
directamente, se leería y validaría localStorage en cada renderizado aunque
el resultado se descartara.

## 12. ¿Por qué localStorage se sincroniza mediante useEffect?

Porque localStorage es un sistema externo a React y guardar en él es un
efecto secundario, que no debe ocurrir mientras se calcula lo que se dibuja.
Con `useEffect(() => saveTasks(tasks), [tasks])` se guarda después de que
cambia la colección y solo en ese caso, porque `tasks` es la única
dependencia. Los cambios de búsqueda, filtro u orden no provocan guardados.

## 13. ¿Por qué TaskSummary recibe tasks y TaskList recibe visibleTasks?

Porque el resumen debe reflejar el total real de la colección, sin importar
qué se esté buscando o filtrando, mientras que la lista solo debe mostrar
las tareas que cumplen los criterios. Si el resumen recibiera `visibleTasks`,
los totales cambiarían al filtrar y dejarían de ser el total de tareas.

## 14. ¿Qué información se pierde y cuál permanece al recargar?

Permanecen las tareas (con sus títulos, estados y fechas), porque se guardan
en localStorage con la clave `task-manager.tasks`. Se pierden la búsqueda, el
filtro, el orden y cualquier edición que no se haya guardado, porque esos
valores solo viven en el estado de React y vuelven a su valor inicial. Los
datos siguen siendo locales a ese navegador y a ese origen.

## 15. ¿Qué dificultad encontraste y cómo la resolviste?

El código de la guía reemplazaba archivos completos y, al hacerlo, quitaba
los desafíos de actividades anteriores: en App.tsx sustituía AppFooter por un
pie escrito a mano y no incluía TaskActions, y en TaskItem volvía a escribir
la insignia en lugar de usar TaskStatusBadge. Para no perder ese trabajo
pegué el código de la guía conservando esos tres componentes. También
encontré que el estilo `.filters-grid` ya existía en mi CSS, así que lo
modifiqué en lugar de duplicarlo, y que mi media query de 720 px ya cubría
la adaptación a pantallas estrechas. Además, algunos fragmentos del PDF se
copiaban con las líneas desordenadas, por lo que reconstruí TaskFilters y
TaskList a partir de su estructura.
