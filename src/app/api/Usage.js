import React, { Component } from 'react';
import Empty from '../../images/usage.svg';

class Usage extends Component {

	constructor(props) {
        super(props);
        
	}

	componentDidMount = () => {		

	}

	render() {
		return (
			<div className="text-center text-muted">
				<h2 className="text-center no-margin-top">No data</h2>
			    <img src={Empty} className="empty-state-sm"/>
				<h3 className="text-center text-muted">Usage will appear once requests are made and data exists</h3>
			</div>
		  );
	}
}


export default Usage;