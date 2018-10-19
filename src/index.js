import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';
import { Provider } from 'react-redux'; 
import store from './store';
import createHistory from 'history/createBrowserHistory';
import Home from './containers/Home';
import User from './containers/User';
import Project from './containers/Project';

import './base.css';

const history = createHistory();

const App = () => (
	<Router history={history}>
		<Switch>
			<Route path="/login" component={User} />
			<Route path="/register" component={User} />

			<Route path="/home" component={Home} />
			<Route path="/project/:projectSlug" component={({history, match}) => <Project history={history} match={match}/>} />

      		<Redirect from="/" to="home" />
		</Switch>
	</Router>
)

ReactDOM.render((
	<Provider store={store}>
		<App />
	</Provider>
), document.getElementById('root'));