import React, { Component } from 'react';
import { Button } from 'turtle-ui';
import Machinable from '../../client';
import ReactJson from 'react-json-view';

class Dat extends Component {
	constructor(props) {
        super(props);
        this.state = {
			path: props.path,
			items: []
		}
	}

	dataError = (response) => {
		console.log(response)
	}

	dataSuccess = (response) => {
		this.setState({items: response.data.items});
	}

	getData = () => {
		Machinable.data().list(this.state.path, this.dataSuccess, this.dataError);
	}

	componentDidMount = () => {		
		this.getData();
	}

	render() {
		return (
			<div>
				<ReactJson collapsed={1} name={this.state.path} iconStyle="square" src={this.state.items} />
			</div>
		  );
	}
}

class Data extends Component {

	constructor(props) {
        super(props);
        this.state = {
			resources: [],
			data: {}
		}
	}

	resError = (response) => {
		console.log(response)
	}

	resSuccess = (response) => {
		// this.getData(response.data.items);
		this.setState({resources: response.data.items})
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
				{/* <ReactJson name={false} iconStyle="square" src={this.state.data} /> */}
				{this.state.resources.map(function(res, idx){
					return (
						<Dat path={res.path_name}/>
					)
				}, this)}
			</div>
		  );
	}
}


export default Data;