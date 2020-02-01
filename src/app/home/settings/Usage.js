import React, { Component } from 'react';
import {Doughnut} from 'react-chartjs-2';

import API from '../../../client/';

class Usage extends Component {
	constructor(props) {
		super(props);

		this.state = {
            user: undefined,
            tiers: undefined,
            usage: undefined,
            active: undefined,
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
		this.setState({tiers: response.data.tiers}, this.getUsage);
    }
    
    receivedUsage = (response) => {
        const { user, tiers } = this.state;
        let active = {};
        for (let index = 0; index < tiers.length; index++) {
            const element = tiers[index];
            if (element["id"] === user["app_tier"]) {
                active = element;
            }
        }
		this.setState({active: active, usage: response.data, loading: false});
	}

	getUser = () => {
		API.user().get(this.receivedUser, this.requestError);
    }
    
    getTiers = () => {
		API.user().tiers(this.receivedTiers, this.requestError);
    }
    
    getUsage = () => {
		API.user().usage(this.receivedUsage, this.requestError);
	}

	componentDidMount = () => {
		this.getUser();
	}
    
    renderStats = () => {
        const { usage, active } = this.state;

        const cp = {
            backgroundColor: [
                '#1fb3c6',
                'transparent'
            ],
            borderColor: [
                '#1fb3c6',
                '#EFEFEF'
            ],
            hoverBackgroundColor: [
                '#1fb3c6',
                'transparent'
            ]
        };

        const requestsUsed = (usage['requests'] / active['requests']) * 100;
        const requestsLeft = requestsUsed - 100;
        const requestData = {
            labels: [
                'Used', 'Free'],
            datasets: [{
                data: [requestsUsed, requestsLeft],
                ...cp,
            }]
        };

        const projectsUsed = (usage['projects'] / active['projects']) * 100;
        const projectsLeft = projectsUsed - 100;
        const projectsData = {
            labels: [
                'Used', 'Free'],
            datasets: [{
                data: [projectsUsed, projectsLeft],
                ...cp,
            }]
        };

        const storageUsed = (usage['storage'] / active['storage']) * 100;
        const storageLeft = storageUsed - 100;
        const storagesData = {
            labels: [
                'Used', 'Free'],
            datasets: [{
                data: [storageUsed, storageLeft],
                ...cp,
            }]
        };

        return (
            <>
                <div>
                    <h4 className="text-muted text-400 no-margin-top">Requests</h4>
                    <div className="doughnut-wrapper" style={{"maxWidth": "275px"}}>
                        <div className="text-wrapper">
                            <h4 className="text-muted text-400 text-center">
                                {usage['requests']}
                                <br/>
                                <span className="text-small text-muted">of {active['requests']} requests</span>
                            </h4>
                        </div>
                        <Doughnut data={requestData} options={{legend: false, cutoutPercentage: 70}}/>
                    </div>
                </div>
                <div>
                    <h4 className="text-muted text-400 no-margin-top">Projects</h4>
                    <div className="doughnut-wrapper" style={{"maxWidth": "275px"}}>
                        <div className="text-wrapper">
                            <h4 className="text-muted text-400 text-center">
                                {usage['projects']}
                                <br/>
                                <span className="text-small text-muted">of {active['projects']} Projects</span>
                            </h4>
                        </div>
                        <Doughnut data={projectsData} options={{legend: false, cutoutPercentage: 70}}/>
                    </div>
                </div>
                <div>
                    <h4 className="text-muted text-400 no-margin-top">Storage</h4>
                    <div className="grid grid-2">
                        <div className=" doughnut-wrapper" style={{"maxWidth": "275px"}}>
                            <div className="text-wrapper">
                                <h4 className="text-muted text-center">
                                    <span className="text-400">{usage['storage']} MB</span>
                                    <br/>
                                    <span className="text-small text-muted">of {active['storage']} MB</span>
                                </h4>
                            </div>
                            <div><Doughnut data={storagesData} options={{legend: false, cutoutPercentage: 70}}/></div>
                        </div>
                    </div>      
                </div>        
            </>
        );
    }

	render() {
		return this.state.loading ? <></> : this.renderStats();
	}
}
  
export default Usage;
