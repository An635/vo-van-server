import {Router} from 'express';
import {verifyTokens} from '../middlewares/AuthMiddlewares.js';
import { createChannel, getChannelMessages, getUserChannels } from '../controllers/ChannelController.js';


const channelRoutes = Router();


channelRoutes.post('/create-channel', verifyTokens, createChannel);
channelRoutes.get('/get-user-channels', verifyTokens, getUserChannels);
channelRoutes.get('/get-channel-messages/:channelId', verifyTokens, getChannelMessages);

export default channelRoutes;