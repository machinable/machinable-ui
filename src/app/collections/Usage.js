import React, { Component } from 'react';
import { connect } from 'react-redux';
import Empty from '../../images/usage.svg';
import Timings from './usage/Timings';
import Codes from './usage/Codes';
import Stats from './usage/Stats';
import Requests from './usage/Requests';

class Usage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			slug: props.slug
		}
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
			<div className="grid grid-1">
				<div className="grid grid-3">
					<Requests />
					<Stats />
				</div>
				<Codes />
				<Timings />
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
