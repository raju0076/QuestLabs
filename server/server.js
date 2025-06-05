import express from "express";
import dotenv from "dotenv";
import cors from "cors";  
import { connecteDB } from "./configs/mongo.config.js";
import formRouter from "./routes/form.routes.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true,
}));

app.use(express.json());

app.use("/users", formRouter);

connecteDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
