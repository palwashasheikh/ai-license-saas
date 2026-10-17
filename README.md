# AI License Management SaaS

A full-stack license management application built with **Next.js, NestJS, PostgreSQL, and Prisma**. The project is being developed as a foundation for an AI-powered SaaS platform.

## Features

- View software licenses in a dashboard
- Retrieve license data from a REST API
- Create, update, and delete licenses through the API
- Store license information in PostgreSQL
- Manage database access using Prisma ORM
- Display license information and summary statistics in the frontend

## Technology Stack

| Technology | Purpose |
|---|---|
| Next.js | Frontend dashboard |
| React | User interface |
| TypeScript | Type-safe development |
| NestJS | Backend REST API |
| PostgreSQL | Relational database |
| Prisma ORM | Database access and migrations |
| Docker | Local development infrastructure |
| Git and GitHub | Version control |

## Project Structure

```text
ai-license-saas/
├── apps/
│   ├── web/              # Next.js frontend
│   └── api/              # NestJS backend
│       ├── prisma/       # Prisma schema and migrations
│       └── src/
│           ├── licenses/ # License management
│           └── prisma/   # Database service
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites

Install the following tools:

- Node.js
- pnpm
- Docker Desktop
- Git

You also need a PostgreSQL database.

### 1. Clone the repository

```bash
git clone https://github.com/palwashasheikh/ai-license-saas.git
cd ai-license-saas
```

### 2. Configure the backend

```bash
cd apps/api
pnpm install
```

Create an `.env` file inside `apps/api` and configure your local database connection:

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/license_saas?schema=public"
```

Replace `USER` and `PASSWORD` with your local PostgreSQL credentials.

Generate the Prisma client:

```bash
pnpm exec prisma generate
```

Ensure PostgreSQL is running and the database and schema are ready before starting the API.

Start the backend:

```bash
pnpm run start:dev
```

The API is configured to run at:

`http://localhost:3003`

### 3. Configure the frontend

Open a separate terminal:

```bash
cd apps/web
pnpm install
pnpm run dev
```

Open the dashboard:

`http://localhost:3000`

The frontend expects the backend API to be available at `http://localhost:3003`.

## License API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/licenses` | Create a license |
| GET | `/licenses` | List licenses |
| GET | `/licenses/:id` | Retrieve a license |
| PATCH | `/licenses/:id` | Update a license |
| DELETE | `/licenses/:id` | Delete a license |

## Development Roadmap

- [ ] User authentication and JWT
- [ ] Role-based access control
- [ ] License expiration notifications
- [ ] Advanced search and filtering
- [ ] AI-powered license insights
- [ ] Natural-language license search
- [ ] Production deployment

## Security

- Never commit `.env` files, passwords, API keys, or other secrets.
- Configure production credentials using environment variables or a secrets manager.
- Add authentication and authorization before exposing protected license data publicly.

## Repository

GitHub: https://github.com/palwashasheikh/ai-license-saas

## Status

**In active development.** The frontend dashboard, backend API, and database integration are working. Additional security and AI capabilities are planned.
