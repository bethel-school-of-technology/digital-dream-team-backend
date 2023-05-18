"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Resume = void 0;
const mongoose_1 = require("mongoose");
const resumeSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    skills: {
        type: String,
        required: true
    },
    job: {
        type: String,
        required: true
    },
    project: {
        type: String,
        required: true
    },
    education: {
        type: String,
        required: true
    },
    certification: {
        type: String,
        required: true
    }
});
const Resume = (0, mongoose_1.model)('Resume', resumeSchema);
exports.Resume = Resume;
