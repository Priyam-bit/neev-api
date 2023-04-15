import { Router } from "express";
import { addContact, deleteContact, getContactById, getContacts, getUserContactsByEmail, updateContact } from "./contactDetail.controller";

const router = Router();

router.get('/all', getContacts);
router.get('/:id', getContactById);
router.delete('/:id', deleteContact);
router.post('/', getUserContactsByEmail);
router.post('/add', addContact);
router.patch('/:id', updateContact);

export default router;