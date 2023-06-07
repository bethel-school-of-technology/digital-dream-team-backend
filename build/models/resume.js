"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Resume = void 0;
const mongoose_1 = require("mongoose");
const resumeSchema = new mongoose_1.Schema({
    identity: {
        first: {
            type: String,
            required: true
        },
        last: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: false
        },
        address: {
            type: String,
            required: false
        },
        phone: {
            type: String,
            required: false
        },
        email: {
            type: String,
            required: true
        },
        linkedIn: {
            type: String,
            required: false
        }
    },
    skills: [{
            type: String,
            required: false
        }],
    jobs: [{
            title: {
                type: String,
                required: false
            },
            company: {
                type: String,
                required: false
            },
            start: {
                type: String,
                required: false
            },
            end: {
                type: String,
                required: false
            },
            accomplishments: [{
                    type: String,
                    required: false
                }]
        }],
    project: [{
            title: {
                type: String,
                required: false
            },
            company: {
                type: String,
                required: false
            },
            start: {
                type: String,
                required: false
            },
            end: {
                type: String,
                required: false
            },
            accomplishments: [{
                    type: String,
                    required: false
                }]
        }],
    education: [{
            school: {
                type: String,
                required: false
            },
            degree: {
                type: String,
                required: false
            },
            dateAcquired: {
                type: String,
                required: false
            }
        }],
    certification: [{
            certification: {
                type: String,
                required: false
            },
            provider: {
                type: String,
                required: false
            },
            dateAcquired: {
                type: String,
                required: false
            }
        }],
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});
const Resume = (0, mongoose_1.model)('Resume', resumeSchema);
exports.Resume = Resume;
