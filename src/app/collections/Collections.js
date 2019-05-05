import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Nav } from 'turtle-ui';
import Querying from '../documentation/API';
import CollectionDocs from '../documentation/Collections';
import Examples from '../documentation/Examples';
import List from './List';
import Usage from './Usage';

class Collections extends Component {

	componentDidMount = () => {		

	}

	render() {
		var prefix = this.props.match.url;
		var collectionLinks = [
			{to: `${prefix}/list`, text: 'Collections'},
			{to: `${prefix}/usage`, text: 'Usage'}
		];
		return (
			<React.Fragment>
				<div className="padding-side content-header">
					<h3 className="text-400 margin-bottom">Collections</h3>
					<p className="text-muted margin-top margin-bottom-even-more">Use collections to store your project's unstructured JSON data</p>
					<Nav 
						classes="horizontal link-underline"
						links={collectionLinks}
					/>
				</div>

				<div className="project-content page">
					<div className="page-content">
						<Switch>
							<Route path={prefix+"/list"} component={List} />
							<Route path={prefix+"/usage"} component={Usage} />
							<Redirect from="/" to={prefix+"/list"} />
						</Switch>
					</div>

					{/* DOCUMENTATION */}
					<div className="page-docs">
						<h4 className="text-more-muted text-600">DOCUMENTATION</h4>
						<div className="grid grid-3">
							<CollectionDocs />
							<Querying />
							<Examples />
						</div>
					</div>
				</div>
			</React.Fragment>
		  );
	}
}


export default Collections;