import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Nav } from 'turtle-ui';
import API from '../../documentation/API';
import Examples from '../../documentation/Examples';
import Overview from '../../documentation/Overview';
import Account from './Account';
import Password from './Password';
import Billing from './Billing';
import Security from './Security';
import Support from './Support';
import Tokens from './Tokens';

class Settings extends Component {
	render() {
		var prefix = this.props.match.url;
		var siteLinks = [
			{to: `${prefix}/account`, text: 'Account'},
			{to: `${prefix}/password`, text: 'Password'},
			{to: `${prefix}/billing`, text: 'Billing'},
			{to: `${prefix}/security`, text: 'Security'},
			{to: `${prefix}/apikeys`, text: 'API Keys'},
			{to: `${prefix}/support`, text: 'Support'}
		];

		return (
			<div className="page">
                <div className="page-content home-content">
					<div className="grid grid-2 margin-bottom">
						<h2 className="margin no-margin-left">User Settings</h2>
						<div className="align-right">
						</div>
					</div>
					<div className="grid grid-5">
						<Nav 
							classes="vertical grid col-1 hidden-small"
							links={siteLinks}
						/>
						<Nav 
							classes="margin-bottom-more horizontal link-underline underline align-center show-small col-4"
							links={siteLinks}
						/>
						<div className="col-4">
							<Switch>
								
								<Route 
									path="/home/settings/account" 
									exact 
									component={() => <Account />}
									/>

								<Route 
									path="/home/settings/password" 
									exact 
									component={() => <Password />}
									/>

								<Route 
									path="/home/settings/billing" 
									exact 
									component={() => <Billing />}
									/>

								<Route 
									path="/home/settings/security" 
									exact 
									component={() => <Security />}
									/>
												
								<Route 
									path="/home/settings/apikeys" 
									exact 
									component={() => <Tokens />}
									/>

								<Route 
									path="/home/settings/support" 
									exact 
									component={() => <Support />}
									/>

								<Redirect from="/home/settings/" to="/home/settings/account" />
							</Switch>
						</div>
					</div>
				</div>

				{/* DOCUMENTATION */}
                <div className="page-docs">
                    <div>
                        <h4 className="text-more-muted text-600">DOCUMENTATION</h4>
                        <div className="grid grid-3">
                            <Overview />
                            <API />
                            <Examples />
                        </div>
                    </div>
                </div>
			</div>
		  );
	}
}

export default Settings;