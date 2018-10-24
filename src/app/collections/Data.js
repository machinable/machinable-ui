import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, List, ListItem, Dropdown } from 'turtle-ui';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faEllipsis from '@fortawesome/fontawesome-free-solid/faEllipsisV';
import Machinable from '../../client';
import ReactJson from 'react-json-view';
import moment from 'moment';

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
		var collections = this.state.collections.map(function(col, idx){
			return [
				<div>
					<h3 className="text-400 no-margin margin-bottom-less">{col.name}</h3>
					<div className="text-muted text-small">https://{this.state.slug}.mchbl.app/collections/{col.name}</div>
				</div>,
				<div>
					<div>100 MB</div>
					<div className="text-small">14 items</div>
				</div>,
				<div>{moment(new Date()).fromNow()}</div>,
				<div className="align-right vertical-align">
					<Dropdown 
						showIcon={false}
						width={150}
						buttonText={<FontAwesomeIcon className="text-muted" icon={faEllipsis} />}
						buttonClasses="text plain vertical-align"
						classes="align-items-right">
						<div className="grid grid-1">
							<List>
								<ListItem title={"Data"}/>
								<ListItem title={"Help"}/>
								<hr className="no-margin no-padding"/>
								<ListItem title={<div className="text-center text-danger text-400">Delete</div>}/>
							</List>
						</div>
					</Dropdown>
				</div>
			];
		}, this);
		return (
			<div>
				<Table 
					classes="m-table"
					headers={["Name", "Size", "Created", ""]}
					values={collections}
				/>
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