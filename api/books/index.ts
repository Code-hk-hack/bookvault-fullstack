import type { VercelRequest, VercelResponse } from '@vercel/node';
import { prisma } from '../_lib/prisma';
import { setCorsHeaders, handleCorsPreflight } from '../_lib/cors';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCorsHeaders(res);
  if (handleCorsPreflight(req, res)) return;

  switch (req.method) {
    case 'GET':
      return handleGetBooks(req, res);
    case 'POST':
      return handleCreateBook(req, res);
    default:
      return res.status(405).json({ error: 'Method not allowed' });
  }
}

async function handleGetBooks(_req: VercelRequest, res: VercelResponse) {
  try {
    const books = await prisma.book.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return res.json(books);
  } catch (error) {
    console.error('Get books error:', error);
    return res.status(500).json({ error: 'Failed to fetch books' });
  }
}

async function handleCreateBook(req: VercelRequest, res: VercelResponse) {
  try {
    const { title, author, genre, coverImage, rating, lore } = req.body;

    if (!title || !author || !coverImage) {
      return res.status(400).json({ error: 'Title, author, and coverImage are required.' });
    }

    const newBook = await prisma.book.create({
      data: { title, author, genre, coverImage, rating, lore },
    });

    return res.status(201).json(newBook);
  } catch (error) {
    console.error('Create book error:', error);
    return res.status(400).json({ error: 'Failed to create book' });
  }
}
