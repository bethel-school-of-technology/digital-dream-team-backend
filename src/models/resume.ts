import { Document, Schema, Model, model } from 'mongoose';
import { IUser } from './user';

interface Identity {
    firstName: string;
    lastName: string;
    title: string;
    address: string;
    phone: string;
    email: string;
    linkedIn?: string;
}

interface Skills {
    skills?: string[];
}

interface Jobs {
    title?: string;
    company?: string;
    start?: string;
    end?: string;
    accomplishments?: string;
}

interface Projects {
    title?: string;
    start?: string;
    end?: string;
    accomplishments?: string;
}

interface Education {
    school?: string;
    degree?: string;
    dateAcquired?: string;
}

interface Certifications {
    certification?: string;
    provider?: string;
    dateAcquired?: string;
}

interface IResume extends Document {
   identity: Identity;
   skills : Skills[];
   jobs: Jobs[];
   project: Projects[];
   education: Education[];
   certification: Certifications[];
   userId: IUser['_id'];
}

const resumeSchema: Schema = new Schema({
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
            required: true
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
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Resume: Model<IResume> = model('Resume', resumeSchema);

export { IResume, Resume };