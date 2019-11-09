import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Nav } from 'turtle-ui';
import Logs from './Logs';
import Sessions from './Sessions';

class Security extends Component {
	render() {
		var prefix = this.props.match.url;
		var collectionLinks = [
			{to: `${prefix}/logs`, text: 'Logs'},
			{to: `${prefix}/sessions`, text: 'Sessions'}
		];
		return (
			<>
				<div className="padding-side content-header">
					<h3 className="text-400 margin-bottom">Security</h3>
					<p className="text-muted margin-top margin-bottom-even-more">View activity logs and manage user sessions</p>
					<Nav 
						classes="horizontal link-underline"
						links={collectionLinks}
					/>
				</div>

				<div className="project-content page">
					<div className="page-content">
						<Switch>
							<Route path={prefix+"/logs"} component={Logs} />
							<Route path={prefix+"/sessions"} component={Sessions} />
							<Redirect from="/" to={prefix+"/logs"} />
						</Switch>
					</div>

					{/* DOCUMENTATION */}
					<div className="page-docs">
					</div>
				</div>
			</>
		  );
	}
}


export default Security;