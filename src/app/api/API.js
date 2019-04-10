import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Nav } from 'turtle-ui';
import Querying from '../documentation/API';
import ResourceDocs from '../documentation/Resources';
import Examples from '../documentation/Examples';
import Resources from './Resources';
import Usage from './Usage';

class API extends Component {
	componentDidMount = () => {		

	}

	render() {
		var prefix = this.props.match.url;
		var apiLinks = [
			{to: `${prefix}/resources`, text: 'Resources'},
			{to: `${prefix}/usage`, text: 'Usage'}
		];
		return (
			<React.Fragment>
				<div className="padding-side content-header">
					<div className="grid grid-4">
						<div className="col-3">
							<div>
								<h3 className="text-400 margin-bottom">API Resources</h3>
								<p className="text-muted margin-top margin-bottom-even-more">Create a new API for your application by defining HTTP resources using the JSON Schema standard</p>
							</div>
						</div>
						<div className="vertical-align align-right">
							{/* <Button classes="accent page-btn" >New Resource</Button> */}
						</div>
					</div>
					
					<Nav 
						classes="horizontal link-underline"
						links={apiLinks}
					/>
				</div>

				<div className="project-content page">
					<div className="page-content">
						<Switch>
							<Route path={prefix+"/resources"} component={Resources} />
							<Route path={prefix+"/usage"} component={Usage} />
							<Redirect from="/" to={prefix+"/resources"} />
						</Switch>
					</div>

					{/* DOCUMENTATION */}
					<div className="page-docs">
						<h4 className="text-more-muted text-600">DOCUMENTATION</h4>
						<div className="grid grid-3">
							<ResourceDocs />
							<Querying />
							<Examples />
						</div>
					</div>
					
				</div>
			</React.Fragment>
		  );
	}
}


export default API;