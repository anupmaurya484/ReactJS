import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import RootContainer from './rootContainer';
import 'react-hot-loader/patch';

const render = Component => {
    ReactDOM.render(
        <AppContainer>
            <Component />
        </AppContainer>,
        document.getElementById('root')
    );
}

render(RootContainer);
// ReactDOM.render(app, document.getElementById('root'));

