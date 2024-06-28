import Restaurants, { Dish } from "../../Models/restaurants.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import config from "../../utils/config.js";
import Orders from "../../Models/orders.js";
import { stripeInstance } from "../../utils/stripe.js";

const resolvers = {
  Query: {
    async getRestaurants(parent, args) {
      try {
        const { customer_city = "", search = "" } = args;
        let searchStringRegex = new RegExp(search, "i");
        const resList = await Restaurants.find({
          $or: [
            { name: searchStringRegex },
            { "address.city": searchStringRegex },
            { "dishes.dish_name": searchStringRegex },
          ],
        });
        return resList;
      } catch (error) {
        console.log("error:", error);
        throw new Error(error);
      }
    },
  },
  Mutation: {
    async postDish(parent, args) {
      try {
        const {
          res_id,
          dish_name,
          dish_image,
          dish_price,
          description,
          main_ingredient,
          dish_category,
          food_type,
        } = args.dish;
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
        return r;
        // return res.status(200).json({ data: r, dish: dishObj });
      } catch (error) {
        console.log(error);
        throw new Error(error);
        // return res.status(500).json(error);
      }
    },
    async updateDish(parent, args) {
      try {
        const {
          res_id,
          _id,
          dish_name,
          dish_image,
          dish_price,
          description,
          main_ingredient,
          dish_category,
          food_type,
        } = args.dish;
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
        let dish = r.dishes.id(mongoose.Types.ObjectId(_id));
        dish.set({ ...update });
        let result = await r.save();
        return result;
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    },
    async updateResOrderStatus(parent, args) {
      try {
        const { res_id, order_id, delivery_status } = args;
        let order = await Orders.findById(order_id);
        order.delivery_status = delivery_status;
        order = await order.save();
        const updatedOrders = await Orders.find({ res_id }).sort({ _id: -1 });
        return updatedOrders;
      } catch (error) {
        console.log(error);
        throw new Error(error);
      }
    },
    async restaurantLogin(_, { loginInput }) {
      const { email, password } = loginInput;
      try {
        const restaurant = await Restaurants.findOne({ email });
        console.log({ restaurant });
        if (!restaurant.have_access) {
          throw new Error("Access denied");
        }
        if (!restaurant) {
          throw new Error("Invalid email");
        }
        const match = await bcrypt.compare(password, restaurant.password);
        if (!match) {
          throw new Error("Invalid password");
        }
        const token = jwt.sign({ email }, config.token_key, {
          expiresIn: "2h",
        });
        restaurant.token = token;
        await restaurant.save();
        return restaurant;
      } catch (error) {
        console.log("======inside catch:");
        console.log("error==", error);
        throw new Error(error);
      }
    },
    async restaurantLogout(_, { logoutInput }) {
      const { email } = logoutInput;
      try {
        await Restaurants.updateOne({ email }, { token: "" });
        return;
      } catch (error) {
        console.log("error==", error);
        throw new Error(error);
      }
    },
    async restaurantSignup(_, { restaurantSignupInput }) {
      try {
        const {
          email,
          password,
          name,
          city,
          street_address = "",
          apt_number = "",
          state,
          country,
          zipcode = null,
        } = restaurantSignupInput;

        const existingUser = await Restaurants.findOne({ email: email });
        if (existingUser) {
          throw new Error("Restaurant with given email already exist");
        }
        const password1 = await bcrypt.hash(password, 10);

        const resBody = new Restaurants({
          name,
          email,
          password: password1,
          phone_number: "",
          description: "",
          timing_open: "",
          timing_close: "",
          token: "",
          restaurant_image: "",
          menuUrl: "",
          address: {
            street_address,
            apt_number,
            city,
            state,
            country,
            zipcode,
          },
          dishes: [],
        });
        const data = await resBody.save();

        const account = await stripeInstance().accounts.create({
          country: "CA",
          email: email,
          type: "express",
          // controller: {
          //   fees: {
          //     payer: "application",
          //   },
          //   losses: {
          //     payments: "application",
          //   },
          //   stripe_dashboard: {
          //     type: "express",
          //   },
          // },
        });
        const accountId = account.id;
        const accountLink = await stripeInstance().accountLinks.create({
          account: accountId,
          return_url: `http://localhost:3000/login`,
          refresh_url: `http://localhost:3000/refresh/${accountId}`,
          type: "account_onboarding",
        });
        await Restaurants.findByIdAndUpdate(
          data._id.toString(),
          {
            stripeAccountId: accountId,
          },
          { new: true }
        );

        return accountLink;
      } catch (error) {
        console.log("error==", error);
        throw new Error(error);
      }
    },
  },
};

export default resolvers;
