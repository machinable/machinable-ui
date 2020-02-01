import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from '../../components/Loader';
import Machinable from '../../client';
import Empty from '../../images/usage.svg';
import Timings from '../../components/usage/Timings';
import Codes from '../../components/usage/Codes';
import Requests from '../../components/usage/Requests';

class Usage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			slug: props.slug,
			stats: undefined,
			requests: undefined,
			totalRequests: 0
		}
	}

	statsError = (response) => {
		console.log(response);
		this.setState({loading: false});
	}

	// statsSuccess = (response) => {
	// 	this.setState({stats: response.data}, this.loadUsage);
	// }

	usageSuccess = (response) => {
		var totalRequests = 0;
		var requests = response.data.items;
		if(requests) {
			for (const key in requests) {
				if (requests.hasOwnProperty(key)) {
					const element = requests[key];
					totalRequests += element.request_count;
				}
			}
		}
		this.setState({loading: false, requests: response.data.items, totalRequests: totalRequests});
	}

	// loadStats = () => {
	// 	Machinable.rootKeys(this.state.slug).stats(this.statsSuccess, this.statsError)
	// }

	loadUsage = () => {
		Machinable.rootKeys(this.state.slug).usage(this.usageSuccess, this.statsError)
	}

	componentDidMount = () => {
		this.loadUsage();
	}
	
	emptyState = () => {
		return (
			<div className="text-center">
				<h2 className="text-center">No data</h2>
			    <img src={Empty} alt="" className="empty-state-sm"/>
				<h3 className="text-center text-muted">Usage will appear once requests are made and data exists</h3>
			</div>
		);
	}

	renderUsage = () => {
		return (
			<div className="grid grid-1">
				<span className="text-small text-400 text-more-muted">Usage metrics for the last 1 hour</span>
				<div className="grid grid-5">
					<Requests requests={this.state.totalRequests} statistic={true}/>
					{/* <Stats stats={this.state.stats} /> */}
				</div>
				<Codes codes={this.state.requests}/>
				<Timings timings={this.state.requests}/> 
				<br/>
			</div>
		);
	}

	render() {
		const { requests, loading } = this.state;
		var result = (requests && Object.keys(requests).length) ? this.renderUsage() : this.emptyState();
		result = loading ? <Loader loading={loading} /> : result;
		return result;
	}
}

// redux
function mapStateToProps(state) {
	return {
		slug: state.project_slug
	};
}
  
export default connect(mapStateToProps)(Usage);
