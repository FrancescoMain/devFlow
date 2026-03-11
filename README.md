# devFlow

Dashboard frontend built with React 19, TypeScript, Vite and Tailwind CSS v4.

## Setup

```bash
# Install dependencies
npm install

# Initialize MSW service worker
npx msw init public/ --save

# Start dev server on localhost:3000
npm run dev

# Build for production
npm run build
```

## Architecture

```
src/
├── components/
│   ├── layout/          # Layout system (compound components)
│   │   ├── Layout.tsx   # Root layout with context provider
│   │   ├── Header.tsx   # Sticky header with dark mode toggle
│   │   ├── Sidebar.tsx  # Collapsible sidebar navigation
│   │   ├── Content.tsx  # Main content area
│   │   ├── Footer.tsx   # Footer bar
│   │   └── DefaultLayout.tsx  # Pre-composed layout with toggle props
│   └── ui/              # Base UI components (Button, Input, Badge)
├── features/
│   └── auth/            # Auth context with split state/dispatch
├── hooks/
│   ├── Auth/            # useAuthState, useAuthDispatch
│   └── Layout/          # useLayout
├── lib/                 # Utilities (cn, fetchApi, useContextSafe)
├── mocks/               # MSW handlers and browser setup
├── pages/               # Route pages (Login, NotFound)
└── types/               # Shared TypeScript types
    ├── Api/             # API response types (LoginResponse, ErrorResponse)
    ├── Auth/            # Auth types (User, AuthState, AuthAction)
    └── Layout/          # Layout types (LayoutContextType)
```

## Key patterns

### Auth context split
`AuthStateContext` and `AuthDispatchContext` are separate contexts. Components that only dispatch actions (e.g. logout button) never re-render on state changes.

### Discriminated union actions
`AuthAction` is a union type with exhaustive switch — adding a new action without handling it causes a compile error.

### Compound components
`Layout` exposes `Layout.Header`, `Layout.Sidebar`, `Layout.Content`, `Layout.Footer` as sub-components sharing state via context. `DefaultLayout` provides a pre-composed version with `showHeader`, `showSidebar`, `showFooter` toggle props.

### CVA + forwardRef
UI components use `class-variance-authority` for variant management and `forwardRef` for ref forwarding. `Input` uses `useImperativeHandle` to expose a typed `InputHandle` API (focus, clear, getValue).

### Mock API (MSW v2)
Mock handlers in `src/mocks/` intercept fetch requests in development. In production, MSW is never loaded — the same fetch calls hit the real API. Response types in `src/types/Api/` are shared between mocks and frontend.

### Token in memory
Auth token lives in React state (not localStorage). It is lost on page refresh by design.

### Route-based code splitting
Every page is lazy-loaded with `React.lazy()` + `Suspense`, producing separate JS chunks visible in the Network tab.

### Generic API client
`fetchApi<T>(url, options)` provides typed fetch with centralized error handling.

## Tech stack

- React 19 + TypeScript 5.9 (strict mode)
- Vite 7 + vite-tsconfig-paths
- Tailwind CSS v4 (with `@custom-variant dark` class strategy)
- React Router v6 (with lazy routes and protected routes)
- MSW v2 (mock API)
- CVA + clsx + tailwind-merge (component variants)

## Mock credentials

```
Email: test@test.com
Password: password
```