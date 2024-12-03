
import { Router } from "express";
import { verifyTokens } from "../middlewares/AuthMiddlewares.js";
import { getAllContacts, getContactsForDMList, searchContacts } from "../controllers/ContactsController.js";


const contactsRoutes = Router();

contactsRoutes.post('/search', verifyTokens, searchContacts);
contactsRoutes.get('/get-contacts-for-dm', verifyTokens, getContactsForDMList);
contactsRoutes.get('/get-all-contacts', verifyTokens, getAllContacts);



export default contactsRoutes;