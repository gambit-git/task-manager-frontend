# Administrador de tareas - Frontend

Proyecto desarrollado por Gerard Andrei Hincapié Méndez para
la asignatura Diseño Frontend con Frameworks.

Actividad EC2 F1 A5: inicialización del Administrador de tareas
con React, TypeScript y Vite.

## Tecnologías

- React
- TypeScript
- Vite
- PNPM
- CSS

## Alcance actual

La aplicación presenta una interfaz estática organizada mediante
componentes reutilizables y propiedades tipadas.

Muestra un encabezado, un formulario de registro, controles de
búsqueda y organización, un resumen y tres tareas de demostración:
una completada y dos pendientes.

El formulario, los filtros y las acciones todavía no modifican
las tareas. Los botones de agregar, cambiar estado, editar y
eliminar permanecen deshabilitados.

Esta versión no implementa estado, operaciones CRUD, persistencia
ni conexión con una API.

La interfaz incluye estilos adaptables a diferentes tamaños
de pantalla.

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

## Componentes principales

| Componente | Responsabilidad |
|---|---|
| App | Integra y organiza los componentes de la aplicación. |
| AppHeader | Presenta el título y la descripción del proyecto. |
| TaskForm | Muestra el formulario visual para registrar tareas. |
| TaskFilters | Presenta los controles de búsqueda, estado y orden. |
| TaskSummary | Recibe y muestra el total de tareas, pendientes y completadas. |
| TaskList | Agrupa las tres tareas de demostración. |
| TaskItem | Representa una tarea mediante su título y estado. |
| AppFooter | Muestra el pie de página y recibe el nombre del curso. |

## Desafío individual

El pie de página se extrajo de App.tsx al componente AppFooter.
Este recibe courseName como una propiedad de tipo string,
sin utilizar estado ni eventos.