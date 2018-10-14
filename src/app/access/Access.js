
import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Nav } from 'turtle-ui';
import Users from './Users';
import Tokens from './Tokens';

class Access extends Component {

	constructor(props) {
        super(props);
        
	}

	componentDidMount = () => {		

	}

	render() {
		var prefix = this.props.match.url;
		var collectionLinks = [
			{to: `${prefix}/users`, text: 'Users'},
			{to: `${prefix}/tokens`, text: 'API Tokens'}
		];
		return (
			<div>
				<div className="padding-side content-header">
					<h2 className="text-400 margin-bottom">Access</h2>
					<p className="text-muted margin-top margin-bottom-even-more">Manage users and API tokens of this project</p>
					<Nav 
						classes="horizontal link-underline"
						links={collectionLinks}
					/>
				</div>

				<div className="project-content">
                    <Switch>
                        <Route path={prefix+"/users"} component={Users} />
                        <Route path={prefix+"/tokens"} component={Tokens} />
                        <Redirect from="/" to={prefix+"/users"} />
                    </Switch>
				</div>
			</div>
		  );
	}
}

export default Access;