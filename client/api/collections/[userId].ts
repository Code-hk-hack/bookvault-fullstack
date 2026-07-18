import type { VercelRequest, VercelResponse } from '@vercel/node';
import { prisma } from '../_lib/prisma';
import { setCorsHeaders, handleCorsPreflight } from '../_lib/cors';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCorsHeaders(res);
  if (handleCorsPreflight(req, res)) return;

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { userId } = req.query;

    if (!userId || typeof userId !== 'string') {
      return res.status(400).json({ error: 'userId is required.' });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { savedBooks: true },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json(user.savedBooks);
  } catch (error) {
    console.error('Get collection error:', error);
    return res.status(500).json({ error: 'Failed to fetch collection' });
  }
}
