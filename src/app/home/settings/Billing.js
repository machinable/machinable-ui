import React, { Component } from 'react';
import { Card } from 'turtle-ui';
import Usage from './Usage';

class Billing extends Component {

	render() {

		const plans = [
			{"name": "Free", "min": 500, "resources": 6, "storage": "256 MB", "price": "0", "active": true},
			// {"name": "Dev", "min": 2000, "resources": 25, "storage": "5 GB", "price": "5", "active": false},
			// {"name": "Pro", "min": 10000, "resources": "Unlimited", "storage": "25 GB", "price": "20", "active": false},
		];

		return (
			<div className="grid grid-1">
				<h4 className="text-muted border-bottom">Usage</h4>
				<div className="grid grid-3 padding-top">
					<Usage/>
				</div>

				<br/>
				<h4 className="text-muted border-bottom">Plans</h4>
				<div className="grid grid-4 padding-top">
					{plans.map(function(plan){
						return (
							<Card 
								classes={"hover click project-hover " + (plan.active ? "information" : "no-border")}>
								<h3 className="align-center no-margin text-400">{plan.name} - <span className="text-muted">&nbsp;${plan.price}</span></h3>
								<br/>
								<h2 className="align-center no-margin">{plan.min.toLocaleString()}</h2>
								<span className="align-center text-muted text-small">Requests / hour</span>
								<br/>
								<h2 className="align-center no-margin">{plan.resources}</h2>
								<span className="align-center text-muted text-small">API Resources</span>
								<br/>
								<h2 className="align-center no-margin">{plan.storage}</h2>
								<span className="align-center text-muted text-small">Storage</span>
							</Card>
						)
					})}
				</div>

				<br/>
				<h4 className="text-muted border-bottom margin-bottom-none">Billing</h4>
				<div className="padding-top">
					<div className="grid grid-1">
						<div className="col-2 background-content padding vertical-align">
							<span>no payment method</span>
						</div>
					</div>
				</div>

				<br/>
			</div>
		  );
	}
}

export default Billing;