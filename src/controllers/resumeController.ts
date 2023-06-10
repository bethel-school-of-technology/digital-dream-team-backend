import { RequestHandler } from "express";
import { Resume, IResume } from "../models/resume";
import { IUser } from "../models/user";
import { verifyUser } from "../services/auth";
import {Configuration, OpenAIApi} from "openai"
import Data from "../obj.json"

export const getAllResumes: RequestHandler = async (req, res, next) => {
    let user: IUser | null = await verifyUser(req, res, next);

    if (!user) {
        return res.status(403).send();
    }
    let resumeList = await Resume.find({userId: user.id}).exec()
    res.status(200).json(resumeList);
}

export const getOneResume: RequestHandler = async (req, res, next) => {
    let user: IUser | null = await verifyUser(req, res, next);
    
    if (!user) {
        return res.status(403).send();
    }
    let itemId = req.params.id;
    let resume = await Resume.findById(itemId);
    res.status(200).json(resume);
}

//working
export const addResume: RequestHandler = async (req, res, next) => {
    let user: IUser | null = await verifyUser(req, res, next);

    if (!user) {
        return res.status(403).send();
    }
    //req.body is blank on first go around

    let identity = req.body.identity //obj
    let skills = req.body.skills //array
    let jobs = req.body.jobs //[obj]
    let projects = req.body.projects //[obj]
    let educations = req.body.educations //[obj]
    let certs = req.body.certifications //[obj]
    const newResume: IResume = new Resume({
        //Add resume model data
        identity: identity,
        skills: skills,
        jobs: jobs,
        project: projects,
        education: educations,
        certification: certs,
        userId: user.id,
    });

    try {
        await newResume.save();
        res.status(201).json(newResume);
    }
    catch (err) {

        console.log(err)
        res.status(500).send(err);
    }
}

export const editResume: RequestHandler = async (req, res, next) => {
    let user: IUser | null = await verifyUser(req, res, next);

    if (!user) {
        return res.status(403).send();
    }

    let itemId = req.params.id;
    let identity = req.body.identity //obj
    let skills = req.body.skills //array
    let jobs = req.body.jobs //[obj]
    let projects = req.body.projects //[obj]
    let educations = req.body.educations //[obj]
    let certs = req.body.certifications //[obj]
    
    const updatedResume: IResume = new Resume({
        //Add resume model data
        _id: itemId,
        identity: identity,
        skills: skills,
        jobs: jobs,
        project: projects,
        education: educations,
        certification: certs,
        userId: user.id,
    });

    await Resume.findByIdAndUpdate(itemId, { $set: updatedResume })

    res.status(200).json(updatedResume);
}

export const deleteResume: RequestHandler = async (req, res, next) => {
    let user: IUser | null = await verifyUser(req, res, next);

    if (!user) {
        return res.status(403).send();
    }

    let itemId = req.params.id;
    let result = await Resume.findByIdAndDelete(itemId);
    res.status(200).json(result);
}




export const apiCall: RequestHandler = async (req, res, next) => {

    let user: IUser | null = await verifyUser(req, res, next);

    if (!user) {
        return res.status(403).send();
    }

    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_Key
      });

    const openai = new OpenAIApi(configuration);
    //console.log(req.body)
    let resume = req.body.resume
    let app = req.body.application

    
    if (app !== "" && resume !== ""){
        try {
            console.log("Ran")
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `You are a professional resume writer and are working to choose what information to include for a resume.\nThe following is the job application :\n{${app}}\n\nand the information for the resume \n{${resume}}\n\n\nUsing the information from the resume choose what is most relevant to the job application. you should always include at least 2 jobs, 2 projects,2 accomplishments with a project or job, a degree and any relevant certifications. If there are fewer than required jobs, accomplishments  projects, degrees or certifications, fill out as much as you can. Do not change the resume information. and do not output information from the application.\n\n output will be valid JSON of the form {\n  \"identity\": { \"first\" : \"\", \"last\" : \"\", \"phone\" : \"\", \"title\" : \"\",\"email\" : \"\", \"linkedin\" : \"\"},\n  \"skills\" : [],\n  \"jobs\" : [ { \"title\" : \"\", \"company\": \"\", \"startdate\" : \"\", \"enddate\" : \"\",\"accomplishments\" : []}],\n  \"projects\" : [{ \"title\" : \"\", \"startdate\" : \"\", \"enddate\" : \"\",\"accomplishments\" : [] }],\n  \"educations\" : [{\"school\": \"\",\"degree\" : \"\", \"date\" : \"\"}],\n  \"certifications\" :[{ \"certification\" : \"\",\"provider\" : \"\",\"date\" : \"\"}]\n}\n`,
            temperature: 0.0,
            max_tokens: 1000,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
          })
          console.log(response.data.choices[0])
        //respond with generated resume
        res.status(200).json(response.data.choices[0]);
          return
        } catch(err){
        console.log("Openai has thrown an error: ", err)
        }
    } 
    //res.status(200).json({"test": "test"})
    res.status(500).send("error, you shouldnt be seeing this");
    

}