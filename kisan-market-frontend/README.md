# Kisan Market Frontend

React 19 + Vite frontend for the Kisan Market farmer-to-customer marketplace.

## Tech Stack

- React 19, React Router 7, Axios
- Vite 8
- ESLint (react-hooks, react-refresh)

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Configure the API base URL (optional; defaults to `http://localhost:8081/api`):

   ```bash
   cp .env.example .env
   ```

3. Run the dev server:

   ```bash
   npm run dev
   ```

   App runs at `http://localhost:5173`.

## Scripts

| Command            | Description                      |
| ------------------ | -------------------------------- |
| `npm run dev`      | Start Vite dev server            |
| `npm run build`    | Production build to `dist/`      |
| `npm run lint`     | Run ESLint                       |
| `npm run preview`  | Preview the production build     |

## Structure

- `src/services/api.js` — shared Axios instance (base URL, JWT header, 401 redirect)
- `src/services/*` — API service wrappers
- `src/utils/auth.js` — auth helpers (`getUser`, `getToken`, `setAuth`, ...)
- `src/components/ProtectedRoute.jsx` — role-based route guard
- `src/pages/` — public, farmer, customer, and admin pages

## Auth Flow

- Login/register store `{ token, user }` in `localStorage` under the key `auth`.
- The Axios interceptor attaches `Authorization: Bearer <token>` automatically.
- On a 401 response the session is cleared and the user is redirected to `/`.

## Default Admin

`admin@kisan.com` / `admin123` (seeded by the backend on first run).
