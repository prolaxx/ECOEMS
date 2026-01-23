This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Base de datos (MongoDB Atlas)

Este proyecto usa MongoDB Atlas para persistencia de datos.

### Configuración

Crea un archivo `.env.local` en la raíz del proyecto con:

```bash
MONGODB_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net/nombre-db?retryWrites=true&w=majority
```

Puedes copiar `.env.example` como punto de partida.

### Scripts disponibles

#### Verificación y mantenimiento:
- `npm run check:db` - Verifica la conexión a MongoDB Atlas y ejecuta ping
- `npm run db:init` - Inicializa la base de datos (colecciones e índices)

#### Administración de usuarios:
- `npm run admin list` - Lista todos los usuarios
- `npm run admin:list` - Alias de list
- `npm run admin:stats` - Muestra estadísticas de la base de datos
- `npm run admin create <email> [name]` - Crea un nuevo usuario
- `npm run admin find <email>` - Busca un usuario por email
- `npm run admin delete <email>` - Elimina un usuario y sus datos
- `npm run admin admin <email>` - Marca un usuario como administrador

### Colecciones

El proyecto utiliza las siguientes colecciones en MongoDB:

- **users**: Usuarios registrados con email y metadata
  - Índices: `email` (unique), `id` (unique)
- **diagnostics**: Resultados de exámenes diagnósticos por usuario
  - Un registro por usuario y modo de examen (índice compuesto único)
  - Incluye `attempt` (intento completo) y `results` (resultados calculados)
  - Índices: `userId + mode` (unique compound), `attemptId`, `updatedAt`
- **sessions**: Sesiones de usuario (para uso futuro)
  - Índices: `token` (unique), `expiresAt` (TTL)

### Usuario Admin

Para crear un usuario administrador:

```bash
npm run admin create admin@tudominio.com "Admin Name"
npm run admin admin admin@tudominio.com
```

### Health Check

Para verificar el estado del sistema:

```
GET /api/health
```

### Inicialización

Antes del primer uso, ejecuta:

```bash
# 1. Crear colecciones e índices
npm run db:init

# 2. Crear usuario admin
npm run admin create admin@ecoems.com "Administrador"
npm run admin admin admin@ecoems.com
```

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
