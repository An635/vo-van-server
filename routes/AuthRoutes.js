
import { Router } from "express";
import { login, signup, getUserInfo} from "../controllers/AuthController.js";
import { verifyTokens } from "../middlewares/AuthMiddlewares.js";



const authRoutes = Router();

authRoutes.post('/signup', signup);
authRoutes.post('/login', login);
authRoutes.get('/user-info',verifyTokens,getUserInfo);

export default authRoutes;