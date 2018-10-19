import React, { Component } from 'react';
import { connect } from 'react-redux';
import Machinable from '../../client';
import ReactJson from 'react-json-view';

class Dat extends Component {
	constructor(props) {
        super(props);
        this.state = {
			slug: props.slug,
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
		Machinable.resources(this.state.slug).data().list(this.state.path, this.dataSuccess, this.dataError);
	}

	componentDidMount = () => {		
		this.getData();
	}

	render() {
		return (
			<ReactJson collapsed={1} name={this.state.path} iconStyle="square" src={this.state.items} />
		  );
	}
}

class Data extends Component {

	constructor(props) {
        super(props);
        this.state = {
			resources: [],
			slug: props.slug,
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
		Machinable.resources(this.state.slug).list(this.resSuccess, this.resError);
	}

	componentDidMount = () => {		
		this.getResources();
	}

	render() {
		return (
			<div className="code">
				{/* <ReactJson name={false} iconStyle="square" src={this.state.data} /> */}
				{this.state.resources.map(function(res, idx){
					return (
						<Dat path={res.path_name} slug={this.state.slug}/>
					)
				}, this)}
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
  
export default connect(mapStateToProps)(Data);