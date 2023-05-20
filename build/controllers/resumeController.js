"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteResume = exports.editResume = exports.addResume = exports.getOneResume = exports.getAllResumes = void 0;
const resume_1 = require("../models/resume");
const auth_1 = require("../services/auth");
const getAllResumes = async (req, res, next) => {
    let user = await (0, auth_1.verifyUser)(req, res, next);
    if (!user) {
        return res.status(403).send();
    }
    let resumeList = await resume_1.Resume.find({ userId: user.id }).exec();
    res.status(200).json(resumeList);
};
exports.getAllResumes = getAllResumes;
const getOneResume = async (req, res, next) => {
    let user = await (0, auth_1.verifyUser)(req, res, next);
    if (!user) {
        return res.status(403).send();
    }
    let itemId = req.params.id;
    let resume = await resume_1.Resume.findById(itemId);
    res.status(200).json(resume);
};
exports.getOneResume = getOneResume;
const addResume = async (req, res, next) => {
    let user = await (0, auth_1.verifyUser)(req, res, next);
    if (!user) {
        return res.status(403).send();
    }
    const newResume = new resume_1.Resume({
        //Add resume model data
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        title: req.body.title,
        address: req.body.address,
        phone: req.body.phone,
        email: req.body.email,
        skills: req.body.skills,
        job: req.body.job,
        project: req.body.project,
        education: req.body.education,
        certification: req.body.certification,
        userId: user.id,
    });
    try {
        await newResume.save();
        res.status(201).json(newResume);
    }
    catch (err) {
        res.status(500).send(err);
    }
};
exports.addResume = addResume;
const editResume = async (req, res, next) => {
    let user = await (0, auth_1.verifyUser)(req, res, next);
    if (!user) {
        return res.status(403).send();
    }
    let itemId = req.params.id;
    const updatedResume = new resume_1.Resume({
        // Add resume model data
        _id: itemId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        title: req.body.title,
        address: req.body.address,
        phone: req.body.phone,
        email: req.body.email,
        skills: req.body.skills,
        job: req.body.job,
        project: req.body.project,
        education: req.body.education,
        certification: req.body.certification,
        userId: user.id,
    });
    await resume_1.Resume.findByIdAndUpdate(itemId, { $set: updatedResume });
    res.status(200).json(updatedResume);
};
exports.editResume = editResume;
const deleteResume = async (req, res, next) => {
    let user = await (0, auth_1.verifyUser)(req, res, next);
    if (!user) {
        return res.status(403).send();
    }
    let itemId = req.params.id;
    let result = await resume_1.Resume.findByIdAndDelete(itemId);
    res.status(200).json(result);
};
exports.deleteResume = deleteResume;
