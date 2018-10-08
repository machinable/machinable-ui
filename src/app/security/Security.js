import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Nav } from 'turtle-ui';
import Data from './Logs';
import Usage from './Sessions';

class Security extends Component {

	constructor(props) {
        super(props);
        
	}

	componentDidMount = () => {		

	}

	render() {
		var prefix = this.props.match.url;
		var collectionLinks = [
			{to: `${prefix}/logs`, text: 'Logs'},
			{to: `${prefix}/sessions`, text: 'Sessions'}
		];
		return (
			<div>
				<div className="padding-side content-header">
					<h2 className="text-400 margin-bottom">Security</h2>
					<p className="text-muted margin-top margin-bottom-even-more">View activity logs and manage user sessions</p>
					<Nav 
						classes="horizontal link-underline"
						links={collectionLinks}
					/>
				</div>

				<div className="project-content">
                    <Switch>
                        <Route path={prefix+"/logs"} component={Data} />
                        <Route path={prefix+"/sessions"} component={Usage} />
                        <Redirect from="/" to={prefix+"/logs"} />
                    </Switch>
				</div>
			</div>
		  );
	}
}


export default Security;