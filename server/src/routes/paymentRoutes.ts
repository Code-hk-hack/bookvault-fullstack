import { Router } from 'express';
import { createCheckoutSession, handlePaymentSuccess } from '../controllers/paymentController';

const router = Router();

router.post('/create-checkout-session', createCheckoutSession);
router.post('/success', handlePaymentSuccess);

export default router;
