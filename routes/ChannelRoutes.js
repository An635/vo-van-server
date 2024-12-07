import {Router} from 'express';
import {verifyTokens} from '../middlewares/AuthMiddlewares.js';
import { createChannel, getUserChannels } from '../controllers/ChannelController.js';


const channelRoutes = Router();


channelRoutes.post('/create-channel', verifyTokens, createChannel);
channelRoutes.get('/get-user-channels', verifyTokens, getUserChannels);

export default channelRoutes;