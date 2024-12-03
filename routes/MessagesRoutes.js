import {Router} from 'express';
import {verifyTokens} from '../middlewares/AuthMiddlewares.js';
import { getMessages, uploadFile } from '../controllers/MessageController.js';
import multer from 'multer';

const messageRoutes = Router();

const upload = multer({dest:"uploads/files"})
messageRoutes.post("/get-messages", verifyTokens, getMessages);
messageRoutes.post('/upload-file', verifyTokens, upload.single("file"), uploadFile)

export default messageRoutes;