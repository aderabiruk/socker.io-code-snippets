import { useForm } from "react-hook-form";
import React, { FC, useContext, useState, useEffect, ChangeEvent } from 'react';

import { User } from '../../redux/Auth/Auth.type';
import { Channel } from '../../redux/Channel/Channel.type';

import './MessagesFooter.style.css';
import { SocketContext } from '../../contexts/SocketContext';

type MessagesFooterProps = {
    user: User;    
    channel: Channel;
}

const MessagesFooter: FC<MessagesFooterProps> = ({ user, channel }) => {
    const [state, setState] = useState("")
    const { sendMessage } = useContext(SocketContext);
    const { register, handleSubmit, errors, setValue } = useForm();

    useEffect(() => {
        register({ name: 'message' });
    }, [register]);

    const onMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setState(e.target.value);
        setValue('message', e.target.value);
    }

    const onSubmit = (data: any) => {
        setState('');
        setValue('message', '');

        sendMessage({
            from: user._id,
            channel: channel._id,
            message: data.message,
        });
    }

    return (
        <div className="messages-footer">
            <form onSubmit={handleSubmit(onSubmit)}>
                <textarea className="form-control" placeholder="Type something..." name="message" onChange={(e: ChangeEvent<HTMLTextAreaElement>) => onMessageChange(e)} value={state}></textarea>
                <div className="messages-footer-control">
                    <button className="btn btn-primary">Send</button>
                </div>
            </form>
        </div>
    )
};

export default MessagesFooter;
