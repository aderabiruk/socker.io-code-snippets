import React from 'react';
import ReactDOM from 'react-dom';
import { Store } from './redux/Store';
import { Provider } from 'react-redux';
import SocketProvider from './contexts/SocketContext';

import * as serviceWorker from './serviceWorker';

import './index.css';
import App from './App';

ReactDOM.render(
    <Provider store={Store}>
        <SocketProvider>
            <App/>
        </SocketProvider>  
    </Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();
