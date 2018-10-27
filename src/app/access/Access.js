import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Nav } from 'turtle-ui';
import Users from './Users';
import Keys from './Keys';

class Access extends Component {
	render() {
		var prefix = this.props.match.url;
		var collectionLinks = [
			{to: `${prefix}/users`, text: 'Users'},
			{to: `${prefix}/keys`, text: 'API Keys'}
		];
		return (
			<React.Fragment>
				<div className="padding-side content-header">
					<h2 className="text-400 margin-bottom">Access</h2>
					<p className="text-muted margin-top margin-bottom-even-more">Manage users and API keys of this project</p>
					<Nav 
						classes="horizontal link-underline"
						links={collectionLinks}
					/>
				</div>

				<div className="project-content page">
					<div className="page-content">
						<Switch>
							<Route path={prefix+"/users"} component={Users} />
							<Route path={prefix+"/keys"} component={Keys} />
							<Redirect from="/" to={prefix+"/users"} />
						</Switch>
					</div>

					{/* DOCUMENTATION */}
					<div className="page-docs">
						<h4 className="text-more-muted text-600"><br/>DOCUMENTATION</h4>
						<div className="grid grid-3">
							<div>
								<a className="link text-400 text-information">Overview</a>
								<p className="text-muted">Read more about users and API keys.</p>
							</div>
							<div>
								<a className="link text-400 text-information">API</a>
								<p className="text-muted">Learn how to manage user JSON web tokens or make requests with API keys.</p>
							</div>
							<div>
								<a className="link text-400 text-information">Examples</a>
								<p className="text-muted">View the Machinable Github page to see example applications.</p>
							</div>
						</div>
					</div>
				</div>
			</React.Fragment>
		  );
	}
}

export default Access;