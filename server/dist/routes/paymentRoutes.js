"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const paymentController_1 = require("../controllers/paymentController");
const router = (0, express_1.Router)();
router.post('/create-checkout-session', paymentController_1.createCheckoutSession);
router.post('/success', paymentController_1.handlePaymentSuccess);
exports.default = router;
