import Message from "../models/Message.model";

class MessageDAL {

    /**
     * Create Message
     * 
     * @param {string}  from
     * @param {string}  message
     */
    static create(from: string, channel: string, message: string): Promise<any> {
        return new Promise((resolve, reject) => {
            let newMessage = new Message();
            newMessage.from = from;
            newMessage.channel = channel;
            newMessage.message = message;
            newMessage.save((error, savedMessage) => {
                if (error) {
                    reject(error.message);
                }
                else {
                    resolve(savedMessage);
                }
            });
        });
    }

    /**
     * Find Many Messages
     * 
     * @param {any} query Query Object
     */
    static findMany(query: any): Promise<any> {
        return new Promise((resolve, reject) => {
            Message.find({...query, deleted_at: null}).populate("from").populate("channel").exec((error, messages) => {
                if (error) {
                    reject(error.message);
                }
                else {
                    resolve(messages);
                }
            });
        });
    }

    /**
     * Find a Message
     * 
     * @param {any} query Query Object
     */
    static findOne(query: any): Promise<any> {
        return new Promise((resolve, reject) => {
            Message.findOne({...query, deleted_at: null}).populate("from").populate("channel").exec((error, message) => {
                if (error) {
                    reject(error.message);
                }
                else {
                    resolve(message);
                }
            });
        });
    }
}

export default MessageDAL;