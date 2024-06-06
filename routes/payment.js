// routes/payment.js

import express from "express";
import stripe from "stripe";

const router = express.Router();
// const stripeSecretKey = 'YOUR_STRIPE_SECRET_KEY';
const stripeSecretKey =
  "sk_test_51PD8cpRo4zop4imPXDtVFXep45y6UxxTj2hMnGg2q1AxCQsFAeCeWOjau6R6veGdQWI10Be0s63X1jJLiMW9jvRg0046uf52YC";

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

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({ error: "Failed to create payment intent" });
  }
});

export default router;
