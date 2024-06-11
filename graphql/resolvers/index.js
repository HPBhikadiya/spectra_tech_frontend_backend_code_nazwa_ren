import restaurantsResolvers from "./restaurants.js";
import customersResolvers from "./customers.js";
import rateResolvers from "./rate.js";

const resolvers = {
  Query: {
    ...restaurantsResolvers.Query,
    ...customersResolvers.Query,
  },
  Mutation: {
    ...customersResolvers.Mutation,
    ...restaurantsResolvers.Mutation,
    ...rateResolvers.Mutation,
  },
};

export default resolvers;
