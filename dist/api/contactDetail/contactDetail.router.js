"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contactDetail_controller_1 = require("./contactDetail.controller");
const router = (0, express_1.Router)();
router.get('/all', contactDetail_controller_1.getContacts);
router.get('/:id', contactDetail_controller_1.getContactById);
router.delete('/:id', contactDetail_controller_1.deleteContact);
router.post('/', contactDetail_controller_1.getUserContactsByEmail);
router.post('/add', contactDetail_controller_1.addContact);
router.patch('/:id', contactDetail_controller_1.updateContact);
exports.default = router;
