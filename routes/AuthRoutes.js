
import { Router } from "express";
import { login, signup, getUserInfo, updateProfile} from "../controllers/AuthController.js";
import { verifyTokens } from "../middlewares/AuthMiddlewares.js";



const authRoutes = Router();

authRoutes.post('/signup', signup);
authRoutes.post('/login', login);
authRoutes.get('/user-info',verifyTokens,getUserInfo);
authRoutes.post('/update-profile',verifyTokens,updateProfile);

export default authRoutes;