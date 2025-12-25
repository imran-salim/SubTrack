# SubTrack Client

A modern React frontend for the SubTrack application, designed to help users track and manage their recurring subscriptions. This project is built using [Vite](https://vitejs.dev/) with TypeScript.

## Features

* **Dashboard View**: Displays a comprehensive table of all active subscriptions.
* **Subscription Details**: Shows key information including Name, Cost, Billing Cycle, and calculated Renewal Date.
* **Management UI**: Interface elements for editing and deleting subscriptions.
* **Real-time Data**: Fetches data directly from the SubTrack ASP.NET Core Web API.

## Tech Stack

* **Framework**: React 19
* **Language**: TypeScript
* **Build Tool**: Vite 7
* **Styling**: CSS Modules / Standard CSS

## Prerequisites

* **Node.js**: Ensure you have Node.js installed.
* **SubTrack API**: The backend API must be running for data to load.
    * By default, the client expects the API to be available at `http://localhost:5123`.

## Getting Started

1.  **Navigate to the client directory:**
    ```bash
    cd imran-salim/subtrack/SubTrack-client/Client
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

* **`src/App.tsx`**: Main component that handles fetching subscription data.
* **`src/components/Subscription.tsx`**: Reusable component for rendering individual subscription rows.
* **`src/main.tsx`**: Application entry point.

## Configuration

The API endpoint is currently configured in `src/App.tsx`. If your backend runs on a different port, update the `fetch` URL accordingly:

```typescript
// src/App.tsx
fetch('http://localhost:5123/subs')
```

## Scripts
* `npm run dev`: Starts the development server.
* `npm run build`: Compiles the TypeScript code and builds the app for production.
* `npm run preview`: Locally preview the production build.
* `npm run lint`: Runs ESLint to check for code quality issues.
