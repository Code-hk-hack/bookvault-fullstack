import { Request, Response } from 'express';
import { prisma } from '../prisma';

export const createUser = async (req: Request, res: Response) => {
  try {
    const email = String(req.body.email);
    const username = String(req.body.username);
    
    const existingUser = await prisma.user.findFirst({
      where: { email },
    });
    
    if (existingUser) return res.status(400).json({ error: 'User exists' });
    
    const newUser = await prisma.user.create({ data: { email, password: 'hashedpassword' } });
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to create user' });
  }
};

export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    
    const user = await prisma.user.findUnique({
      where: { id: id },
      include: { savedBooks: true },
    });
    
    if (!user) return res.status(404).json({ error: 'User not found' });
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch user profile' });
  }
};