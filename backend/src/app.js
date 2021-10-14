import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./configs/db";

dotenv.config();

// Connect to database.
connectDB();

const app = express();

// Config body parser
app.use(express.json());

// Config for only development
if (process.env.NODE_ENV === "development") {
  app.use(
    cors({
      origin: process.env.CLIENT_URL,
    })
  );

  app.use(morgan("dev"));
}

// Load all routes
const authRouter = require("./routes/auth.route");
const userRouter = require("./routes/user.route");

// Use Routes
app.use("/api/auth/", authRouter);
app.use("/api/user/", userRouter);


// post declaration
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
