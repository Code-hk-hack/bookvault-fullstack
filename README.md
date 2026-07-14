# 📚 BookVault — Sanctuary for Forgotten Tales

> A dark fantasy digital sanctuary cataloguing over 12,000 forbidden tomes, arcane lore, and untold epics.

## 🌌 Project Overview
**BookVault** is an interactive web platform designed for fantasy enthusiasts, readers, and lore archivists. It provides an immersive, atmospheric interface to explore, search, and manage a vast catalog of dark fantasy literature.

---

## 🎯 Problem Statement
Standard book platforms (like Goodreads) use bright, commercial layouts that ruin the thematic immersion for dark fantasy, sci-fi, and tabletop roleplaying game (TTRPG) communities. BookVault solves this by offering an immersive, gaming-grade UI featuring reactive animations, atmospheric soundscapes, and structured lore exploration.

## 👥 Target Users
* **Dark Fantasy & Sci-Fi Readers** looking for curated sub-genres.
* **TTRPG Players & Game Masters** seeking worldbuilding lore and inspiration.
* **Collectors of Limited-Edition & Arcane Books.**

---

## 🛠️ Technology Stack
* **Frontend:** React.js, Tailwind CSS
* **Backend:** Node.js, Express.js
* **Database:** PostgreSQL (Neon Serverless), Prisma ORM
* **Authentication:** JSON Web Tokens (JWT)
* **Animations:** Framer Motion
* **Version Control:** Git & GitHub

---

## 🗺️ Development Roadmap & Tasks

### Phase 1: Foundation & Hero Interface (Completed ✅)
- [x] React & Tailwind CSS Setup
- [x] Atmospheric Hero Section with Layered Anime Aesthetics
- [x] Interactive Framer Motion Animated Navbar
- [x] Responsive Layout & Radial Gradient Effects

### Phase 2: Core Library Features (Completed ✅)
- [x] Interactive Book Grid & Filtering System
- [x] Lore Reader Modal Component
- [x] User Vault / Saved Bookshelf State

### Phase 3: Authentication & Backend (Completed ✅)
- [x] User Authentication (JWT)
- [x] Backend CRUD API & Database Integration
- [x] Personal Arcane Reading Stats Dashboard

---

## 📁 Folder Structure
```text
client/
├── public/
└── src/
    ├── assets/          # Custom anime character renders & logo
    ├── components/      # Reusable React UI components (Hero, Navbar)
    ├── App.js           # Main Application Layout
    └── index.css        # Global Tailwind & Custom Glow Utility Styles
# 📚 BookVault — Sanctuary for Forgotten Tales

> A dark fantasy digital sanctuary cataloguing over 12,000 forbidden tomes, arcane lore, and untold epics.

## 🌌 Project Overview
**BookVault** is an interactive web platform designed for fantasy enthusiasts, readers, and lore archivists. It provides an immersive, atmospheric interface to explore, search, and manage a vast catalog of dark fantasy literature.

---

## 🎯 Problem Statement
Standard book platforms (like Goodreads) use bright, commercial layouts that ruin the thematic immersion for dark fantasy, sci-fi, and tabletop roleplaying game (TTRPG) communities. BookVault solves this by offering an immersive, gaming-grade UI featuring reactive animations, atmospheric soundscapes, and structured lore exploration.

## 👥 Target Users
* **Dark Fantasy & Sci-Fi Readers** looking for curated sub-genres.
* **TTRPG Players & Game Masters** seeking worldbuilding lore and inspiration.
* **Collectors of Limited-Edition & Arcane Books.**

---

## 🛠️ Technology Stack
* **Frontend:** React.js, Tailwind CSS
* **Backend:** Node.js, Express.js
* **Database:** PostgreSQL (Neon Serverless), Prisma ORM
* **Authentication:** JSON Web Tokens (JWT)
* **Animations:** Framer Motion
* **Version Control:** Git & GitHub

---

## 🗺️ Development Roadmap & Tasks

### Phase 1: Foundation & Hero Interface (Completed ✅)
- [x] React & Tailwind CSS Setup
- [x] Atmospheric Hero Section with Layered Anime Aesthetics
- [x] Interactive Framer Motion Animated Navbar
- [x] Responsive Layout & Radial Gradient Effects

### Phase 2: Core Library Features (Completed ✅)
- [x] Interactive Book Grid & Filtering System
- [x] Lore Reader Modal Component
- [x] User Vault / Saved Bookshelf State

### Phase 3: Authentication & Backend (Completed ✅)
- [x] User Authentication (JWT)
- [x] Backend CRUD API & Database Integration
- [x] Personal Arcane Reading Stats Dashboard

---

## 📁 Folder Structure
```text
client/
├── public/
└── src/
    ├── assets/          # Custom anime character renders & logo
    ├── components/      # Reusable React UI components (Hero, Navbar)
    ├── App.js           # Main Application Layout
    └── index.css        # Global Tailwind & Custom Glow Utility Styles
```

---

## 🏆 Internship Progress Documentation

### Features Completed
1. **Secure Authentication & Google Login:** Built a robust JWT-based login/signup flow with salted hashing using bcrypt, alongside a fully mocked Google OAuth integration for frictionless onboarding.
2. **Dynamic Dashboard:** A customized user vault displaying saved books associated with their unique profile.
3. **CRUD API Operations:** Created Express routes connected to Prisma ORM to create, read, and delete books from the user's personal vault.
4. **Interactive UI:** Successfully implemented client-side state for category filtering, accompanied by Framer Motion animations.
5. **Database Integration:** Successfully implemented PostgreSQL hosting via Neon.
6. **The Arcane Reader (Lore Modal):** Implemented a dark-fantasy themed lore reader with full global search indexing across the forbidden archives.

### Features Pending
* **Community Features:** Expanding the database to allow user reviews and public ratings on individual tomes.
* **Admin Upload Panel:** Allowing authorized users to manually add new books to the public directory.

### Challenges Faced
* **Schema Relationships:** Originally struggled to map user collections without creating overly complex relational tables.
* **API Routing Mismatches:** Facing CORS errors and debugging hardcoded data paths preventing the frontend from reading live database entries.

### Solutions Implemented
* Adopted **Prisma's implicit many-to-many relationships** (`savedBooks Book[]` & `savedBy User[]`) to streamline vault architecture and significantly reduce query times.
* Implemented a **Browser Subagent / Automated Testing Tool** to traverse the running servers, identify the hardcoded API paths, and correct the Express routing files to use dynamic PostgreSQL data.
* Devised a **Mock Google Auth Flow** using auto-generated tokens to demonstrate OAuth UI/UX without requiring real Developer Console Client IDs.

### Next Development Milestones
1. Deploying the frontend to Vercel and the backend to Render.
2. Expanding the global sliding mobile navigation menu across all pages (Dashboard, Lore).
3. Developing a specialized "Grand Archivist" Admin Panel to natively upload and edit forbidden tomes through the UI instead of database seeding.
