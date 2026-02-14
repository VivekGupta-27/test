# WorkDNA - Workload Management & Burnout Prevention

WorkDNA is a clean, neutral, and trust-focused web application designed to help users manage their daily workload and prevent burnout. It prioritizes clarity and insight-driven explanations over raw numerical density.

## Tools and Technologies

### Frontend
- **React**: Core UI framework for building a modular, component-based interface.
- **TypeScript**: Ensures type safety and improves developer productivity.
- **Tailwind CSS**: Used for rapid, utility-first styling with a custom theme aligned with the project's visual style.
- **Wouter**: A lightweight routing library for single-page application navigation.
- **TanStack Query (React Query)**: Handles data fetching, caching, and synchronization with the backend.
- **Recharts**: Provides accessible and beautiful data visualizations for workload trends and effort distribution.
- **Lucide React**: A library of clean, consistent icons for visual cues.
- **Shadcn UI**: A collection of re-usable components (buttons, cards, inputs, etc.) styled with Tailwind.

### Backend
- **Node.js & Express**: Simple and robust server framework for handling API requests.
- **PostgreSQL**: Relational database for persistent storage of tasks, insights, and user stats.
- **Drizzle ORM**: A type-safe TypeScript ORM for interacting with the database.
- **Zod**: Used for schema validation on both the frontend and backend to ensure data integrity.

## How They Are Used

1.  **Shared Schema**: `shared/schema.ts` defines the database tables and Zod schemas, which are imported by both the backend (for storage) and frontend (for types and validation).
2.  **API Routes**: `server/routes.ts` implements the RESTful API using the schemas defined in `shared/routes.ts`, ensuring a consistent contract between client and server.
3.  **Storage Layer**: `server/storage.ts` abstracts the database operations, allowing for easy data manipulation and seeding.
4.  **Frontend Generation**: The UI is built using modular components that consume the API via React Query hooks.

## How to Run This Project Locally

### Prerequisites
- **Node.js** (v20 or higher recommended)
- **npm**
- **PostgreSQL** instance

### Setup

1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd workdna
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**:
    Create a `.env` file in the root directory and add your database connection string:
    ```env
    DATABASE_URL=postgresql://username:password@localhost:5432/workdna
    ```

4.  **Push Database Schema**:
    Sync your database with the Drizzle schema:
    ```bash
    npm run db:push
    ```

5.  **Start the Application**:
    Run the development server (starts both backend and frontend):
    ```bash
    npm run dev
    ```

6.  **Access the App**:
    Open your browser and navigate to `http://localhost:5000`.

## Features
- **Dashboard**: Overview of today's workload, burnout risk, and key insights.
- **Task Management**: Add and track tasks with effort scores and durations.
- **Insights**: Weekly trends and effort distribution charts.
- **History**: Calendar-based view of past productivity.
- **Settings**: Manage profile and application preferences.
