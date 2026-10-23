# Administrador de tareas - Frontend

Proyecto desarrollado por Gerard Andrei Hincapié Méndez para
la asignatura Diseño Frontend con Frameworks.

Actividad EC2 F1 A6: modelado y renderizado dinámico de tareas
con React y TypeScript, como continuidad de la actividad 5.

## Tecnologías

- React
- TypeScript
- Vite
- PNPM
- CSS
- Git y GitHub

## Alcance actual

La aplicación permite visualizar una colección local de tareas
mediante componentes React.

Actualmente incluye:

- Modelo de tarea con TypeScript (interfaz Task y tipo unión TaskStatus).
- Cinco tareas locales tipadas como Task[]: tres pendientes y dos completadas.
- Renderizado mediante map.
- Uso de claves estables (task.id).
- Estados pendiente y completada, mostrados con TaskStatusBadge.
- Resumen calculado a partir de la colección.
- Mensaje para una colección vacía.
- Diseño adaptable.

El formulario, los filtros y las acciones todavía no modifican
las tareas. Los botones de agregar, cambiar estado, editar y
eliminar permanecen deshabilitados.

Los formularios, eventos y operaciones CRUD se implementarán
en actividades posteriores. Esta versión no implementa estado,
persistencia ni conexión con una API.

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

## Análisis del código

```bash
pnpm lint
```

## Compilación

```bash
pnpm build
```

## Estructura principal

- components: componentes visuales.
- data: colección local de tareas.
- models: tipos e interfaces.
- styles: estilos globales.
- docs: preguntas de cierre y documentación.

## Modelo Task

Cada tarea contiene id, title, status, createdAt y updatedAt.
El campo status solo admite los valores pending y completed
(tipo TaskStatus). Las fechas se guardan como cadenas ISO.

## Componentes principales

| Componente | Responsabilidad |
|---|---|
| App | Coordina la colección de tareas y la distribuye mediante props. |
| AppHeader | Presenta el título y la descripción del proyecto. |
| TaskForm | Muestra el formulario visual para registrar tareas. |
| TaskFilters | Presenta los controles de búsqueda, estado y orden. |
| TaskSummary | Calcula y muestra el total, pendientes y completadas a partir de la colección. |
| TaskList | Recorre la colección con map y muestra el mensaje de lista vacía. |
| TaskItem | Representa una tarea completa: título, estado y fecha de actualización. |
| TaskStatusBadge | Muestra la insignia Pendiente o Completada según un TaskStatus. |
| AppFooter | Muestra el pie de página y recibe el nombre del curso. |

## Desafíos individuales

- Actividad 5: el pie de página se extrajo de App.tsx al componente
  AppFooter, que recibe courseName como propiedad de tipo string.
- Actividad 6: la insignia de estado se extrajo de TaskItem al
  componente TaskStatusBadge, que recibe status de tipo TaskStatus,
  sin utilizar estado ni eventos.
