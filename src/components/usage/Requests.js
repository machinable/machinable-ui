import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card } from 'turtle-ui';
import Loader from '../Loader';
import {Doughnut} from 'react-chartjs-2';
import './Usage.css';

const LIMIT_REQUESTS = 1000;
 
class Requests extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: false,
            slug: props.slug,
			requests: props.requests,
		}
	}
    
    renderStats = () => {
		var percentageUsed = (this.state.requests / LIMIT_REQUESTS) * 100;
        var percentageLeft = percentageUsed - 100;

		const data = {
            labels: [
                'Used', 'Free'],
            datasets: [{
                data: [percentageUsed, percentageLeft],
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
            }]
		};
        
        const { requests } = this.state;

        return (
            <>
            {!this.props.statistic && 
                <Card classes="m-card">
                    <h4 className="text-muted text-400 text-center">
                        Requests
                    </h4>
                    <div className="doughnut-wrapper">
                        <div className="text-wrapper">
                            <h4 className="text-muted text-400 text-center">
                                {this.state.requests}
                                <br/>
                                <span className="text-small text-muted">of 1000 requests</span>
                            </h4>
                        </div>
                        <Doughnut data={data} options={{legend: false, cutoutPercentage: 70}}/>
                    </div>
                </Card>
            }
            {this.props.statistic && 
                <Card classes="m-card">
                    <h4 className="text-muted text-400 text-center">
                        Request Count
                    </h4>
                    <div>
                        <h2 className="text-center margin-bottom-none">
                            <span>{requests}</span><span className="text-xsmall text-more-muted"> / {LIMIT_REQUESTS}</span>
                        </h2>
                    </div>
                </Card>
            }
            </>
        );
    }

	render() {
        var result = this.renderStats();
        result = this.state.loading ? <Loader loading={this.state.loading} /> : result;
		return result;
	}
}

// redux
function mapStateToProps(state) {
	return {
		slug: state.project_slug
	};
}
  
export default connect(mapStateToProps)(Requests);
