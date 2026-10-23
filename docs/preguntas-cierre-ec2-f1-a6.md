# Preguntas de cierre - EC2 F1 A6

## 1. ¿Qué función cumple la interfaz Task?

Define la estructura que debe tener cada tarea: id, title, status,
createdAt y updatedAt. Funciona como un contrato común para los
datos y los componentes. Si a un objeto le falta una propiedad o
tiene un tipo incorrecto, TypeScript lo señala antes de ejecutar
la aplicación.

## 2. ¿Qué diferencia existe entre Task y TaskStatus?

Task describe la tarea completa, con todas sus propiedades.
TaskStatus es un tipo unión que solo permite dos valores para el
estado: pending y completed. Task usa TaskStatus como tipo de su
propiedad status.

## 3. ¿Qué significa declarar un arreglo como Task[]?

Significa que todos los elementos del arreglo deben cumplir con la
interfaz Task. En src/data/tasks.ts, si una de las cinco tareas
no tuviera id o tuviera un estado distinto de pending o completed,
TypeScript mostraría un error.

## 4. ¿Qué hace el método map?

Recorre un arreglo y crea un arreglo nuevo con un resultado por
cada elemento, sin modificar el original. En React se utiliza
para transformar cada objeto en un componente visual.

## 5. ¿Qué resultado produce map dentro de TaskList?

Produce una lista de componentes TaskItem, uno por cada tarea de
la colección. Cada TaskItem recibe su objeto task y su key.
Con las cinco tareas locales, se muestran cinco tarjetas.

## 6. ¿Para qué utiliza React la propiedad key?

React la utiliza para identificar cada elemento de una lista y
relacionarlo con su objeto. Así puede actualizar solo lo que
cambió sin recrear toda la lista. key es interna de React, por
lo que TaskItem no la recibe como prop.

## 7. ¿Por qué se utiliza task.id y no el índice?

task.id es único y estable, porque pertenece a la tarea. El
índice cambia si se agregan, eliminan o reordenan tareas, y eso
puede relacionar un elemento visual con la tarea equivocada.
Tampoco conviene Math.random(), porque generaría una clave nueva
en cada renderizado.

## 8. ¿Cómo se envía una tarea de TaskList a TaskItem?

Mediante la propiedad task. Dentro de map se escribe
`<TaskItem key={task.id} task={task} />`, y TaskItem la recibe
tipada como `task: Task` en su interfaz TaskItemProps.

## 9. ¿Cómo se comunican App, TaskSummary y TaskList?

Los datos fluyen del padre a los hijos mediante props. App importa
la colección tasks y se la envía a TaskSummary y a TaskList con
`tasks={tasks}`. Los hijos no modifican el arreglo, solamente
lo reciben y lo muestran.

## 10. ¿Qué es el renderizado condicional?

Es mostrar una estructura u otra según una condición. En TaskList,
si tasks.length es 0 se muestra el mensaje "No hay tareas
registradas"; si hay tareas, se muestra la lista creada con map.

## 11. ¿Por qué el resumen se calcula a partir de la colección?

Porque el total, los pendientes y los completados son datos
derivados que se pueden obtener de tasks con length y filter.
Si se escribieran a mano, podrían quedar desactualizados al
cambiar la colección. Calculándolos, el resumen siempre coincide
con los datos.

## 12. ¿Qué dificultad encontraste durante la refactorización y cómo la resolviste?

Después de cambiar TaskSummary para que recibiera la colección
tasks, App.tsx seguía enviándole total, pending y completed, y
pnpm build mostraba un error de tipos. Lo resolví enviando
`tasks={tasks}` y eliminando el cálculo duplicado en App. También
cambié el archivo de datos de task.ts a tasks.ts para seguir el
nombre de la guía y comprobé el resultado con pnpm lint y
pnpm build.
