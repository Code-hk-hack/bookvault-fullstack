# BookVault 📚

## Project Description
BookVault is a modern, full-stack e-commerce web application engineered to bridge the gap between physical literature and seamless digital consumer access[cite: 3]. It provides a secure, centralized platform for discovering, managing, and purchasing books online[cite: 3].

## Problem Statement
Many independent bookstores rely exclusively on physical locations, which severely limits their customer reach[cite: 3, 5]. Furthermore, existing small-scale digital platforms often suffer from poor user interfaces, friction-heavy checkout processes, and a lack of secure authentication, which directly contributes to high cart abandonment and lost revenue[cite: 3, 5].

## Target Users
*   **Customer:** General book-buying consumers looking to seamlessly search catalogs, manage a shopping cart, and securely complete purchases online[cite: 5].
*   **Admin:** Bookstore operational staff and owners who require a secure dashboard to manage book inventory (CRUD operations) and fulfill customer orders efficiently[cite: 5].

## Features (Current & Planned)
**Current Features (MVP)**
*   Secure User Authentication via JWT[cite: 5].
*   Dynamic Book Catalog with real-time search and genre filtering[cite: 5].
*   Persistent Shopping Cart (add, remove, update quantities)[cite: 5].
*   Secure Checkout Flow integrated with Stripe/Razorpay[cite: 5].
*   Protected Admin Dashboard for full inventory and order management[cite: 5].

**Planned Features (Future Enhancements)**
*   Customer review and 5-star rating system[cite: 5].
*   User Wishlist / "Save for Later" functionality[cite: 5].
*   Automated transactional email notifications (order receipts)[cite: 5].
*   Advanced Admin Analytics Dashboard for tracking revenue and stock trends[cite: 5].

## Technology Stack
*   **Frontend:** React.js, Tailwind CSS[cite: 4].
*   **Backend:** Node.js, Express.js[cite: 4].
*   **Database:** MongoDB Atlas managed via Mongoose ODM[cite: 4].
*   **Authentication:** JSON Web Tokens (JWT) & bcryptjs[cite: 4].
*   **Payment Gateway:** Stripe / Razorpay Node.js SDK[cite: 4].

## Folder Structure
```text
bookvault-fullstack/
├── client/              # React.js Front-End SPA
│   ├── src/
│   │   ├── components/  # Reusable UI elements (Navbar, Hero)
│   │   └── pages/       # Page layouts (Home, Cart, Checkout)
├── server/              # Node.js & Express Backend API
│   ├── config/          # Environment and database configurations
│   ├── controllers/     # API route logic
│   ├── middleware/      # JWT authentication and error handling
│   ├── models/          # Mongoose schemas (Users, Books, Orders)
│   └── routes/          # API endpoint definitions
└── README.md