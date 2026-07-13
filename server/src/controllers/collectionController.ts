import { Request, Response } from 'express';
import { prisma } from '../prisma';

export const addToCollection = async (req: Request, res: Response) => {
  try {
    const userId = String(req.body.userId);
    const bookId = String(req.body.bookId);
    
    const existingEntry = await prisma.collection.findUnique({
      where: { userId_bookId: { userId, bookId } },
    });
    if (existingEntry) return res.status(400).json({ error: 'Book already in collection' });
    
    const collectionItem = await prisma.collection.create({
      data: { userId, bookId },
      include: { book: true },
    });
    return res.status(201).json(collectionItem);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to add book' });
  }
};

export const getUserCollection = async (req: Request, res: Response) => {
  try {
    const userId = String(req.params.userId);
    
    const collection = await prisma.collection.findMany({
      where: { userId: userId },
      include: { book: true },
      orderBy: { savedAt: 'desc' },
    });
    return res.json(collection);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch collection' });
  }
};

export const removeFromCollection = async (req: Request, res: Response) => {
  try {
    const userId = String(req.body.userId);
    const bookId = String(req.body.bookId);
    
    await prisma.collection.delete({
      where: { userId_bookId: { userId, bookId } },
    });
    return res.json({ message: 'Removed successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to remove' });
  }
};