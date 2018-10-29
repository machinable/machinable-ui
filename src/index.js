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
import Errors from './containers/Error';
import Machinable from './client';

import './base.css';

// Add a 401 response interceptor
axios.interceptors.response.use(function (response) {
	return response;
}, function (error) {
	// console.log(error);
	// console.log(error.config);
	// console.log(error.response);
	if (401 === error.response.status && 
		error.response.data.error && 
		error.response.data.error == "invalid access token") {

		return Machinable.user().refreshToken()
				  .then((response) => {
					console.log("refreshed access token.")
					if(response) {
						Machinable.setAccessToken(response.data.access_token);
					  	error.config.headers.Authorization = "Bearer " + response.data.access_token;
					  	return axios.request(error.config);
					}
				  });
	} 
	else if (401 === error.response.status) {
		Machinable.user().logout(function(){
			history.push('/login');
		}, function(){
			history.push('/login');
		});
	} 
	else if (404 === error.response.status) {
		history.replace('/error/404');
	}
	else {
	  // return the actual error response and handle it explicitly
	  return Promise.reject(error.response);
	}
});

const history = createHistory();

const App = () => (
	<div>
		{/* <div className="text-warning padding-less text-center text-small">Machinable is in Alpha. Data will be cleared regularly.</div> */}
		<Router history={history}>
			<Switch>
				<Route path="/login" component={User} />
				<Route path="/register" component={User} />

				<Route path="/home" component={Home} />
				<Route path="/project/:projectSlug" component={({history, match}) => <Project history={history} match={match}/>} />

				<Route path="/error" component={Errors} />

				<Redirect from="/" to="home" />
			</Switch>
		</Router>
	</div>
)

ReactDOM.render((
	<Provider store={store}>
		<App />
	</Provider>
), document.getElementById('root'));