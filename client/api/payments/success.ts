import type { VercelRequest, VercelResponse } from '@vercel/node';
import { prisma } from '../_lib/prisma';
import { setCorsHeaders, handleCorsPreflight } from '../_lib/cors';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCorsHeaders(res);
  if (handleCorsPreflight(req, res)) return;

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'userId is required.' });
    }

    // Upgrade user to Premium
    await prisma.user.update({
      where: { id: userId },
      data: { isPremium: true },
    });

    return res.status(200).json({
      success: true,
      message: 'Account upgraded to Premium Scholar',
    });
  } catch (error) {
    console.error('Payment success error:', error);
    return res.status(500).json({ error: 'Failed to process payment' });
  }
}
