import React, { Component } from 'react';
import { connect } from 'react-redux';
import Machinable from '../../client';
import ReactJson from 'react-json-view';

class Dat extends Component {
	constructor(props) {
        super(props);
        this.state = {
			path: props.path,
			slug: props.slug,
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
		Machinable.collections(this.state.slug).data().list(this.state.path, this.dataSuccess, this.dataError);
	}

	componentDidMount = () => {		
		this.getData();
	}

	render() {
		return (
			<ReactJson name={this.state.path} iconStyle="square" src={this.state.items} />
		  );
	}
}

class Data extends Component {

	constructor(props) {
        super(props);
        this.state = {
			collections: [],
			slug: props.slug,
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
		Machinable.collections(this.state.slug).list(this.colSuccess, this.colError);
	}

	componentDidMount = () => {		
		this.getCollections();
	}

	render() {
		return (
			<div className="code">
				{/* <ReactJson name={false} iconStyle="square" src={this.state.data} /> */}
				{this.state.collections.map(function(col, idx){
					return (
						<Dat path={col.name} slug={this.state.slug}/>
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