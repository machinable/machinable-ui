import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Nav } from 'turtle-ui';
import Resources from './Resources';
import Data from './Data';
import Usage from './Usage';

class API extends Component {

	constructor(props) {
        super(props);
        
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
			<div>
				<div className="padding-side content-header">
					<h2 className="text-400 margin-bottom">API Resources</h2>
					<p className="text-muted margin-top margin-bottom-even-more">Create a new API for your application by defining HTTP resources using the JSON Schema standard</p>
					<Nav 
						classes="horizontal link-underline"
						links={apiLinks}
					/>
				</div>

				<div className="project-content">
                    <Switch>
                        <Route path={prefix+"/resources"} component={Resources} />
                        <Route path={prefix+"/data"} component={Data} />
                        <Route path={prefix+"/usage"} component={Usage} />
                        <Redirect from="/" to={prefix+"/resources"} />
                    </Switch>
				</div>
			</div>
		  );
	}
}


export default API;