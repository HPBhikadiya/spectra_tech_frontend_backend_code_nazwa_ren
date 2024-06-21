import express from "express";
// import pool from "./pool.js";
// import bcrypt from 'bcrypt';
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import { ApolloServer, gql } from "apollo-server-express";
import connectMongoDB from "./utils/dbConnection.js";
// import config from "./utils/config.js";
import signup from "./routes/signup.js";
import login from "./routes/login.js";
import restaurants from "./routes/restaurants.js";
import customers from "./routes/customers.js";
import logout from "./routes/logout.js";
import imageUpload from "./routes/imageUpload.js";
import passport from "passport";
import usepassport from "./middleware/passport.js";
import typeDefs from "./graphql/typeDefs.js";
import resolvers from "./graphql/resolvers/index.js";
import paymentRouter from "./routes/payment.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { v4 as uuidv4 } from "uuid";
import { extname } from "path";
import * as fs from "fs";
// Get the directory name of the current module
const __dirname = dirname(fileURLToPath(import.meta.url));

// Construct a schema, using GraphQL schema language
// const typeDefs = gql`
//   type Query {
//     hello: String
//   }
// `;

// Provide resolver functions for your schema fields
// const resolvers = {
//   Query: {
//     hello: () => 'Hello world!',
//     getRestaurants: () => {},
//   },
// };

const server = new ApolloServer({
  playground: true,
  typeDefs,
  resolvers,
});

// Added this line
await server.start();

const app = express();

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// const {mongoDB} = config
server.applyMiddleware({ app });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname,'/build')));
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use("/signup", signup);
app.use("/restaurants", restaurants);

//Passport midlleware
app.use(passport.initialize());

//passport config
usepassport(passport);

app.use("/login", login);
app.use("/customers", customers);
app.use("/logout", logout);
app.use("/payment", paymentRouter);
app.use("", imageUpload);
// app.use("/stripe", async (req, res) => {
//   const accounts = await stripeInstance().accounts.retrieve(
//     "acct_1PT0Cg4gGgEYddkT"
//   );
//   const balance = await stripeInstance().balance.retrieve({
//     stripeAccount: "acct_1PT0Cg4gGgEYddkT",
//   });
//   ("acct_1PT0Cg4gGgEYddkT");
//   res.status(200).json({ accounts, balance });
//   fs.writeFileSync("balance.json", JSON.stringify(balance, null, 2));
//   fs.writeFileSync("accounts.json", JSON.stringify(accounts, null, 2));
// });

const port = 3002;
import multer from "multer";
import { stripeInstance } from "./utils/stripe.js";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Specify the directory where files will be stored
  },
  filename: function (req, file, cb) {
    // Generate a unique filename using UUID
    const uniqueFilename = uuidv4();
    // Get the file extension from the original filename
    const ext = extname(file.originalname);
    // Concatenate the UUID and file extension to create the final filename
    const filenameWithExt = `${uniqueFilename}${ext}`;
    cb(null, filenameWithExt); // Use the unique filename with extension
  },
});
const upload = multer({ storage: storage });
app.post("/upload_image", upload.single("file"), (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).send({ message: "No file uploaded" });
    }

    // Here you might process the file, store it in a database, etc.
    // Then you would return the URL where the file can be accessed
    const imageUrl = `../uploads/${file.filename}`;
    res.status(200).send({ imageUrl: imageUrl });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).send({ message: "Server error" });
  }
});

// Use of another path to see results for js_refresher.js
app.post("/process-payment", async (req, res) => {
  const { amount, payment_method } = req.body;

  try {
    // Create a PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "cad",
      payment_method: payment_method, // This should be a valid payment method ID or token
      confirm: true, // Confirm the PaymentIntent immediately
    });

    // Ensure the paymentIntent status is succeeded
    if (paymentIntent.status === "succeeded") {
      res.status(200).json({ message: "Payment succeeded!" });
    } else {
      res.status(400).json({ error: "Payment failed" });
    }
  } catch (error) {
    console.error("Error processing payment:", error);
    res.status(500).json({ error: "Failed to process payment" });
  }
});

connectMongoDB();

const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connected to Database"));

// To listen to port 3002
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});

export default app;
