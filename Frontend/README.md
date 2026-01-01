# SubTrack Frontend

A modern React frontend for the SubTrack application, designed to help users track and manage their recurring subscriptions. This project is built using [Vite](https://vitejs.dev/) with TypeScript.

## Features

- **Dashboard View**: Displays a comprehensive table of all active subscriptions.
- **Inline Editing**: Update subscription details (Name, Cost, Billing Cycle) directly within the list row without navigating away.
- **Quick Add**: Rapidly create new subscriptions using the integrated form row at the bottom of the table.
- **Input Validation**: Prevents submission of invalid data (e.g., empty names or negative costs).
- **Smart Renewal Display**: Automatically formats and displays the next renewal date based on the backend calculation.
- **Real-time Data**: Fetches and syncs data directly with the SubTrack ASP.NET Core Web API.

## Tech Stack

- **Framework**: React 19
- **Language**: TypeScript
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS
- **Containerization**: Docker (Nginx)

## Prerequisites

- **Node.js**: Ensure you have Node.js installed for local development.
- **SubTrack API**: The backend API must be running for data to load.
  - By default, the client expects the API to be available at `http://localhost:5123`.

## 🐳 Running via Docker (Recommended)

To run the entire stack (Frontend + Backend), use Docker Compose from the root directory:

```bash
cd ..
docker compose up --build
```

Access the frontend at: `http://localhost:5173`

## 🔧 Local Development (Manual)

1.  **Navigate to the frontend directory:**

    ```bash
    cd Frontend
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Run the development server:**

    ```bash
    npm run dev
    ```

4.  **Open in Browser:**
    The application will typically start at `http://localhost:5173`.

## Project Structure

- **`src/App.tsx`**: Main component that handles fetching data, the "Quick Add" logic, and global state.
- **`src/components/Subscription.tsx`**: Component for individual rows, handling "Inline Editing" state and UI.
- **`src/main.tsx`**: Application entry point.
- **`Dockerfile`**: Multi-stage build configuration (Node build -> Nginx serve).
- **`nginx.conf`**: Nginx configuration for serving the React app and handling routing.

## Configuration

The API endpoint can be configured via environment variables or falls back to a default.

1.  **Environment Variable (Docker):**
    The `Dockerfile` accepts a build argument `VITE_API_URL`. In `docker-compose.yml`, this is set to:
    ```yaml
    args:
      - VITE_API_URL=http://localhost:5123/subs
    ```

2.  **Local Development:**
    Create a `.env` file in the `Frontend` directory to override the default if your API runs on a different port:
    ```env
    VITE_API_URL=http://your-api-url:port/subs
    ```

3.  **Default Fallback:**
    If no environment variable is set, the application defaults to `http://localhost:5123/subs` as defined in `src/App.tsx`.

## Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Compiles the TypeScript code and builds the app for production.
- `npm run preview`: Locally preview the production build.
- `npm run lint`: Runs ESLint to check for code quality issues.