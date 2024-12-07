import {Router} from 'express';
import {verifyTokens} from '../middlewares/AuthMiddlewares.js';
import { createChannel } from '../controllers/ChannelController.js';


const channelRoutes = Router();


channelRoutes.post('/create-channel', verifyTokens, createChannel);

export default channelRoutes;