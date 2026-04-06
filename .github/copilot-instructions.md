# Medicine Tracker — Repository Instructions

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Build**: Vite with HMR
- **Styling**: Tailwind CSS
- **Storage**: Browser localStorage

## Common Commands

- `npm install` - Install dependencies
- `npm run dev` - Start dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Code Standards

- Use TypeScript strict mode - no `any` types
- Components: Functional components with hooks (no class components)
- Types: Define in `src/types/` directory
- Storage: Use `src/utils/storage.ts` for all localStorage operations
- Styling: Tailwind utility classes (avoid custom CSS unless necessary)