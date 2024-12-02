
import { Router } from "express";
import { verifyTokens } from "../middlewares/AuthMiddlewares.js";
import { getContactsForDMList, searchContacts } from "../controllers/ContactsController.js";


const contactsRoutes = Router();

contactsRoutes.post('/search', verifyTokens, searchContacts);
contactsRoutes.get('/get-contacts-for-dm', verifyTokens, getContactsForDMList);



export default contactsRoutes;