import React, { Component } from 'react';
import Machinable from '../../client';
import ReactJson from 'react-json-view';

class Resources extends Component {

	constructor(props) {
		super(props);
		this.state = {
			resources: {}
		}
	}

	resError = (response) => {
		console.log(response)
	}

	resSuccess = (response) => {
		this.setState({resources: response.data});
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
				<ReactJson collapsed={3} name={false} displayDataTypes={false} iconStyle="square" src={this.state.resources} />
			</div>
		  );
	}
}


export default Resources;