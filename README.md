# SubTrack

SubTrack is a full-stack subscription tracking application designed to help users manage their recurring expenses efficiently. It consists of a high-performance **ASP.NET Core Web API** backend and a modern **React (TypeScript)** frontend.

## Features

### Backend (API)
* **Subscription Management**: Create, view, update, and delete subscriptions.
* **Flexible Billing Cycles**: Supports Weekly, Monthly, and Yearly billing cycles.
* **Automatic Renewal**: Automatically calculates next renewal dates based on billing cycles.
* **Persistent Storage**: Uses SQLite with Entity Framework Core.
* **OpenAPI Integration**: Includes Swagger UI for interactive API documentation.

### Frontend (Client)
* **Dashboard View**: Displays a comprehensive table of all active subscriptions.
* **Visual Feedback**: View names, costs, renewal dates, and billing cycles in a clean user interface.
* **Modern Stack**: Built with React 19, TypeScript, and Vite for fast development and hot module replacement (HMR).

## Technologies

### Server
* **Framework**: .NET 10.0 (ASP.NET Core Minimal APIs)
* **Database**: SQLite (`Microsoft.EntityFrameworkCore.Sqlite`)
* **ORM**: Entity Framework Core
* **Documentation**: NSwag

### Client
* **Framework**: React 19
* **Language**: TypeScript
* **Build Tool**: Vite
* **Styling**: CSS Modules / Standard CSS

## Getting Started

### Prerequisites
* [.NET 10.0 SDK](https://dotnet.microsoft.com/download) or later
* [Node.js](https://nodejs.org/) (version 18+ recommended)

#### Linux
On Arch Linux derivatives (Manjaro, endeavourOS, SteamOS), you will need to install .NET, along with the ASP.NET runtime and the Entity Framework tools. Install these with:
```bash
sudo pacman -S dotnet-sdk aspnet-targeting-pack aspnet-runtime
dotnet tool install dotnet-ef
```

### Installation & Running

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/imran-salim/subtrack.git](https://github.com/imran-salim/subtrack.git)
    cd subtrack/
    ```

2.  **Backend Setup**
    The backend must be running for the client to fetch data.
    
    * **Restore dependencies and setup database:**
        ```bash
        dotnet restore
        dotnet ef database update
        ```
    * **Run the API:**
        ```bash
        dotnet run
        ```
    * The API will start at `http://localhost:5123`.

3.  **Client Setup**
    Open a new terminal window and navigate to the `Client` directory.

    * **Install dependencies:**
        ```bash
        cd Client
        npm install
        ```
    * **Run the development server:**
        ```bash
        npm run dev
        ```
    * The application will be available at `http://localhost:5173`.

## Configuration

* **Database**: The backend uses a local SQLite file named `SubTrack.db`. The connection string is defined in `appsettings.json`.
* **CORS**: The backend is configured to allow requests specifically from `http://localhost:5173` (the default Vite port).
* **API Connection**: The React client is currently hardcoded to fetch data from `http://localhost:5123/subs` (see `Client/src/App.tsx`).

## API Endpoints

| Method | Endpoint       | Description                                                 |
| :----- | :------------- | :---------------------------------------------------------- |
| `GET`  | `/`            | Returns the API name ("SubTrack API").                      |
| `GET`  | `/subs`        | Retrieves a list of all subscriptions.                      |
| `POST` | `/subs`        | Creates a new subscription.                                 |
| `PUT`  | `/subs/{id}`   | Updates a subscription by its ID.                           |
| `DELETE`| `/subs/{id}`  | Deletes a subscription by its ID.                           |

### Example Subscription Object

```json
{
  "name": "Netflix",
  "cost": 15.99,
  "cycle": 1
}
```

* `cycle` values: `0` (Weekly), `1` (Monthly), `2` (Yearly).

### License
This project is licensed under the MIT License - see the LICENSE file for details.
