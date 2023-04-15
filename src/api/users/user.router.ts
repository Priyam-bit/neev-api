import { Router } from "express";
import { createUser, deleteUser, getUserById, getUsers, Login, updateUser } from "./user.controller";

const router = Router();

router.get('/', getUsers);
router.get('/:id', getUserById);
router.delete('/:id', deleteUser);
router.post('/register', createUser);
router.patch('/:id', updateUser);
router.post('/login', Login);

export default router;