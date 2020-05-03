import { model, Schema, Document } from 'mongoose';
import { User } from './User.model';

export interface Channel extends Document {
    name: string;
    users: User[];
	created_at: Date;
    updated_at: Date;
    deleted_at: Date;
};

let ChannelSchema = new Schema({ 
    name: {
		type: String,
        unique: true,
        index: true,
        trim: true,
        sparse: true,
        required: true
    },
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }],
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
}, {collection: 'channels'});

export default model<Channel>('Channel', ChannelSchema);