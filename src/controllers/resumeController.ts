import { RequestHandler } from "express";
import { Resume, IResume } from "../models/resume";
import { IUser } from "../models/user";
import { verifyUser } from "../services/auth";


export const getAllResumes: RequestHandler = async (req, res, next) => {
    let resumeList = await Resume.find();
    res.status(200).json(resumeList);
}

export const getOneResume: RequestHandler = async (req, res, next) => {
    let itemId = req.params.id;
    let resume = await Resume.findById(itemId);
    res.status(200).json(resume);
}

export const addResume: RequestHandler = async (req, res, next) => {
    let user: IUser | null = await verifyUser(req);

    if (!user) {
        return res.status(403).send();
    }

    const newResume: IResume = new Resume({
        //Add resume model data
        // name: req.body.name,
        // description: req.body.description,
        // price: req.body.price
    });

    try {
        await newResume.save();
        res.status(201).json(newResume);
    }
    catch (err) {
        res.status(500).send(err);
    }
}

export const editResume: RequestHandler = async (req, res, next) => {
    let user: IUser | null = await verifyUser(req);

    if (!user) {
        return res.status(403).send();
    }

    let itemId = req.params.id;
    const updatedResume: IResume = new Resume({
        // Add resume model data
        // _id: itemId,
        // name: req.body.name,
        // description: req.body.description,
        // price: req.body.price
    });

    await Resume.findByIdAndUpdate(itemId, { $set: updatedResume })

    res.status(200).json(updatedResume);
}

export const deleteResume: RequestHandler = async (req, res, next) => {
    let user: IUser | null = await verifyUser(req);

    if (!user) {
        return res.status(403).send();
    }

    let itemId = req.params.id;
    let result = await Resume.findByIdAndDelete(itemId);
    res.status(200).json(result);
}