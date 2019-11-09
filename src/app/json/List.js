import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Card, Button } from 'turtle-ui';
import Nav from '../../components/DisplayNav';
import Loader from '../../components/Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import faEllipsis from '@fortawesome/fontawesome-free-solid/faEllipsisV';
import Empty from '../../images/empty_canvas.svg';
import Machinable from '../../client';
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
					<h2 className="text-center">Create your first Root key</h2>
                    <img src={Empty} alt="" className="empty-state-sm"/>
                    <h3 className="text-center">Access JSON structure with HTTP path parameters as keys/indices to the JSON</h3>
					<div className="align-center">
                        <Button classes="accent" onClick={this.openModal}>Create A Key</Button>
                    </div>
				</div>
            </div>
		)
	}

	renderRootKeys = () => {
	
		return (
			<div>keys</div>
		);
	}

	render() {
		var renderKeys = this.state.keys.length > 0 ? this.renderRootKeys() : this.emptyState();
		var rootKeyNav = {

		}
		return (
			<div style={{"height": "100%"}}>
				<Loader loading={this.state.loading} />
				{/* {!this.state.loading && renderKeys} */}

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