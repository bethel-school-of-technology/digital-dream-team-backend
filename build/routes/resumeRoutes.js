"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const resumeController_1 = require("../controllers/resumeController");
const auth_1 = require("../services/auth");
const router = (0, express_1.Router)();
router.get('/', resumeController_1.getAllResumes, auth_1.verifyUser, (req, res) => {
    const userId = req.body.userId;
    res.json({ message: 'Protected route accessed!', userId });
});
router.get('/:id', resumeController_1.getOneResume, auth_1.verifyUser, (req, res) => {
    const userId = req.body.userId;
    res.json({ message: 'Protected route accessed!', userId });
});
router.post('/', resumeController_1.addResume, auth_1.verifyUser, (req, res) => {
    const userId = req.body.userId;
    res.json({ message: 'Protected route accessed!', userId });
});
router.put('/:id', resumeController_1.editResume, auth_1.verifyUser, (req, res) => {
    const userId = req.body.userId;
    res.json({ message: 'Protected route accessed!', userId });
});
router.delete('/:id', resumeController_1.deleteResume, auth_1.verifyUser, (req, res) => {
    const userId = req.body.userId;
    res.json({ message: 'Protected route accessed!', userId });
});
router.post('/generate', resumeController_1.apiCall, (req, res) => {
});
exports.default = router;
