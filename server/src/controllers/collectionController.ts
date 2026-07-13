import { Request, Response } from 'express';
import { prisma } from '../prisma';

export const addToCollection = async (req: Request, res: Response) => {
  try {
    const userId = String(req.body.userId);
    const bookId = String(req.body.bookId);
    
    const user = await prisma.user.update({
      where: { id: userId },
      data: { savedBooks: { connect: { id: bookId } } },
      include: { savedBooks: true }
    });
    return res.status(201).json({ message: 'Added to vault', savedBooks: user.savedBooks });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to add book' });
  }
};

export const getUserCollection = async (req: Request, res: Response) => {
  try {
    const userId = String(req.params.userId);
    
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { savedBooks: true }
    });
    if (!user) return res.status(404).json({ error: 'User not found' });
    return res.json(user.savedBooks);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch collection' });
  }
};

export const removeFromCollection = async (req: Request, res: Response) => {
  try {
    const userId = String(req.body.userId);
    const bookId = String(req.body.bookId);
    
    const user = await prisma.user.update({
      where: { id: userId },
      data: { savedBooks: { disconnect: { id: bookId } } },
      include: { savedBooks: true }
    });
    return res.json({ message: 'Removed successfully', savedBooks: user.savedBooks });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to remove' });
  }
};