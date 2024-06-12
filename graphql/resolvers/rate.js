import Customers from "../../Models/customers.js";
import Orders from "../../Models/orders.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import config from "../../utils/config.js";
import RateModel from "../../Models/rate.js";

const resolvers = {
  Query: {},
  Mutation: {
    async addRatingToOrder(_, { addRatingToOrderInput }) {
      try {
        const { orderId, restaurantId, rateCount, feedback, customerId } =
          addRatingToOrderInput;

        const existingRating = await RateModel.findOne({
          orderId,
          restaurantId,
        });

        if (existingRating) {
          throw new Error("Rating already provided.");
        }

        const rate = await new RateModel({
          orderId,
          restaurantId,
          rateCount,
          feedback,
          customerId,
        }).save();

        await Orders.findByIdAndUpdate(orderId, {
          rateId: rate._id.toString(),
        });

        return rate;
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    },
  },
};

export default resolvers;
