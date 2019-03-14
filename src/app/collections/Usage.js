import React, { Component } from 'react';
import { connect } from 'react-redux';
import Empty from '../../images/usage.svg';
import Machinable from '../../client';
import ReactJson from 'react-json-view';

class Usage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loadingStats: true,
			loadingTimings: true,
			loadingCodes: true,
			slug: props.slug,
			stats: undefined,
			timings: undefined,
			codes: undefined
		}
	}

	statsError = (response) => {
		console.log(response);
		this.setState({loadingStats: false});
	}

	statsSuccess = (response) => {
		this.setState({loadingStats: false, stats: response.data});
	}

	loadStats = () => {
		Machinable.collections(this.state.slug).stats(this.statsSuccess, this.statsError)
	}

	timingsError = (response) => {
		console.log(response);
		this.setState({loadingTimings: false});
	}

	timingsSuccess = (response) => {
		this.setState({loadingTimings: false, timings: response.data});
	}

	loadTimings = () => {
		Machinable.collections(this.state.slug).timings(this.timingsSuccess, this.timingsError)
	}

	codesError = (response) => {
		console.log(response);
		this.setState({loadingCodes: false});
	}

	codesSuccess = (response) => {
		this.setState({loadingCodes: false, codes: response.data});
	}

	loadCodes = () => {
		Machinable.collections(this.state.slug).codes(this.codesSuccess, this.codesError)
	}

	componentDidMount = () => {
		this.loadStats();
		this.loadTimings();
		this.loadCodes();
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

	render() {
		return (
			<div className="grid grid-2">
				<div className="code"><ReactJson collapsed={2} name={false} iconStyle="square" src={this.state.codes} /></div>
				<div className="code"><ReactJson collapsed={2} name={false} iconStyle="square" src={this.state.stats} /></div>
				<div className="code"><ReactJson collapsed={2} name={false} iconStyle="square" src={this.state.timings} /></div>
			</div>
		  );
	}
}

// redux
function mapStateToProps(state) {
	return {
		slug: state.project_slug
	};
}
  
export default connect(mapStateToProps)(Usage);
