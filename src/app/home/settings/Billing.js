import React, { Component } from 'react';
import { Card } from 'turtle-ui';

class Billing extends Component {

	render() {

		const plans = [
			{"name": "Free", "min": 500, "sites": 2, "assets": 4, "price": "0", "active": true},
			{"name": "Dev", "min": 2000, "sites": 4, "assets": 10, "price": "5", "active": false},
			{"name": "Pro", "min": 10000, "sites": 10, "assets": 25, "price": "20", "active": false}
		];

		return (
			<div className="grid grid-4">
				{plans.map(function(plan){
					return (
						<Card classes={"hover click " + (plan.active ? "information" : "")}>
							<h3 className="align-center no-margin text-400">{plan.name} - ${plan.price}</h3>
							<br/>
							<h2 className="align-center no-margin">{plan.min.toLocaleString()}</h2>
							<span className="align-center text-muted text-small">Requests / hour</span>
							<br/>
							<h2 className="align-center no-margin">{plan.sites}</h2>
							<span className="align-center text-muted text-small">API Resources</span>
							<br/>
							<h2 className="align-center no-margin">{plan.assets}</h2>
							<span className="align-center text-muted text-small">Collections</span>
						</Card>
					)
				})}
				
				<div className="col-3 margin-top-more">
					<div className="grid grid-1">
						<Card classes="no-border no-content-padding">
							<h3>Payment</h3>
							<Card
								classes="alert">
								no payment method
							</Card>
						</Card>
					</div>
				</div>
			</div>
		  );
	}
}

export default Billing;