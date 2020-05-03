import _ from 'lodash';
import { connect } from 'react-redux';
import { useForm } from "react-hook-form";
import { Redirect } from 'react-router-dom';
import React, { useContext, FC } from 'react';

import './Join.style.css';
import { User } from '../../redux/Auth/Auth.type';
import { SocketContext, SocketContextType } from '../../contexts/SocketContext';

type JoinProps = {
    user: User;
};

export type JoinFormData = {
    email: string;
    channel: string;
    username: string;
};

const Join: FC<JoinProps> = ({ user }) => {
    const { joinChannel } = useContext<SocketContextType>(SocketContext);
    const { register, handleSubmit, watch, errors } = useForm<JoinFormData>();

    const onSubmit = (data: JoinFormData) => {
        joinChannel(data);
    }

    if (!_.isEmpty(user)) {
        return <Redirect to={{ pathname: "/" }}/>
    }

    return (
        <div className="limiter">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-container">
                    <h1>
                        Register
                    </h1>
                    <p>
                        Please fill in this form to create an account.
                    </p>
                    <hr/>

                    <label><b>Username</b></label>
                    <input className="form-input" type="text" placeholder="Enter Username" name="username" ref={register}/>

                    <label><b>Email</b></label>
                    <input className="form-input" type="text" placeholder="Enter Email" name="email" ref={register}/>

                    <label><b>Channel</b></label>
                    <input className="form-input" type="text" placeholder="Enter Channel" name="channel" ref={register}/>

                    <button type="submit" className="registerbtn">Join</button>
                </div>
            </form>
        </div>
    )
};

/**
 * Map State to Props
 * 
 * @param state {Object}
 */
const mapStateToProps = (state: any) => ({
    user: state.auth.user,
});

export default connect(mapStateToProps)(Join);