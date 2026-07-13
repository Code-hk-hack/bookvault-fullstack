import { Request, Response } from 'express';
import { prisma } from '../prisma';

// Get all books
export const getBooks = async (req: Request, res: Response) => {
  try {
    const books = await prisma.book.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch books' });
  }
};

// Create a new book
export const createBook = async (req: Request, res: Response) => {
  try {
    const { title, author, genre, coverImage, rating, lore } = req.body;
    
    const newBook = await prisma.book.create({
      data: { title, author, genre, coverImage, rating, lore },
    });

    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create book' });
  }
};