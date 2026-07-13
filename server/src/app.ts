import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import bookRoutes from './routes/bookRoutes';
import collectionRoutes from './routes/collectionRoutes';
import paymentRoutes from './routes/paymentRoutes';
dotenv.config();

const app = express();
const prisma = new PrismaClient();

// Middleware
app.use(cors());
app.use(express.json());

// ==========================================
// 🔐 AUTHENTICATION ROUTES
// ==========================================

// 1. Sign Up (Create an account)
app.post('/api/auth/signup', async (req, res): Promise<any> => {
  try {
    const { email, password } = req.body;
    
    // Check if the user already exists in Neon
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return res.status(400).json({ error: "A user with this email already exists." });

    // Hash the password securely
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the new user to Neon
    const user = await prisma.user.create({
      data: { email, password: hashedPassword }
    });

    // Create a secure JWT token
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET as string, { expiresIn: '1d' });
    
    res.status(201).json({ token, user: { id: user.id, email: user.email, role: user.role } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to summon user." });
  }
});

// 2. Login (Authenticate existing account)
app.post('/api/auth/login', async (req, res): Promise<any> => {
  try {
    const { email, password } = req.body;
    
    // Find the user in Neon
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ error: "User not found in the archives." });

    // Verify the password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ error: "Incorrect password." });

    // Create a secure JWT token
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET as string, { expiresIn: '1d' });
    
    res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Login failed." });
  }
});
// 3. Get User Profile
app.get('/api/auth/:id', async (req, res): Promise<any> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
      select: { id: true, email: true, role: true, isPremium: true, createdAt: true }
    });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// ==========================================
// 📚 BOOK ROUTES
// ==========================================
app.use('/api/books', bookRoutes);
app.use('/api/collections', collectionRoutes);
app.use('/api/payments', paymentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🔮 Server running on port ${PORT}`));