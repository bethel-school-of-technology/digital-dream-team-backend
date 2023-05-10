import { Document, Schema, Model, model } from 'mongoose';

interface IResume extends Document {
    // Determine resume data model 
    // name: string;
    // description: string;
    // price: number;
}

const resumeSchema: Schema = new Schema({
    // Input resume schema below
    // name: {
    //     type: String,
    //     required: true,
    //     unique: true
    // },
    // description: {
    //     type: String,
    //     required: true
    // },
    // price: {
    //     type: Number,
    //     required: true
    // }
});

const Resume: Model<IResume> = model('Resume', resumeSchema);

export { IResume, Resume };