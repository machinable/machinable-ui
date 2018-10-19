import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Nav } from 'turtle-ui';
import Resources from './Resources';
import Data from './Data';
import Usage from './Usage';

class API extends Component {

	constructor(props) {
		super(props);
		this.state = {
			slug: props.projectSlug
		}
	}

	componentDidMount = () => {		

	}

	render() {
		var prefix = this.props.match.url;
		var apiLinks = [
			{to: `${prefix}/resources`, text: 'Resources'},
			{to: `${prefix}/data`, text: 'Data'},
			{to: `${prefix}/usage`, text: 'Usage'}
		];
		return (
			<React.Fragment>
				<div className="padding-side content-header">
					<h2 className="text-400 margin-bottom">API Resources</h2>
					<p className="text-muted margin-top margin-bottom-even-more">Create a new API for your application by defining HTTP resources using the JSON Schema standard</p>
					<Nav 
						classes="horizontal link-underline"
						links={apiLinks}
					/>
				</div>

				<div className="project-content page">
					<div className="page-content">
						<Switch>
							<Route path={prefix+"/resources"} render={(props) => <Resources {...props} projectSlug={this.state.slug}/>} />
							<Route path={prefix+"/data"} component={Data} />
							<Route path={prefix+"/usage"} component={Usage} />
							<Redirect from="/" to={prefix+"/resources"} />
						</Switch>
					</div>

					{/* DOCUMENTATION */}
					<div className="page-docs">
						<h4 className="text-more-muted text-600"><br/>DOCUMENTATION</h4>
						<div className="grid grid-3">
							<div>
								<a className="link text-400 text-information">Overview</a>
								<p className="text-muted">Understand what API Resource Definitions are and how to manage them.</p>
							</div>
							<div>
								<a className="link text-400 text-information">Resources API</a>
								<p className="text-muted">Configure definitions with our RESTful API.</p>
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


export default API;