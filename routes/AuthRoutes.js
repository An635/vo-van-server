
import { Router } from "express";
import { login, signup, getUserInfo, updateProfile, addProfileImage, removeProfileImage} from "../controllers/AuthController.js";
import { verifyTokens } from "../middlewares/AuthMiddlewares.js";
import multer from 'multer'


const authRoutes = Router();
const upload = multer({dest:'uploads/profiles'});

authRoutes.post('/signup', signup);
authRoutes.post('/login', login);
authRoutes.get('/user-info',verifyTokens,getUserInfo);
authRoutes.post('/update-profile',verifyTokens,updateProfile);
authRoutes.post('/add-profile-image',verifyTokens,upload.single('profile-image'), addProfileImage);
authRoutes.delete('/remove-profile-image', verifyTokens, removeProfileImage)
export default authRoutes;