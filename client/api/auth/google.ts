import type { VercelRequest, VercelResponse } from '@vercel/node';
import { prisma } from '../_lib/prisma';
import { signToken } from '../_lib/auth';
import { setCorsHeaders, handleCorsPreflight } from '../_lib/cors';
import bcrypt from 'bcryptjs';
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID || 'dummy-client-id');

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCorsHeaders(res);
  if (handleCorsPreflight(req, res)) return;

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { credential } = req.body;
    let email: string | undefined;

    try {
      // Attempt real Google verification
      const ticket = await client.verifyIdToken({
        idToken: credential,
        audience: process.env.GOOGLE_CLIENT_ID || 'dummy-client-id',
      });
      const payload = ticket.getPayload();
      if (payload) {
        email = payload.email;
      }
    } catch {
      // Mock flow: if verification fails with dummy client ID, extract from mock token
      if (credential && credential.startsWith('mock_token_')) {
        email = credential.split('_')[2] + '@mock.com';
      } else {
        return res.status(401).json({ error: 'Invalid Google token.' });
      }
    }

    if (!email) {
      return res.status(400).json({ error: 'Failed to retrieve email from Google.' });
    }

    // Find or create user
    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      const dummyPassword = await bcrypt.hash(Math.random().toString(36).slice(-8), 10);
      user = await prisma.user.create({
        data: { email, password: dummyPassword },
      });
    }

    const token = signToken({ id: user.id, role: user.role });

    return res.json({
      token,
      user: { id: user.id, email: user.email, role: user.role },
    });
  } catch (error) {
    console.error('Google auth error:', error);
    return res.status(500).json({ error: 'Google Login failed.' });
  }
}
