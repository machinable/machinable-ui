import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from '../../components/Loader';
import Machinable from '../../client';
import Empty from '../../images/usage.svg';
import Timings from './usage/Timings';
import Codes from './usage/Codes';
import Stats from './usage/Stats';
import Requests from './usage/Requests';

class Usage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			slug: props.slug,
			stats: undefined
		}
	}

	statsError = (response) => {
		console.log(response);
		this.setState({loading: false});
	}

	statsSuccess = (response) => {
		this.setState({loading: false, stats: response.data});
	}

	loadStats = () => {
		Machinable.resources(this.state.slug).stats(this.statsSuccess, this.statsError)
	}

	componentDidMount = () => {
		this.loadStats();
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
				<div className="grid grid-3">
					<Requests />
					<Stats stats={this.state.stats} />
				</div>
				<Codes />
				<Timings /> 
				<br/>
			</div>
		);
	}

	render() {
		var result = (this.state.stats && Object.keys(this.state.stats.resources).length) ? this.renderUsage() : this.emptyState();
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
  
export default connect(mapStateToProps)(Usage);
