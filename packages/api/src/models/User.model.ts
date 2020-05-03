import mongooseHidden from 'mongoose-hidden';
import { model, Schema, Document } from 'mongoose';

export interface User extends Document {
    email: string;
    username: string;
    is_online: boolean;
    last_online: Date;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
};

let UserSchema = new Schema({ 
    username: {
		type: String,
        unique: true,
        index: true,
        trim: true,
        sparse: true,
        required: true
    },
    email: {
		type: String,
		required: true
    },
    is_online: {
		type: Boolean,
		default: false
    },
    last_online: {
        type: Date,
        default: Date.now,
    },
	created_at: {
		type: Date,
		default: Date.now,
    },
    updated_at: {
		type: Date,
		default: Date.now,
	},
	deleted_at: {
		type: Date,
		default: null
	}
}, {collection: 'users'});

UserSchema.plugin(mongooseHidden(), { hidden: { _id: false } });

export default model<User>('User', UserSchema);