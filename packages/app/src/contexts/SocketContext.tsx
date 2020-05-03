import io from 'socket.io-client';
import { useDispatch } from 'react-redux';
import React, { createContext, useState } from 'react';

import { SocketEvents } from '../utils/Events';
import { User } from '../redux/Auth/Auth.type';
import { join } from '../redux/Auth/Auth.action';
import { Channel } from '../redux/Channel/Channel.type';
import { store } from '../redux/Channel/Channel.action';
import { Message } from '../redux/Message/Message.type';
import { addMessage, populateMessages } from '../redux/Message/Message.action';
import { JoinChannelPayloadType, ErrorType, SendMessagePayloadType } from '../utils/Types';

export type SocketContextType = {
    socket: SocketIOClient.Socket;

    isConnected: boolean;
    setConnected: Function;

    joinChannel: Function;
    sendMessage: Function;
}


export const SocketContext = createContext({} as SocketContextType);

export const URL: string = process.env.SOCKET_URL || "http://localhost:3001";

let socket: SocketIOClient.Socket;

const SocketProvider = ({ children }: any) => {
    let dispatch = useDispatch();
    const [isConnected, setConnected] = useState(false);
  
    if (!socket) {
        socket =io(URL);
    }
    
    /**
     * Join Channel
     * 
     * @param {JoinChannelPayloadType} payload 
     */
    const joinChannel = (payload: JoinChannelPayloadType) => {
        socket.emit(SocketEvents.USER_JOIN, JSON.stringify(payload));
    }

    /**
     * Send Message to Channel
     * 
     * @param {SendMessagePayloadType} payload 
     */
    const sendMessage = (payload: SendMessagePayloadType) => {
        socket.emit(SocketEvents.MESSAGE_SENT, JSON.stringify(payload));
    }

    /**
     * User Join Error
     */
    socket.on(SocketEvents.USER_JOINED_ERROR, (data: ErrorType) => {
        console.log("USER_JOINED_ERROR", data);
    });

    /**
     * User Join Success
     */
    socket.on(SocketEvents.USER_JOINED_SUCCESS, (data: User) => {
        dispatch(join(data));
    });

    /**
     * Channel Refresh
     */
    socket.on(SocketEvents.REFRESH_CHANNEL, (data: Channel) => {
        dispatch(store(data));
    });

    /**
     * Message Refresh
     */
    socket.on(SocketEvents.REFRESH_MESSAGE, (data: Message[]) => {
        console.log(data);
        dispatch(populateMessages(data));
    });

    socket.on(SocketEvents.RECEIVE_MESSAGE, (data: Message) => {
        dispatch(addMessage(data))
    });

    socket.on(SocketEvents.DISCONNECT, () => {
        console.log("DISCONNECT");
    });

    return (
        <SocketContext.Provider value={{
            socket,
            joinChannel,
            isConnected,
            sendMessage,
            setConnected,
        }}>
            { children }
        </SocketContext.Provider>
    )
};

export default SocketProvider;