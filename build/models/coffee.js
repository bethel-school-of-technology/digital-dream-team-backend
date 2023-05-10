"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Coffee = void 0;
const mongoose_1 = require("mongoose");
const coffeeSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});
const Coffee = (0, mongoose_1.model)('Coffee', coffeeSchema);
exports.Coffee = Coffee;
