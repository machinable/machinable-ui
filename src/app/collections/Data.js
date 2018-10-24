import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, List, ListItem, Dropdown, Modal, Card, Button } from 'turtle-ui';
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
			data: {},
			deleteCollection: {},
			showDeleteModal: false,
			loading: true
		}
	}

	colError = (response) => {
		console.log(response)
		this.setState({loading: false});
	}

	colSuccess = (response) => {
		this.setState({collections: response.data.items, loading: false, showDeleteModal: false});
	}

	getCollections = () => {
		Machinable.collections(this.state.slug).list(this.colSuccess, this.colError);
	}

	closeModal = () => {
		var html = document.getElementsByTagName('html')[0];
        html.style.cssText = "--root-overflow: auto";
		this.setState({showDeleteModal: false});
	}

	openDeleteModal = (collection) => {
		var html = document.getElementsByTagName('html')[0];
        html.style.cssText = "--root-overflow: hidden";
		this.setState({showDeleteModal: true, deleteCollection: collection});
	}

	deleteCollection = () => {
		this.setState({loading: true});
		Machinable.collections(this.state.slug).delete(this.state.deleteCollection.id, this.getCollections, this.colError);
	}

	componentDidMount = () => {		
		this.getCollections();
	}

	emptyState = () => {
		return (
			<div className="grid grid-8">
                <div className="col-3-7 flex-col">
                    <h3 className="text-center">POST some JSON to any <code>/collection</code> endpoint to create a new collection</h3>
                    <br/>
					<div className="code align-center">
						<div style={{"width": "450px"}}>
							<div>cURL</div>
							<div>&nbsp;&nbsp;-d '&#123;"name":"Murphy", "age":2, "breed": "French Bulldog"&#125;'</div>
							<div>&nbsp;&nbsp;-H "Content-Type: application/json"</div>
							<div>&nbsp;&nbsp;-X POST http://{this.state.slug}.machinable.test:5001/collections/dogs</div>
						</div>
					</div>
                </div>
            </div>
		)
	}

	render() {
		var collections = this.state.collections.map(function(col, idx){
			return [
				<div>
					<h3 className="text-400 no-margin margin-bottom-less">{col.name}</h3>
					<div className="text-muted text-small">https://{this.state.slug}.mchbl.app/collections/{col.name}</div>
				</div>,
				<div>
					{col.items} {col.items > 1 ? "items" : "item"}
				</div>,
				<div>{moment(col.created).fromNow()}</div>,
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
								<ListItem title={<div className="text-center text-danger text-400" onClick={() => this.openDeleteModal(col)}>Delete</div>}/>
							</List>
						</div>
					</Dropdown>
				</div>
			];
		}, this);

		return (
			<div>
				{collections.length > 0 &&
				<Table 
					classes="m-table"
					headers={["Name", "Size", "Created", ""]}
					values={collections}
				/>
				}

				{collections.length == 0 &&
					this.emptyState()
				}

				<Modal 
					close={this.closeModal}
					isOpen={this.state.showDeleteModal}>
                    <div className="align-center grid grid-3">
                        <div className="col-3-2">
                            <div className=" grid grid-1">
                                <Card
                                    classes="footer-plain no-border"
                                    footer={
                                        <div className="grid grid-2">
                                            <div className="col-2 col-right">
                                                <Button classes="plain text" onClick={this.closeModal}>Cancel</Button>	
                                                <Button classes="danger margin-left" type="submit" loading={this.state.loading} onClick={this.deleteCollection}>Yes, I'm sure</Button>	
                                            </div>
                                        </div>
                                    }>

                                    <h2 className="text-center">Delete Collection</h2>
									<h3 className="text-center">Are you sure you want to delete <strong>{this.state.deleteCollection.name}</strong>?</h3>
									<p className="text-center">
										This will delete all data stored in this collection. This cannot be undone.
									</p>
                                </Card>
                            </div>
                        </div>
                    </div>
                </Modal>
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