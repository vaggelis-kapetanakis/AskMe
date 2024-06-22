import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import compression from "compression";
import cors from "cors";
import dotenv from "dotenv";
import HttpError from "./src/models/http-error"; // Ensure this file exists and is properly typed
import userRoutes from "./src/routes/user-routes";
import questionRoutes from "./src/routes/question-routes";
import answerRoutes from "./src/routes/answer-routes";
import notificationRoutes from "./src/routes/notification-routes";
import tagRoutes from "./src/routes/tag-routes";
import chartRoutes from "./src/routes/chart-routes";

dotenv.config();

const app = express();

app.use(
  compression({
    level: 6,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORS Configuration
const corsOptions: cors.CorsOptions = {
  origin: "http://localhost:5173", // Replace with your frontend URL
  methods: "GET,POST,PATCH,DELETE",
  allowedHeaders:
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Content-Type-Options",
};

app.use(cors(corsOptions));

app.use("/qanda/users", userRoutes);
app.use("/qanda/questions", questionRoutes);
app.use("/qanda/answers", answerRoutes);
app.use("/qanda/notifications", notificationRoutes);
app.use("/qanda/tags", tagRoutes);
app.use("/qanda/charts", chartRoutes);

// Middleware for handling unsupported routes
app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new HttpError("Could not find this route.", 404);
  return next(error);
});

// Error handling middleware
app.use((error: HttpError, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred" });
});

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.tqanr.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(process.env.PORT || 8765, () => {
      console.log(`Server is running on port ${process.env.PORT || 8765}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
