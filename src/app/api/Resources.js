import React, { Component } from 'react';
import Machinable from '../../client';

class Resources extends Component {

	constructor(props) {
		super(props);
		this.state = {
			resources: []
		}
	}

	resError = (response) => {
		console.log(response)
	}

	resSuccess = (response) => {
		this.setState({resources: response.data.items});
	}

	getResources = () => {
		Machinable.resources().list(this.resSuccess, this.resError);
	}

	componentDidMount = () => {		
		this.getResources();
	}

	render() {
		return (
			<div>
				<pre>
					{JSON.stringify(this.state.resources, null, 2)}
				</pre>
			</div>
		  );
	}
}


export default Resources;