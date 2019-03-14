import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from '../../../components/Loader';
import Machinable from '../../../client';
import {Doughnut} from 'react-chartjs-2';
import './Usage.css';

const LIMIT_REQUESTS = 1000;
const LIMIT_TEXT = "1000 requests";
 
class Requests extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			slug: props.slug,
			requests: undefined,
		}
	}

	aggegate = (data) => {
		var codes = data.status_codes;
		var total = 0;
		for(var i = 0; i < codes.length; i++) {
			var vals = codes[i].codes;
			for(var c in vals) {
				total += vals[c];
			}
		}

		return total;
	}

	codesError = (response) => {
		console.log(response);
		this.setState({loading: false});
	}

	codesSuccess = (response) => {
		var totalRequests = this.aggegate(response.data);
		this.setState({loading: false, requests: totalRequests});
	}

	loadCodes = () => {
		Machinable.resources(this.state.slug).codes(this.codesSuccess, this.codesError)
	}

	componentDidMount = () => {
		this.loadCodes();
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
		
        return (
            <div>
                <h4 className="text-muted text-400">Requests</h4>
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
            </div>
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
