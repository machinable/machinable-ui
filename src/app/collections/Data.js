import React, { Component } from 'react';
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
		console.log(response);
	}

	dataSuccess = (response) => {
		this.setState({items: response.data.items});
	}

	getData = () => {
		Machinable.collections().data().list(this.state.path, this.dataSuccess, this.dataError);
	}

	componentDidMount = () => {		
		this.getData();
	}

	render() {
		return (
			<div>
				<ReactJson collapsed={1} name={this.state.path} iconStyle="square" src={this.state.items} />
				<br/>
			</div>
		  );
	}
}

class Data extends Component {

	constructor(props) {
        super(props);
        this.state = {
			collections: [],
			data: {}
		}
	}

	colError = (response) => {
		console.log(response)
	}

	colSuccess = (response) => {
		this.setState({collections: response.data.items})
	}

	getCollections = () => {
		Machinable.collections().list(this.colSuccess, this.colError);
	}

	componentDidMount = () => {		
		this.getCollections();
	}

	render() {
		return (
			<div>
				{/* <ReactJson name={false} iconStyle="square" src={this.state.data} /> */}
				{this.state.collections.map(function(col, idx){
					return (
						<Dat path={col.name}/>
					)
				}, this)}
			</div>
		  );
	}
}


export default Data;