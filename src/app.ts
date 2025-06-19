// node modules
import express from "express";

// local modules
import appRouter from "./api";

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/v1", appRouter);

export default app;
