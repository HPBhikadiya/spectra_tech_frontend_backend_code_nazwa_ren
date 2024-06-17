import Stripe from "stripe";
import config from "./config.js";

export const stripeInstance = () => new Stripe(config.stripeSecretKey);
