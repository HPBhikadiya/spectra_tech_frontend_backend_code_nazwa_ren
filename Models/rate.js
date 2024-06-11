import mongoose from "mongoose";

const Schema = mongoose.Schema;

const rateSchema = new Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "orders",
  },
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "restaurant",
  },
  rateCount: {
    type: Number,
  },
  feedback: {
    type: String,
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "restaurant",
  },
});

const RateModel = mongoose.model("rate", rateSchema);

export default RateModel;
