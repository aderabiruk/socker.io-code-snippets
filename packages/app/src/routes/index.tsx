import _ from 'lodash';
import React, { FC } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from "react-router-dom";

import { ROUTES } from './constants';
import { User } from '../redux/Auth/Auth.type';
import Join from '../containers/Join/Join.component';
import Chat from '../containers/Chat/Chat.component';
import NotFound from '../containers/NotFound/NotFound.component';

type RoutesProps = {
    user: User;
};

const PrivateRoute = ({ user, ...props}: any) => {
    const { children, ...rest } = props;
    return (
        <Route {...rest} render={({ location }) => !_.isEmpty(user) ? children : <Redirect to={{pathname: "/register", state: {from: location}}}/>}/>           
    )
};

const Routes: FC<RoutesProps> = ({ user }) => {
    return (
        <Switch>
            <PrivateRoute exact={true} path={ROUTES.HOME} user={user}>
                <Chat/>
            </PrivateRoute>
            <Route exact path={ROUTES.REGISTER}>
                <Join/>
            </Route>
            <Route component={NotFound}/>
        </Switch>
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

export default connect(mapStateToProps)(Routes);