"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const google_auth_library_1 = require("google-auth-library");
const bookRoutes_1 = __importDefault(require("./routes/bookRoutes"));
const collectionRoutes_1 = __importDefault(require("./routes/collectionRoutes"));
const paymentRoutes_1 = __importDefault(require("./routes/paymentRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// ==========================================
// 🔐 AUTHENTICATION ROUTES
// ==========================================
// 1. Sign Up (Create an account)
app.post('/api/auth/signup', async (req, res) => {
    try {
        const { email, password } = req.body;
        // Check if the user already exists in Neon
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser)
            return res.status(400).json({ error: "A user with this email already exists." });
        // Hash the password securely
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        // Save the new user to Neon
        const user = await prisma.user.create({
            data: { email, password: hashedPassword }
        });
        // Create a secure JWT token
        const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(201).json({ token, user: { id: user.id, email: user.email, role: user.role } });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to summon user." });
    }
});
// 2. Login (Authenticate existing account)
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        // Find the user in Neon
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user)
            return res.status(404).json({ error: "User not found in the archives." });
        // Verify the password
        const validPassword = await bcryptjs_1.default.compare(password, user.password);
        if (!validPassword)
            return res.status(401).json({ error: "Incorrect password." });
        // Create a secure JWT token
        const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Login failed." });
    }
});
// 2.5 Google OAuth Login
const client = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_CLIENT_ID || 'dummy-client-id');
app.post('/api/auth/google', async (req, res) => {
    try {
        const { credential } = req.body;
        let email, name;
        try {
            // Attempt to verify token with Google
            const ticket = await client.verifyIdToken({
                idToken: credential,
                audience: process.env.GOOGLE_CLIENT_ID || 'dummy-client-id',
            });
            const payload = ticket.getPayload();
            if (payload) {
                email = payload.email;
                name = payload.name;
            }
        }
        catch (err) {
            console.log('Google verification failed, assuming mock token for demonstration purposes.');
            // MOCK FLOW: If verification fails (e.g. using dummy client ID), we extract email from the mock token
            // In a real production app, we would throw an error here.
            if (credential.startsWith('mock_token_')) {
                email = credential.split('_')[2] + '@mock.com';
            }
            else {
                return res.status(401).json({ error: 'Invalid Google token.' });
            }
        }
        if (!email)
            return res.status(400).json({ error: 'Failed to retrieve email from Google.' });
        // Check if user exists
        let user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            // Create user if they don't exist, using a secure randomized dummy password
            const dummyPassword = await bcryptjs_1.default.hash(Math.random().toString(36).slice(-8), 10);
            user = await prisma.user.create({
                data: { email, password: dummyPassword }
            });
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || 'supersecret', { expiresIn: '1d' });
        res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Google Login failed." });
    }
});
// 3. Get User Profile
app.get('/api/auth/:id', async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.params.id },
            select: { id: true, email: true, role: true, isPremium: true, createdAt: true }
        });
        if (!user)
            return res.status(404).json({ error: 'User not found' });
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch user' });
    }
});
// ==========================================
// 📚 BOOK ROUTES
// ==========================================
app.use('/api/books', bookRoutes_1.default);
app.use('/api/collections', collectionRoutes_1.default);
app.use('/api/payments', paymentRoutes_1.default);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🔮 Server running on port ${PORT}`));
