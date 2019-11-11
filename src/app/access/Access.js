import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Nav } from 'turtle-ui';
import Querying from '../documentation/API';
import AccessDocs from '../documentation/Access';
import Examples from '../documentation/Examples';
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
					<h3 className="text-400 text-muted margin-top">Access</h3>
					
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
						<h4 className="text-more-muted text-600">DOCUMENTATION</h4>
						<div className="grid grid-3">
							<AccessDocs />
							<Querying />
							<Examples />
						</div>
					</div>
				</div>
			</React.Fragment>
		  );
	}
}

export default Access;