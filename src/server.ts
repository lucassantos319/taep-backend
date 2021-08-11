import express from "express";
import "./database";
import { userRoutes } from "./routes/usersRoutes";
import { projectRoutes } from "./routes/ProjectRoutes";
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const allowedOrigins = ['http://localhost:3000'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};

const app = express();

app.use(cors(options));
app.use(express.json());
app.use(userRoutes);
app.use(projectRoutes);

app.listen(3333,() => {});