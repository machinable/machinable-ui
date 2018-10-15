import React, { Component } from 'react';
import { Table, Button } from 'turtle-ui';
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

	getTablePageButtons = () => {
		var buttons = [];
		var selected = 2;
		var pages = 8;
		buttons.push(<Button classes="text plain btn-small">Previous</Button>)
		for(var i = 0; i < pages; i ++) {
			var color = i === selected ? "information" : "text plain";
			(function(th){
				var index = i;
				buttons.push(<Button classes={color + " btn-small"} >{i+1}</Button>)
			})(this);
		}
		buttons.push(<Button classes="text plain btn-small">Next</Button>)
		return buttons;
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

		var btns = this.getTablePageButtons();

		return (
			<div className="grid grid-1">
				<Table
					classes="hover"
					values={logValues}
				/>
				<div className="flex center">
					{btns}
				</div>
			</div>
		  );
	}
}


export default Logs;