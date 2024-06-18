// routes/payment.js

import express from "express";
import stripe from "stripe";
import config from "../utils/config.js";

const router = express.Router();
// const stripeSecretKey = 'YOUR_STRIPE_SECRET_KEY';
const stripeSecretKey = config.stripeSecretKey;

const stripeClient = new stripe(stripeSecretKey);

// POST /api/create-payment-intent
router.post("/create-payment-intent", async (req, res) => {
  const { amount, amount_details, description } = req.body;
  try {
    const paymentIntent = await stripeClient.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: "cad",
      description: JSON.stringify({
        amount_details,
        description,
      }),
      // amount_details,
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({ error: "Failed to create payment intent" });
  }
});

export default router;
