import React, { Component } from 'react';
import { Table } from 'turtle-ui';
import Loader from '../../components/Loader';

class Logs extends Component {

	constructor(props) {
        super(props);
		this.state = {
			loading: true
		}
	}

	componentDidMount = () => {		
		this.setState({loading: false});
	}

	render() {
		var logValues = [
			[<div className="text-small"><span className="text-400">login</span><span className="text-muted"> - originated from 208.54.90.139</span></div>, <div className="text-small">user: nsjostrom</div>, <div className="text-small text-muted text-right">12 days ago</div>],
			[<div className="text-small"><span className="text-400">collection.created</span><span className="text-muted"></span></div>, <div className="text-small">user: nsjostrom</div>, <div className="text-small text-muted text-right">12 days ago</div>],
			[<div className="text-small"><span className="text-400">collection.created</span><span className="text-muted"></span></div>, <div className="text-small">api token: Sample Token Name</div>, <div className="text-small text-muted text-right">12 days ago</div>],
			[<div className="text-small"><span className="text-400">definition.created</span><span className="text-muted"></span></div>, <div className="text-small">user: nsjostrom</div>, <div className="text-small text-muted text-right">12 days ago</div>],
			[<div className="text-small"><span className="text-400">resource.dog.created</span><span className="text-muted"></span></div>, <div className="text-small">user: nsjostrom</div>, <div className="text-small text-muted text-right">12 days ago</div>],
			[<div className="text-small"><span className="text-400">resource.cat.deleted</span><span className="text-muted"></span></div>, <div className="text-small">api token: Sample Token Name</div>, <div className="text-small text-muted text-right">12 days ago</div>],
			[<div className="text-small"><span className="text-400">collection.deleted</span><span className="text-muted"></span></div>, <div className="text-small">user: nsjostrom</div>, <div className="text-small text-muted text-right">12 days ago</div>],
		];

		return (
			<div className="grid grid-1">
				<Table
					classes="hover"
					values={logValues}
				/>
			</div>
		  );
	}
}


export default Logs;