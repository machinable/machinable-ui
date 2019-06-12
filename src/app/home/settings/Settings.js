import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Nav } from 'turtle-ui';
import API from '../../documentation/API';
import Examples from '../../documentation/Examples';
import Overview from '../../documentation/Overview';
import Account from './Account';
import Billing from './Billing';
import Security from './Security';
import Support from './Support';
import Tokens from './Tokens';

class Settings extends Component {
	render() {
		var prefix = this.props.match.url;
		var siteLinks = [
			{to: `${prefix}/account`, text: 'Account'},
			{to: `${prefix}/plan`, text: 'Plan'},
			{to: `${prefix}/security`, text: 'Security'},
			// {to: `${prefix}/apikeys`, text: 'API Keys'},
			{to: `${prefix}/support`, text: 'Support'}
		];

		return (
            <>
            <div className="page-header content-header margin-bottom-even-more">
                <div className="content-wrapper">
                    <h3 className="text-400 text-muted">Settings</h3>
					<Nav 
						classes="horizontal link-underline"
						links={siteLinks}
					/>
                </div>
            </div>
			<div className="home-page">
                <div className="page-content">
					<div className="content-wrapper">
						<Switch>
							<Route 
								path="/home/settings/account" 
								exact 
								component={() => <Account />}
								/>

							<Route 
								path="/home/settings/plan" 
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

				{/* DOCUMENTATION */}
                <div className="page-docs">
					<div className="content-wrapper">
                        <h4 className="text-more-muted text-600">DOCUMENTATION</h4>
                        <div className="grid grid-3">
                            <Overview />
                            <API />
                            <Examples />
                        </div>
                    </div>
                </div>
			</div>
			</>
		  );
	}
}

export default Settings;