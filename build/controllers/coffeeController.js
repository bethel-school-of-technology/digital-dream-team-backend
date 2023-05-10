"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCoffee = exports.editCoffee = exports.addCoffee = exports.getOneCoffee = exports.getAllCoffee = void 0;
const coffee_1 = require("../models/coffee");
const auth_1 = require("../services/auth");
const getAllCoffee = async (req, res, next) => {
    let coffeeList = await coffee_1.Coffee.find();
    res.status(200).json(coffeeList);
};
exports.getAllCoffee = getAllCoffee;
const getOneCoffee = async (req, res, next) => {
    let itemId = req.params.id;
    let coffee = await coffee_1.Coffee.findById(itemId);
    res.status(200).json(coffee);
};
exports.getOneCoffee = getOneCoffee;
const addCoffee = async (req, res, next) => {
    let user = await (0, auth_1.verifyUser)(req);
    if (!user) {
        return res.status(403).send();
    }
    const newCoffee = new coffee_1.Coffee({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price
    });
    try {
        await newCoffee.save();
        res.status(201).json(newCoffee);
    }
    catch (err) {
        res.status(500).send(err);
    }
};
exports.addCoffee = addCoffee;
const editCoffee = async (req, res, next) => {
    let user = await (0, auth_1.verifyUser)(req);
    if (!user) {
        return res.status(403).send();
    }
    let itemId = req.params.id;
    const updatedCoffee = new coffee_1.Coffee({
        _id: itemId,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price
    });
    await coffee_1.Coffee.findByIdAndUpdate(itemId, { $set: updatedCoffee });
    res.status(200).json(updatedCoffee);
};
exports.editCoffee = editCoffee;
const deleteCoffee = async (req, res, next) => {
    let user = await (0, auth_1.verifyUser)(req);
    if (!user) {
        return res.status(403).send();
    }
    let itemId = req.params.id;
    let result = await coffee_1.Coffee.findByIdAndDelete(itemId);
    res.status(200).json(result);
};
exports.deleteCoffee = deleteCoffee;
