import express from "express";
import "./database";
import { userRoutes } from "./routes/usersRoutes";
import { projectRoutes } from "./routes/ProjectRoutes";
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
// const allowedOrigins = ['https://reacttest120.herokuapp.com'];

// const options: cors.CorsOptions = {
//   origin: allowedOrigins,
//   allowedHeaders:["Access-Control-Allow-Origin"]
// };

const app = express();
app.use(cors());
app.use(express.json());
app.use(userRoutes);
app.use(projectRoutes);

app.listen(process.env.PORT || 5000,() => console.log("Server is running on port 5000"));