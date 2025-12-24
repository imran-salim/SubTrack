# SubTrack

SubTrack is a simple and efficient ASP.NET Core Web API designed to help users track their recurring subscriptions. It allows you to manage subscription details, costs, and renewal cycles using a lightweight SQLite database.

## Features

* **Subscription Management**: Create, view, and delete subscriptions.
* **Flexible Billing Cycles**: Supports Weekly, Monthly, and Yearly billing cycles.
* **Automatic Renewal Calculation**: Automatically calculates the next renewal date based on the selected cycle when a subscription is added.
* **RESTful API**: Built with ASP.NET Core Minimal APIs for high performance and low overhead.
* **OpenAPI Support**: Integrated NSwag for interactive API documentation (Swagger UI).
* **Database**: Uses Entity Framework Core with SQLite for persistent storage.

## Technologies

* **Framework**: .NET 10.0
* **Database**: SQLite (via `Microsoft.EntityFrameworkCore.Sqlite`)
* **Documentation**: NSwag (`NSwag.AspNetCore`)
* **ORM**: Entity Framework Core

## Getting Started

### Prerequisites

* .NET 10.0 SDK or later

### Installation

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/imran-salim/subtrack.git](https://github.com/imran-salim/subtrack.git)
    cd subtrack
    ```

2.  **Configuration**
    The application uses `appsettings.json` for configuration. The default connection string points to a local SQLite database file named `SubTrack.db`.
    ```json
    "ConnectionStrings": {
      "DefaultConnections": "Data Source=SubTrack.db"
    }
    ```

3.  **Database Setup**
    The project includes an existing SQLite database file (`SubTrack.db`), but you can apply migrations to ensure the schema is up to date if you start fresh.
    ```bash
    dotnet ef database update
    ```

4.  **Run the Application**
    ```bash
    dotnet run
    ```
    The API will be available at `http://localhost:5123` or `https://localhost:7197` by default.

## API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/` | Returns the API name ("SubTrack API"). |
| `GET` | `/subs` | Retrieves a list of all subscriptions. |
| `POST` | `/subs` | Creates a new subscription. Requires a JSON body (see below). |
| `DELETE`| `/subs/{id}` | Deletes a subscription by its ID. |

### Example Request (POST /subs)

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
