
import { Router } from "express";
import { verifyTokens } from "../middlewares/AuthMiddlewares.js";
import { searchContacts } from "../controllers/ContactsController.js";


const contactsRoutes = Router();

contactsRoutes.post('/search', verifyTokens, searchContacts);



export default contactsRoutes;