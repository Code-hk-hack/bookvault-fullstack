import type { VercelRequest, VercelResponse } from '@vercel/node';
import { prisma } from '../_lib/prisma';
import { setCorsHeaders, handleCorsPreflight } from '../_lib/cors';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCorsHeaders(res);
  if (handleCorsPreflight(req, res)) return;

  switch (req.method) {
    case 'POST':
      return handleAddToCollection(req, res);
    case 'DELETE':
      return handleRemoveFromCollection(req, res);
    default:
      return res.status(405).json({ error: 'Method not allowed' });
  }
}

async function handleAddToCollection(req: VercelRequest, res: VercelResponse) {
  try {
    const { userId, bookId } = req.body;

    if (!userId || !bookId) {
      return res.status(400).json({ error: 'userId and bookId are required.' });
    }

    const user = await prisma.user.update({
      where: { id: String(userId) },
      data: { savedBooks: { connect: { id: String(bookId) } } },
      include: { savedBooks: true },
    });

    return res.status(201).json({ message: 'Added to vault', savedBooks: user.savedBooks });
  } catch (error) {
    console.error('Add to collection error:', error);
    return res.status(500).json({ error: 'Failed to add book' });
  }
}

async function handleRemoveFromCollection(req: VercelRequest, res: VercelResponse) {
  try {
    const { userId, bookId } = req.body;

    if (!userId || !bookId) {
      return res.status(400).json({ error: 'userId and bookId are required.' });
    }

    const user = await prisma.user.update({
      where: { id: String(userId) },
      data: { savedBooks: { disconnect: { id: String(bookId) } } },
      include: { savedBooks: true },
    });

    return res.json({ message: 'Removed successfully', savedBooks: user.savedBooks });
  } catch (error) {
    console.error('Remove from collection error:', error);
    return res.status(500).json({ error: 'Failed to remove' });
  }
}
