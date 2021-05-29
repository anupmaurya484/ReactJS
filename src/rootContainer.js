import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import { configureStore } from './utils/configureStore';
const store = configureStore()

function onError(e) {
    console.log("Error=> ", e)
}

const RootContainer = () => {
    return (
        <Router basename="/">
            <Provider store={store} onError={onError}>
                <Route component={App} />
            </Provider>
        </Router>
    )
}

export default RootContainer;

