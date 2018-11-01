import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, List, ListItem, Dropdown, Modal, Card, Button } from 'turtle-ui';
import Loader from '../../components/Loader';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faEllipsis from '@fortawesome/fontawesome-free-solid/faEllipsisV';
import Empty from '../../images/empty_canvas.svg';
import Machinable from '../../client';
import Statics from '../../Statics';
import ReactJson from 'react-json-view';
import moment from 'moment';

class Data extends Component {
	constructor(props) {
		super(props);
		this.state = {
			slug: props.slug,
			path: props.path,
			items: {}
		}
	}

	dataError = (response) => {
		console.log(response)
	}

	dataSuccess = (response) => {
		delete response.data["definition"];
		this.setState({items: response.data});
	}

	getData = () => {
		Machinable.resources(this.state.slug).data().list(this.state.path, this.dataSuccess, this.dataError);
	}

	componentDidMount = () => {		
		this.getData();
	}

	render() {
		return (
			<div>
				<h3 className="no-margin text-400">/api/{this.state.path}</h3>
				<div className="margin-top-more code">
					<ReactJson name={this.state.path} iconStyle="square" src={this.state.items} />
				</div>
			</div>
		);
	}
}

export default Data;