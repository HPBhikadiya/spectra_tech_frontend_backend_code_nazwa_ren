import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import auth from "../middleware/auth.js";
import Restaurants, { Dish } from "../Models/restaurants.js";
import Orders from "../Models/orders.js";
import { stripeInstance } from "../utils/stripe.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Get all restaurants
router.get("/", async (req, res) => {
  try {
    const { customer_city, search } = req.query;
    let searchStringRegex = new RegExp(req.query.search, "i");
    const resList = await Restaurants.find({
      $or: [
        { name: searchStringRegex },
        { "address.city": searchStringRegex },
        { "dishes.dish_name": searchStringRegex },
      ],
    });
    const results = { data: resList };
    return res.status(200).json(results);
  } catch (error) {
    console.log("error:", error);
    return res.status(500).json(error);
  }
});

// Update restaurant profile
router.put("/profile", async (req, res) => {
  try {
    const {
      res_id,
      name,
      discount,
      commission,
      notificationMode,
      delivery_option,
      phone_number,
      description,
      restaurant_image,
      timing_open,
      timing_close,
      street_address,
      apt_number,
      city,
      state,
      country,
      zipcode,
    } = req.body;
    console.log("profile" + req.body.restaurant_image);
    const update = {
      name,
      delivery_option,
      discount,
      commission,
      notificationMode,
      phone_number,
      description,
      restaurant_image,
      timing_open,
      timing_close,
      address: {
        street_address,
        apt_number,
        city,
        state,
        country,
        zipcode,
      },
    };
    const result = await Restaurants.findByIdAndUpdate(res_id, update, {
      new: true,
    });
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

// Add a restaurant dish
router.post("/:id/dish", upload.single("dish_image"), async (req, res) => {
  try {
    const {
      dish_name,
      dish_price,
      description,
      main_ingredient,
      dish_category,
      food_type,
    } = req.body;
    const res_id = req.params.id;
    const dish_image = req.file ? `/images/${req.file.filename}` : "";

    const dishObj = new Dish({
      dish_name,
      dish_image,
      dish_price,
      description,
      main_ingredient,
      dish_category,
      food_type,
      res_id,
    });

    const r = await Restaurants.findById(res_id);
    r.dishes.push(dishObj);
    await r.save();
    return res.status(200).json({ data: r, dish: dishObj });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

// Update a restaurant dish
router.put("/:res_id/dish/:id", async (req, res) => {
  try {
    const {
      dish_name,
      dish_image,
      dish_price,
      description,
      main_ingredient,
      dish_category,
      food_type,
    } = req.body;
    const res_id = req.params.res_id;
    const dish_id = req.params.id;
    const update = {
      dish_name,
      dish_image,
      dish_price,
      description,
      main_ingredient,
      dish_category,
      food_type,
    };
    const r = await Restaurants.findById(res_id);
    let dish = r.dishes.id(mongoose.Types.ObjectId(dish_id));
    dish.set({ ...update });
    let result = await r.save();
    return res.status(200).json({ data: result, dish });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

// Delete a restaurant dish
router.delete("/:res_id/dish/:id", async (req, res) => {
  const res_id = req.params.res_id;
  const dish_id = req.params.id;
  try {
    const result = await Restaurants.findByIdAndUpdate(
      res_id,
      { $pull: { dishes: { _id: dish_id } } },
      { new: true }
    );
    return res.status(200).json({ data: result });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

// Get orders
router.get("/:id/orders", async (req, res) => {
  try {
    const res_id = req.params.id;
    const orders = await Orders.find({ res_id });
    return res.status(200).json({ data: orders });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

// Update order
router.put("/order", async (req, res) => {
  try {
    const { order_id, delivery_status, res_id, cancelReason } = req.body;
    let order = await Orders.findById(order_id);
    order.delivery_status = delivery_status;
    order = await order.save();
    const restaurant = await Restaurants.findById(order.res_id);
    let updatedOrders = await Orders.findById(order_id);

    if (delivery_status === 4) {
      if (cancelReason === 1) {
        const paymentIntent = await stripeInstance().paymentIntents.retrieve(
          order.paymentIntentId
        );

        const chargeId = paymentIntent.latest_charge;
        const charge = await stripeInstance().charges.retrieve(chargeId);

        const balance_transaction =
          await stripeInstance().balanceTransactions.retrieve(
            charge.balance_transaction
          );

        const charges = balance_transaction.fee;

        await stripeInstance()
          .transfers.retrieve(order.transferId)
          .then(async (transfer) => {
            await stripeInstance()
              .transfers.createReversal(transfer.id, {
                amount: transfer.amount,
              })
              .then(async () => {
                await stripeInstance().refunds.create({
                  payment_intent: order.paymentIntentId,
                  amount: paymentIntent.amount - charges,
                });
              });
          });
      } else {
        const paymentIntent = await stripeInstance().paymentIntents.retrieve(
          order.paymentIntentId
        );

        const chargeId = paymentIntent.latest_charge;
        const charge = await stripeInstance().charges.retrieve(chargeId);

        const balance_transaction =
          await stripeInstance().balanceTransactions.retrieve(
            charge.balance_transaction
          );

        const charges = balance_transaction.fee;

        await stripeInstance()
          .charges.create({
            amount: charges,
            currency: "cad",
            source: restaurant.stripeAccountId,
          })
          .then(async () => {
            await stripeInstance()
              .transfers.retrieve(order.transferId)
              .then(async (transfer) => {
                await stripeInstance()
                  .transfers.createReversal(transfer.id, {
                    amount: transfer.amount,
                  })
                  .then(async () => {
                    await stripeInstance().refunds.create({
                      payment_intent: order.paymentIntentId,
                      amount: paymentIntent.amount,
                    });
                  });
              });
          });
      }
    }

    return res.status(200).json({ data: updatedOrders });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

export default router;
