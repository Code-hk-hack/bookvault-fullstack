# 📚 BookVault Codebase Documentation

This document provides a comprehensive overview of the **BookVault** codebase, detailing the purpose and function of the various files and directories in the full-stack repository.

## 🗂️ Project Structure Overview

The project is structured as a full-stack application with two main directories: `client` for the React frontend and `server` for the Node.js/Express backend.

---

## 🎨 Client (`/client`)
The frontend is built using **React**, **Vite**, and **Tailwind CSS**, focusing heavily on a dark fantasy immersive UI.

### `/client/src/`
- **`App.tsx`**: The main React component that handles client-side routing using `react-router-dom`. It maps routes like `/` to the Landing page, `/login` to the Login page, and includes a placeholder for a `/dashboard` page.
- **`main.tsx`**: The entry point for the React application that mounts the `App` component to the DOM.
- **`index.css` & `App.css`**: Contain global Tailwind directives and custom utility styles for the application's unique visual theme.

### `/client/src/pages/`
- **`Landing.tsx`**: The main hero interface. It features complex CSS animations (ethereal floating, glowing cores, and a floating ember particle system) to create an immersive dark fantasy aesthetic. It also fetches book data from the backend to display in the vault grid.
- **`Login.tsx`**: The authentication page component handling user sign-in.

---

## ⚙️ Server (`/server`)
The backend is a **Node.js** and **Express** API using **Prisma** as the ORM to interact with a PostgreSQL database.

### `/server/src/`
- **`app.ts`**: The core Express application file. It sets up middleware (CORS, JSON parsing) and currently houses initial API routes, including authentication endpoints (`/api/auth/signup`, `/api/auth/login`) utilizing `bcryptjs` and `jsonwebtoken`, as well as a placeholder route for fetching books (`/api/books`).
- **`prisma.ts`**: A utility file that initializes and exports the Prisma Client instance.

### `/server/src/controllers/`
- **`userController.ts`**: Logic for managing users.
- **`bookController.ts`**: Logic for book retrieval and management operations.
- **`collectionController.ts`**: Logic for handling user book collections/vaults.

### `/server/src/routes/`
- **`userRoutes.ts`**, **`bookRoutes.ts`**, **`collectionRoutes.ts`**: Express router files that map API endpoints to their respective controllers. (Presently, the `app.ts` contains some directly implemented routes, and these dedicated route files are designed for better modularity as the app grows).

### `/server/prisma/`
- **`schema.prisma`**: The Prisma ORM configuration file. It defines the PostgreSQL data source and the database models:
  - `User`: Handles authentication with `id`, `email`, `password`, and `role`.
  - `Book`: Represents library entries with `id`, `title`, `author`, `coverImage`, and `genre`.
- **`seed.ts`**: A script used to populate the database with initial dark fantasy book data for testing and development.

---

## 📄 Root Files
- **`README.md`**: Outlines the project overview, target users, technology stack, and development roadmap.
- **`AI_PROMPT_LOG.md`**: A historical record of AI prompts used during the development of BookVault.
