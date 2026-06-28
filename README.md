# BookVault 📚✨
> A modern, full-stack e-commerce bookstore web application engineered to bridge the gap between physical literature and seamless digital consumer access[cite: 3, 6].

## About the Project
BookVault is an immersive full-stack online marketplace built to solve critical digital storefront friction, such as high cart abandonment and poor user interfaces[cite: 3, 6]. The platform features a responsive customer-facing application with dynamic search, a persistent shopping cart, and secure third-party payment integration, paired with a protected administrative dashboard for real-time inventory and order tracking[cite: 3, 6].

## Features
### 👤 Customer Features
*   **User Authentication**: Secure signup and login wrapped in server-side validation and JWT-based session protection.
*   **Dynamic Catalog**: A responsive catalog grid supporting real-time title/author searches and genre filtering.
*   **Shopping Cart**: Persistent cart holding actions to add, adjust quantities, and dynamically track totals.
*   **Secure Checkout**: Frictionless checkout processing verified securely via external payment gateway integration (Stripe/Razorpay).

### 👑 Admin Features
*   **Protected Dashboard**: Role-gated dashboard layout isolating store management metrics.
*   **Inventory CRUD**: Full capability to Create, Read, Update, and Delete book entries dynamically updating the customer storefront[cite: 6].
*   **Order Fulfillment**: System database view allowing admins to track orders and manipulate shipping and delivery statuses[cite: 6].

## Tech Stack
| Category | Technology |
| :--- | :--- |
| **Frontend Framework** | React.js (v18, Single Page Application)[cite: 6] |
| **Styling Engine** | Tailwind CSS (Utility-first responsive layout)[cite: 6] |
| **Routing** | React Router (v6, Protected route pattern)[cite: 6] |
| **Backend Runtime** | Node.js & Express.js RESTful API framework[cite: 6] |
| **Database** | MongoDB Cloud Atlas via Mongoose ODM[cite: 6] |
| **Security / Auth** | JSON Web Tokens (JWT) & Bcryptjs password hashing[cite: 6] |
| **Payment Gateway** | Stripe / Razorpay Node.js SDK & Webhook verification[cite: 6] |

## Getting Started
### Prerequisites
*   Node.js installed locally (v18 LTS recommended)[cite: 6]
*   MongoDB Atlas connection string URI[cite: 6]
*   Stripe or Razorpay API developer secret keys[cite: 6]

### Quick Installation
1.  **Clone the Repository**:
    ```bash
    git clone [https://github.com/YOUR_USERNAME/bookvault-fullstack.git](https://github.com/YOUR_USERNAME/bookvault-fullstack.git)
    cd bookvault-fullstack
    ```
2.  **Install Client & Server Dependencies**:
    ```bash
    # Install server tools
    npm install
    # Install client interface
    cd client && npm install
    ```
3.  **Configure Environment Variables** (Create a `.env` file based on the spec guide below)[cite: 4, 6].
4.  **Launch Local Development Servers**:
    ```bash
    # From root to run development pipeline
    npm run dev
    ```

## Environment Variables
Create a file named `.env` in the root directory. **Never commit this file to GitHub.**[cite: 4, 6]
*   `MONGO_URI`: Your MongoDB connection string[cite: 6].
*   `JWT_SECRET`: Random string hash utilized to sign authorization tokens[cite: 6].
*   `STRIPE_SECRET_KEY`: Private developer sandbox key from payment gateway dashboard[cite: 6].
*   `CLIENT_URL`: The frontend source port URL (e.g., `http://localhost:3000`)[cite: 6].

## API Endpoints
| Method | Endpoint | Auth Required | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/auth/register` | No | Creates a new user profile with hashed credentials[cite: 6]. |
| `POST` | `/api/v1/auth/login` | No | Validates user role and returns active session JWT[cite: 6]. |
| `GET` | `/api/v1/books` | No | Pulls complete paginated and searchable book catalog listings[cite: 6]. |
| `POST` | `/api/v1/cart` | Yes (Customer) | Adds chosen item subdocument into persistent user cart reference[cite: 6]. |
| `POST` | `/api/v1/orders/checkout` | Yes (Customer) | Validates payment intent payload with third-party gateway[cite: 6]. |
| `POST` | `/api/v1/books` | Yes (Admin) | Injects a new book entry layout into database[cite: 6]. |

## Project Structure
```text
bookvault-fullstack/
├── client/              # React.js Front-End SPA[cite: 6]
│   ├── src/
│   │   ├── components/  # Reusable UI cards, inputs, navbar layouts[cite: 6]
│   │   └── pages/       # Home, Cart, Book Details, Checkout templates[cite: 6]
├── server/              # Node.js / Express Backend API[cite: 6]
│   ├── config/          # Database & environment keys bindings
│   ├── controllers/     # Business logic endpoint execution handlers[cite: 6]
│   ├── middleware/      # JWT route guardians & validation filters[cite: 6]
│   ├── models/          # Mongoose schema definitions (Users, Books, Orders)[cite: 4, 6]
│   └── routes/          # Express route mappings connecting paths to controllers[cite: 6]
└── README.md