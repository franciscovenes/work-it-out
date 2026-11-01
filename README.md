# Work it out!

# Work it out!

**Work it out!** is a simple workout application for managing and following exercise routines. I created it to replace the spreadsheet-based structure used in my fitness academy. It provides a straightforward interface for working through a sequence of exercises, with configurable sets, repetitions and weights.

## Version

**v1.0 — Initial release**

Future versions will be published as separate [GitHub Releases](https://github.com/franciscovenes/work-it-out/releases).

## Features

- Organise exercises into workout routines. <!-- There is no create routine route. This versio still requires direct JSON file edition. This incldes set and reps-->
- Define the number of sets and repetition ranges.
- Set and adjust exercise weights <!-- User can adjust weights and persist them, but not set the initial value -->.
- Navigate through a workout sequence.
- Persist routine data through a dedicated API.

## Tech stack

| Area               | Technologies                |
| ------------------ | --------------------------- |
| Frontend           | HTML, CSS, JavaScript, Vite |
| Backend            | Node.js native HTTP server  |
| Data persistence   | JSON file                   |
| Package management | pnpm                        |
| Version control    | Git and GitHub              |

## Architecture

The application is divided into two independent components:

- **Client:** A frontend application built with Vite, responsible for the user interface and interaction. <!-- JavaScript is more important than Vite and not mentioned -->
- **Server:** A lightweight Node.js API responsible for handling requests and persisting application data.

This separation allows the frontend and backend to be developed and deployed independently.

## Deployment

The application uses separate deployment environments for the frontend and backend.

### Frontend

The frontend is hosted on **Netlify**, with a custom domain. Changes to the client can be deployed independently of the API.

### Backend

The API runs on a Debian VPS, behind an Nginx reverse proxy, with HTTPS configured through Let's Encrypt.

The Node.js application runs as a systemd service and listens on a local interface. Nginx handles incoming HTTPS requests and forwards API traffic to the application.

### Continuous deployment

API deployment is automated through **GitHub Actions** and SSH.

When changes are pushed to the `main` branch:

1. GitHub Actions starts a deployment workflow.
2. The workflow establishes an SSH connection to the VPS using a dedicated deployment key.
3. It invokes a deployment script on the server.
4. The script fetches the latest repository changes and updates the server checkout.
5. It detects whether the `server/` directory has changed.
6. If server changes are detected, production dependencies are installed, the systemd service is restarted, and an API health check is performed.

Frontend-only changes update the repository checkout but do not trigger an unnecessary API restart.

The deployment process uses a dedicated, restricted deployment account and keeps application data and environment configuration outside the Git repository.

## Project structure

```text
.
├── .github/
│   └── workflows/       # GitHub Actions workflows
├── client/              # Frontend application
└── server/              # Backend API
```

## Getting started

### Requirements

- Node.js
- pnpm

### Frontend

```bash
cd client
pnpm install
pnpm dev
```

Vite starts the development server and provides a local URL in the terminal.

### Backend

In a separate terminal:

```bash
cd server
pnpm install
pnpm start
```

The API starts using the server configuration.

## Releases

This repository uses GitHub Releases to keep track of application versions. Each release represents a specific version of the application, starting with **v1.0**.

See the [GitHub Releases page](https://github.com/franciscovenes/work-it-out/releases) for available versions.
