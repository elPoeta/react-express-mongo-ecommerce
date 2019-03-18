import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';

import './index.css';
import App from './components/App';
import Home from './components/layout/pages/home/Home'
import About from './components/layout/pages/about/About';
import NotFound from './components/layout/pages/notFound/NotFound';
import SignUp from './components/auth/SignUp';
import Login from './components/auth/Login';

import store from './store';


import * as serviceWorker from './serviceWorker';



ReactDOM.render(<Provider store={store} >
    <BrowserRouter>
        <App>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/about' component={About} />
                <Route path='/signup' component={SignUp} />
                <Route path='/login' component={Login} />
                <Route path='/not-found' component={NotFound} />
                <Redirect to='not-found' />
            </Switch>
        </App>
    </BrowserRouter>
</Provider>, document.querySelector('#root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
