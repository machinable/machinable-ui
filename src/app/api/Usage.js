import React, { Component } from 'react';
import Empty from '../../images/usage.svg';

class Usage extends Component {
	render() {
		return (
			<div className="text-center">
				<h2 className="text-center">No data</h2>
			    <img src={Empty} alt="" className="empty-state-sm"/>
				<h3 className="text-center text-muted">Usage will appear once requests are made and data exists</h3>
			</div>
		  );
	}
}


export default Usage;