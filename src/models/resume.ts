import { Document, Schema, Model, model } from 'mongoose';
import { IUser } from './user';

interface IResume extends Document {
   firstName: string;
   lastName: string;
   title: string;
   address: string;
   phone: string; 
   email: string;
   skills : string;
   job: string;
   project: string; 
   education: string;
   certification: string;
   userId: IUser['_id'];
}

const resumeSchema: Schema = new Schema({
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
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Resume: Model<IResume> = model('Resume', resumeSchema);

export { IResume, Resume };