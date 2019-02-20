import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, List, ListItem, Dropdown, Modal, Card, Button } from 'turtle-ui';
import Loader from '../../components/Loader';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faEllipsis from '@fortawesome/fontawesome-free-solid/faEllipsisV';
import Empty from '../../images/empty_canvas.svg';
import Machinable from '../../client';
import Statics from '../../Statics';
import Datum from './Datum'

import moment from 'moment';

class Data extends Component {

	constructor(props) {
        super(props);
        this.state = {
			collections: [],
			slug: props.slug,
			data: {},
			deleteCollection: {},
			showDeleteModal: false,
			loading: true,
			extraElement: <div>nothing selected</div>,
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

	closeExtraModal = () => {
		var html = document.getElementsByTagName('html')[0];
        html.style.cssText = "--root-overflow: auto";
		this.setState({showExtraModal: false, showDeleteModal: false});
	}

	openExtraModal = (element) => {
		var html = document.getElementsByTagName('html')[0];
        html.style.cssText = "--root-overflow: hidden";
		this.setState({showExtraModal: true, extraElement: element});
	}

	deleteCollection = () => {
		this.setState({loading: true});
		Machinable.collections(this.state.slug).delete(this.state.deleteCollection.id, this.getCollections, this.colError);
	}

	componentDidMount = () => {		
		this.getCollections();
	}

	emptyState = () => {
		var fullURL = Statics.GenerateAPIHost(this.state.slug);
		var curl = "curl -d '{\"name\":\"Murphy\", \"age\":2, \"breed\": \"French Bulldog\"}' -X POST "+fullURL+"/collections/dogs";
		return (
			<div className="grid grid-1">
                <div className="align-center flex-col">
					<h2 className="text-center">There aren't any Collections for this Project</h2>
                    <img src={Empty} alt="" className="empty-state-sm"/>
                    <h3 className="text-center">POST some JSON to any <code>/collection</code> endpoint to create a new collection</h3>
					<div className="code center-self" style={{"width":"450px"}}>
						<div>
							{curl}
						</div>
					</div>
                </div>
            </div>
		)
	}

	renderCollections = () => {
		var collections = this.state.collections.map(function(col, idx){
				var fullURL = Statics.GenerateAPIHost(this.state.slug) + "/" + Statics.COLLECTIONS + "/" + col.name;
				var collectionTitle = <div>
										<h3 className="text-400 no-margin margin-bottom-less">{col.name}</h3>
										<div className="text-small text-information">
											<a className="anchor" target="_blank" rel="noopener" href={fullURL} title={fullURL}>{fullURL}</a>
										</div>
									</div>;
				var details = <Datum title={collectionTitle} collection={col} slug={this.state.slug}/>;
				return [
					collectionTitle,
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
									<ListItem title={<div className="text-center text-400">Details</div>}  onClick={() => this.openExtraModal(details)}/>
									<hr className="no-margin no-padding"/>
									<ListItem title={<div className="text-center text-danger text-400">Delete</div>} onClick={() => this.openDeleteModal(col)}/>
								</List>
							</div>
						</Dropdown>
					</div>
				];
			}, this);

		return (
			<Table 
					classes="m-table"
					headers={["Name", "Size", "Created", ""]}
					values={collections}
				/>
		);
	}

	render() {
		var renderCollections = this.state.collections.length > 0 ? this.renderCollections() : this.emptyState();
		return (
			<div>
				<Loader loading={this.state.loading} />
				{!this.state.loading && renderCollections}

				<Modal
					classes="from-right"
					close={this.closeExtraModal}
					isOpen={this.state.showExtraModal}>
					<div className="full-height grid grid-4">
						<div className="col-2-5">
							<div className="grid grid-1">
								<Card 
									classes="footer-plain no-border"
									footer={
										<div className="grid grid-2">
											<div className="col-2 col-right">
												<Button classes="plain text" onClick={this.closeExtraModal}>Close</Button>	
											</div>
										</div>
									}>
									{this.state.extraElement}
								</Card>
							</div>
						</div>
					</div>
				</Modal>

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