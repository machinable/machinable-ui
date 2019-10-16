import React, { Component } from 'react';
import { Card } from 'turtle-ui';
import Usage from './Usage';

import API from '../../../client/';

class Billing extends Component {
	constructor(props) {
		super(props);

		this.state = {
            user: undefined,
            tiers: undefined,
			errors: [],
			loading: true
		}
    }
    
    requestError = (error) => {
		this.setState({loading: false, errors: [error.data.error]});
	}

	receivedUser = (response) => {
		this.setState({user: response.data.user}, this.getTiers);
    }
    
    receivedTiers = (response) => {
		this.setState({tiers: response.data.tiers, loading: false}, this.getUsage);
    }
    
	getUser = () => {
		API.user().get(this.receivedUser, this.requestError);
    }
    
    getTiers = () => {
		API.user().tiers(this.receivedTiers, this.requestError);
    }
    
	componentDidMount = () => {
		this.getUser();
	}
	
	renderPlans() {
		const { tiers: plans, user } = this.state;

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
								key={plan.name}
								classes={"hover click project-hover " + (plan.id === user.app_tier ? "information" : "no-border")}>
								<h3 className="align-center no-margin text-400">{plan.name} - <span className="text-muted">&nbsp;${plan.cost}</span></h3>
								<br/>
								<h2 className="align-center no-margin">{plan.requests.toLocaleString()}</h2>
								<span className="align-center text-muted text-small">Requests / hour</span>
								<br/>
								<h2 className="align-center no-margin">{plan.projects}</h2>
								<span className="align-center text-muted text-small">Projects</span>
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

	render() {
		return this.state.loading === true ? <></> : this.renderPlans();
	}
}

export default Billing;