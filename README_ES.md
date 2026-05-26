# 📋 Gestor de Tareas Moderno

Una aplicación web moderna y profesional para gestionar tareas, construida con React, TypeScript, Tailwind CSS y Supabase.

## 🚀 Características

- ✨ Interfaz moderna y responsiva
- 📊 Dashboard con estadísticas en tiempo real
- ➕ Crear, editar y eliminar tareas
- 🎯 Filtros avanzados (estado, prioridad, responsable)
- 🔍 Buscador de tareas por título
- 📈 Seguimiento de progreso con porcentaje de avance
- 🎨 Colores automáticos según estado y fecha límite
  - 🟢 Verde: Tarea terminada
  - 🟡 Amarillo: Próxima a vencer (2 días o menos)
  - 🔴 Rojo: Tarea vencida
  - 🔵 Azul: Pendiente normal
- ⏰ Alertas visuales para tareas próximas a vencer
- 📱 Diseño responsive para dispositivos móviles y escritorio
- 🎯 Modales elegantes para crear y editar tareas
- 💾 Sincronización en tiempo real con Supabase

## 🛠️ Tecnologías

- **React 19** - Librería de UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool ultra rápido
- **Tailwind CSS** - Framework de CSS
- **Supabase** - Backend y base de datos
- **React Toastify** - Notificaciones
- **React Icons** - Iconos modernos

## 📋 Requisitos

- Node.js 16+ 
- npm o yarn
- Cuenta de Supabase

## 🔧 Instalación

1. **Clona el repositorio**
```bash
git clone <tu-repositorio>
cd tareas
```

2. **Instala las dependencias**
```bash
npm install
```

3. **Agrega las dependencias adicionales**
```bash
npm install @supabase/supabase-js tailwindcss autoprefixer postcss react-toastify
```

4. **Configura las variables de entorno**

Crea un archivo `.env.local` en la raíz del proyecto:

```env
VITE_SUPABASE_URL=https://nupdkgpfgzbhllfsqjgz.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_z3T6HpNAFARnOYxz_juiFw_upv0FNWo
```

5. **Inicia el servidor de desarrollo**
prueba
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 🗄️ Estructura de la Base de Datos

La tabla `tareas` en Supabase con los siguientes campos:

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | BIGINT (PK) | ID único, generado automáticamente |
| titulo | VARCHAR(150) | Título de la tarea (requerido) |
| descripcion | TEXT | Descripción detallada |
| responsable | VARCHAR(100) | Persona responsable |
| prioridad | VARCHAR(20) | Baja, Media, Alta (por defecto: Media) |
| estado | VARCHAR(20) | Pendiente, En proceso, Terminada, Vencida |
| categoria | VARCHAR(100) | Categoría de la tarea |
| porcentaje_avance | INTEGER | 0-100 (por defecto: 0) |
| fecha_creacion | TIMESTAMP | Fecha de creación (automática) |
| fecha_limite | DATE | Fecha límite (requerida) |
| fecha_finalizacion | DATE | Fecha de finalización |
| observaciones | TEXT | Notas adicionales |

## 📁 Estructura del Proyecto

```
src/
├── components/           # Componentes React
│   ├── Dashboard.tsx      # Componente principal
│   ├── TaskModal.tsx      # Modal para crear/editar
│   ├── FilterBar.tsx      # Barra de filtros
│   ├── TaskRow.tsx        # Fila de tarea en tabla
│   ├── StatCard.tsx       # Tarjeta de estadísticas
│   ├── Badge.tsx          # Badge para estados
│   └── index.ts           # Exportaciones
├── services/            # Servicios de API
│   ├── supabase.ts       # Configuración de Supabase
│   ├── taskService.ts    # Servicios de tareas
│   └── index.ts          # Exportaciones
├── hooks/               # Hooks personalizados
│   ├── useTasks.ts       # Hook para gestionar tareas
│   └── index.ts          # Exportaciones
├── types/               # Tipos TypeScript
│   ├── task.ts           # Tipos de tarea
│   └── index.ts          # Exportaciones
├── utils/               # Utilidades
│   ├── taskHelpers.ts    # Funciones auxiliares
│   └── index.ts          # Exportaciones
├── App.tsx              # Componente principal
├── main.tsx             # Punto de entrada
└── index.css            # Estilos globales
```

## 🎨 Componentes Principales

### Dashboard
Componente principal que contiene:
- Estadísticas en tarjetas
- Barra de filtros
- Tabla de tareas
- Modal para crear/editar

### TaskModal
Modal elegante para:
- Crear nuevas tareas
- Editar tareas existentes
- Validación de campos

### FilterBar
Barra de filtros con:
- Búsqueda por título
- Filtro por estado
- Filtro por prioridad
- Filtro por responsable

### TaskRow
Fila de tabla que muestra:
- Información de la tarea
- Barra de progreso visual
- Botones de editar y eliminar

## 🔌 Servicios

### taskService
Funciones principales:
- `getAllTasks()` - Obtener todas las tareas
- `getFilteredTasks(filters)` - Obtener tareas filtradas
- `createTask(task)` - Crear nueva tarea
- `updateTask(id, updates)` - Actualizar tarea
- `deleteTask(id)` - Eliminar tarea
- `getTasksByResponsible()` - Obtener responsables únicos

## 🎯 Hooks

### useTasks
Hook personalizado que gestiona:
- Estado de las tareas
- Carga de datos
- Filtros
- Operaciones CRUD
- Notificaciones

## 🛡️ Validaciones

- Título: Requerido (máximo 150 caracteres)
- Fecha Límite: Requerida
- Porcentaje: 0-100
- Prioridad: Baja, Media, Alta
- Estado: Pendiente, En proceso, Terminada, Vencida

## 📡 Variables de Entorno

```env
VITE_SUPABASE_URL=tu_url_supabase
VITE_SUPABASE_ANON_KEY=tu_anon_key_supabase
```

## 🚀 Despliegue

### Vercel
1. Conecta tu repositorio a Vercel
2. Agrega las variables de entorno
3. Deploy automático

### Netlify
```bash
npm run build
# Sube la carpeta 'dist' a Netlify
```

## 📝 Scripts Disponibles

- `npm run dev` - Inicia servidor de desarrollo
- `npm run build` - Construye para producción
- `npm run preview` - Vista previa de build
- `npm run lint` - Ejecuta linter

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para cambios importantes:

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/mejora`)
3. Commit tus cambios (`git commit -am 'Agrega mejora'`)
4. Push a la rama (`git push origin feature/mejora`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 💬 Soporte

Para soporte o preguntas, abre un issue en el repositorio.

## 🎉 Créditos

Desarrollado con ❤️ para facilitar la gestión de tareas.

---

**Última actualización:** Junio 2024
**Versión:** 1.0.0
