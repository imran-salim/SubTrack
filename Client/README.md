# SubTrack Client

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
- **Styling**: CSS Modules / Standard CSS

## Prerequisites

- **Node.js**: Ensure you have Node.js installed.
- **SubTrack API**: The backend API must be running for data to load.
  - By default, the client expects the API to be available at `http://localhost:5123`.

## Getting Started

1.  **Navigate to the client directory:**

    ```bash
    cd ~/SubTrack/Client
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

## Configuration

The API endpoint can be configured via environment variables or falls back to a default.

1.  **Environment Variable (Recommended):**
    Create a `.env` file in the `Client` directory and set `VITE_API_URL`:

    ```env
    VITE_API_URL=http://your-api-url:port/subs
    ```

2.  **Default Fallback:**
    If no environment variable is set, the application defaults to `http://localhost:5123/subs` as defined in `src/App.tsx`.

## Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Compiles the TypeScript code and builds the app for production.
- `npm run preview`: Locally preview the production build.
- `npm run lint`: Runs ESLint to check for code quality issues.
