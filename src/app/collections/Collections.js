import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Nav } from 'turtle-ui';
import Data from './Data';
import Usage from './Usage';

class Collections extends Component {

	constructor(props) {
        super(props);
        
	}

	componentDidMount = () => {		

	}

	render() {
		var prefix = this.props.match.url;
		var collectionLinks = [
			{to: `${prefix}/data`, text: 'Collections'},
			{to: `${prefix}/usage`, text: 'Usage'}
		];
		return (
			<div>
				<div className="padding-side content-header">
					<h2 className="text-400 margin-bottom">Collections</h2>
					<p className="text-muted margin-top margin-bottom-even-more">Use collections to store your project's unstructured JSON data</p>
					<Nav 
						classes="horizontal link-underline"
						links={collectionLinks}
					/>
				</div>

				<div className="project-content">
                    <Switch>
                        <Route path={prefix+"/data"} component={Data} />
                        <Route path={prefix+"/usage"} component={Usage} />
                        <Redirect from="/" to={prefix+"/data"} />
                    </Switch>
				</div>
			</div>
		  );
	}
}


export default Collections;