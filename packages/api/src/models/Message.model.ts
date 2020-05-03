import { model, Schema, Document } from 'mongoose';

export interface Message extends Document {
	from: string;
	channel: string;
	message: string;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
};

let MessageSchema = new Schema({ 
    from: {
		type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
	},
	channel: {
		type: Schema.Types.ObjectId,
        ref: 'Channel',
        required: true,
    },
	message: {
		type: String,
		required: true
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
}, {collection: 'messages'});

export default model<Message>('Message', MessageSchema);