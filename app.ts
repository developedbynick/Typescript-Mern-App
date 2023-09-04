import express from "express";
const app = express();
import errorHandler, {
  DevelopmentErrorHandler as DevErrorHandler,
} from "./controllers/errorController";
import noteRouter from "./routes/noteRouter";
import env from "./utils/validateEnv";
// Middleware
app.use(express.json());

// Setting up sub routes
app.use("/api/notes/", noteRouter);

// 404 Error Handler
app.all("*", (req, _, next) =>
  next({ code: 404, message: `Resource at ${req.url} not found` })
);

app.use(env.isDevelopment ? DevErrorHandler : errorHandler);

export default app;
