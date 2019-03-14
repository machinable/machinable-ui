import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from '../../../components/Loader';
import Machinable from '../../../client';
import {Doughnut} from 'react-chartjs-2';
import './Usage.css';

class Requests extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: false,
			slug: props.slug,
			requests: undefined,
		}
	}
    
    renderStats = () => {
		const data = {
            labels: [
                'Used', 'Free'],
            datasets: [{
                data: [582, 418],
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
							14
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
