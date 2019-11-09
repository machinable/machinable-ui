import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Card, Button, Table } from 'turtle-ui';
import Loader from '../../components/Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import faEllipsis from '@fortawesome/fontawesome-free-solid/faEllipsisV';
import Machinable from '../../client';
import Empty from '../../images/moon.svg';
import Statics from '../../Statics';

import moment from 'moment';

class KeyList extends Component {

	constructor(props) {
        super(props);
        this.state = {
			keys: [],
			slug: props.slug,
			data: {},
			deleteKey: {},
			showDeleteModal: false,
			loading: true,
		}
	}

	colError = (response) => {
		console.log(response)
		this.setState({loading: false});
	}

	colSuccess = (response) => {
		this.setState({keys: response.data.items, loading: false, showDeleteModal: false});
	}

	getRootKeys = () => {
		Machinable.rootKeys(this.state.slug).list(this.colSuccess, this.colError);
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

	deleteRootKey = () => {
		this.setState({loading: true});
		Machinable.rootKeys(this.state.slug).delete(this.state.deleteKey.key, this.getRootKeys, this.colError);
	}

	componentDidMount = () => {		
		this.getRootKeys();
	}

	emptyState = () => {
		return (
			<div className="grid grid-1">
                <div className="align-center flex-col">
					<h2 className="text-center">Create or a select a Root key</h2>
                    <img src={Empty} alt="" className="empty-state-sm"/>
                    <h3 className="text-center">Access all depths of JSON with HTTP path parameters as keys/indices</h3>
					<div className="align-center">
                        <Button classes="accent" onClick={this.openModal}>Create A Key</Button>
                    </div>
				</div>
            </div>
		)
	}

	renderRootKeys = () => {
	
		var values = [[<div className="text-muted text-small text-center">no keys found</div>]];

		return (
			<Card
				classes="m-card m-item-selection clear-padding"
			>
				<div className="m-item-selection-nav">
					<div className="m-selection-header grid grid-1">
						<Button classes="brand text plain btn-block">New Root Key</Button>
					</div>

					<div className="m-selection-content">
						<div className="m-item-header">Keys</div>
						<div className="m-selection-items-empty">No Keys</div>
					</div>
					<div className="m-selection-footer">
						<div className="grid grid-2">
							<div className="text-small text-muted vertical-align">
								showing 0 to {0} of {0}
							</div>
							<div className="pull-right">
								<Button key={"table_btn_0"} classes={"text plain btn-small " + ("disabled")} >Previous</Button>
								<Button key={"table_btn_1"} classes={"text plain btn-small " + ("disabled")} >Next</Button>
							</div>
						</div>
					</div>
				</div>
				
				<div className="m-selection-active">
					{this.emptyState()}
				</div>
			</Card>
		);
	}

	render() {
		var renderKeys = this.renderRootKeys();//this.state.keys.length > 0 ? this.renderRootKeys() : this.emptyState();

		return (
			<div style={{"height": "100%"}}>
				<Loader loading={this.state.loading} />
				{!this.state.loading && renderKeys}

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
                                                <Button classes="danger margin-left" type="submit" loading={this.state.loading} onClick={this.deleteRootKey}>Yes, I'm sure</Button>	
                                            </div>
                                        </div>
                                    }>

                                    <h2 className="text-center">Delete Root Key</h2>
									<h3 className="text-center">Are you sure you want to delete <strong>{this.state.deleteRootKey && this.state.deleteRootKey.key}</strong>?</h3>
									<p className="text-center">
										This will delete all data associated with this key. This cannot be undone.
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
  
export default connect(mapStateToProps)(KeyList);