import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';
import { Provider } from 'react-redux'; 
import store from './store';
import createHistory from 'history/createBrowserHistory';
import Home from './containers/Home';
import Project from './containers/Project';

import './base.css';

const history = createHistory();

const App = () => (
	<Router history={history}>
		<Switch>
			{/* <Route path="/login" exact component={Login} />
			<Route path="/register" exact component={Register} /> */}

			<Route path="/home" component={Home} />
			<Route path="/project" component={Project} />

      		<Redirect from="/" to="project" />
		</Switch>
	</Router>
)

ReactDOM.render((
	<Provider store={store}>
		<App />
	</Provider>
), document.getElementById('root'));