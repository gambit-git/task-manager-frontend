# Preguntas de cierre - EC2 F1 A5

1.¿Qué problema resuelve React al construir una interfaz?

React permite organizar una interfaz en componentes reutilizables.
Esto facilita trabajar con partes pequeñas en lugar de tener toda
la página en un solo archivo. En este proyecto separamos el
encabezado, el formulario, los filtros y las tareas.

2.¿Qué es un componente?
Es una parte de la interfaz que tiene una responsabilidad definida.
En nuestro proyecto, cada componente es una función que devuelve
TSX. Por ejemplo, AppHeader muestra el encabezado y TaskForm
presenta el formulario visual.

3.¿Por qué los componentes comienzan con mayúscula?
React utiliza la mayúscula inicial para distinguir los componentes
propios de las etiquetas HTML. Por ejemplo, TaskItem representa
un componente, mientras que article representa una etiqueta HTML.

4.¿Qué diferencia existe entre HTML y TSX?

HTML describe la estructura de una página. TSX permite escribir
una estructura similar a HTML dentro de TypeScript, incorporando
expresiones y componentes. También utiliza atributos como
className y htmlFor, y exige cerrar las etiquetas.

5¿Para qué se utiliza className?

Se utiliza para asignar clases CSS a los elementos de la interfaz.
En React reemplaza el atributo class de HTML. Por ejemplo,
className="panel" aplica los estilos definidos en la regla .panel.

6.¿Qué son las propiedades o props?
Son datos que un componente padre entrega a un componente hijo.
Permiten reutilizar el mismo componente con información diferente.
Por ejemplo, TaskList envía un título y un estado a cada TaskItem.

7.¿Cómo ayuda TypeScript a validar las propiedades?
Permite definir qué propiedades necesita un componente y qué
tipos de valores acepta. TaskSummary recibe tres números:
total, pending y completed. Si falta alguno o se envía texto,
TypeScript señala el problema antes de ejecutar la aplicación.

8.¿Cuál es la responsabilidad de App.tsx?
App.tsx integra los componentes y establece su orden en la página.
También proporciona datos a componentes como TaskSummary y
AppFooter. Su responsabilidad principal es organizar la
estructura general de la aplicación.

9.¿Por qué la interfaz se dividió en varios componentes?

Para separar responsabilidades y facilitar la lectura, el
mantenimiento y la reutilización del código. Por ejemplo,
podemos modificar el encabezado en AppHeader sin cambiar
el código del formulario o de las tarjetas de tareas.

10.¿Por qué los botones todavía están deshabilitados?
Porque esta actividad se concentra en la estructura visual,
la composición y las propiedades tipadas. Todavía no hemos
implementado el comportamiento para agregar, editar, completar
o eliminar tareas. Los botones deshabilitados comunican que
esas acciones aún no están disponibles.

11.¿Qué componente consideras más reutilizable y por qué?
Considero que TaskItem es el más reutilizable porque permite
mostrar diferentes tareas conservando la misma estructura.
En TaskList lo utilizamos tres veces, cambiando solamente
las propiedades title y status.

12.¿Qué dificultad encontraste y cómo la resolviste?
Encontré errores al importar TaskList y AppFooter porque el
proyecto no reconocía las exportaciones esperadas. Revisé los
nombres, las rutas, las declaraciones export y que los archivos
estuvieran guardados. Después de corregirlos, ejecuté pnpm lint
y pnpm build para comprobar que el código no presentara errores.