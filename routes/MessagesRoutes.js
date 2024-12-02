import {Router} from 'express';
import {verifyTokens} from '../middlewares/AuthMiddlewares.js';
import { getMessages } from '../controllers/MessageController.js';


const messageRoutes = Router();

messageRoutes.post("/get-messages", verifyTokens, getMessages);


export default messageRoutes;