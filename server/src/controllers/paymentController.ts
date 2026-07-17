import { Request, Response } from 'express';
import { prisma } from '../prisma';

export const createCheckoutSession = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    
    // In a real application, this would call stripe.checkout.sessions.create()
    // For our prototype, we will return a URL to our Mock Checkout page.
    // Use CLIENT_URL env var for production, fallback to localhost for dev
    const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
    const mockCheckoutUrl = `${clientUrl}/mock-checkout?userId=${userId}`;
    
    return res.status(200).json({ url: mockCheckoutUrl });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to create checkout session' });
  }
};

export const handlePaymentSuccess = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    
    // In a real application, this would be a secure Stripe Webhook endpoint
    // verifying the event signature. Here, we simulate the success logic.
    await prisma.user.update({
      where: { id: userId },
      data: { isPremium: true }
    });
    
    return res.status(200).json({ success: true, message: 'Account upgraded to Premium Scholar' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to process payment' });
  }
};
