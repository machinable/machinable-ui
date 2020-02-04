import React, { Component } from 'react';
import { Card, Button, Modal, Dropdown, Switch } from 'turtle-ui';
import Machinable from '../../client';
import Loader from '../../components/Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import faCog from '@fortawesome/fontawesome-free-solid/faCog';
import faTrash from '@fortawesome/fontawesome-free-solid/faTrash';
import ReactJson from 'react-json-view';
import Statics from "../../Statics";

class Details extends Component {

	constructor(props) {
        super(props);
        
		this.state = {
			slug: props.slug,
            loading: true,
            rootKey: props.rootKey,
            rootKeyData: {},
			showDeleteModal: false,
		}
	}

	colError = (response) => {
		var error = "";
		console.log(response);
		if(response.data.hasOwnProperty("error")) {
			error = response.data.error;
		} else {
			error = JSON.stringify(response.data);
		}
		this.setState({loading: false, errors: [error]});
	}

	colSuccess = (response) => {
		this.setState({rootKeyData: response.data, loading: false});
	}

	getKey = () => {
		Machinable.rootKeys(this.state.slug).get(this.state.rootKey.key, this.colSuccess, this.colError);
    }
    
	componentDidMount = () => {		
        this.getKey();
	}

	componentWillReceiveProps = (newProps) => {
		if (newProps.rootKey !== this.state.rootKey) {
			this.setState({loading: true, rootKey: newProps.rootKey}, this.getKey);
		}
	}

	closeModal = () => {
		this.setState({showDeleteModal: false});
	}

	confirmDeleteKey = () => {
		this.setState({showDeleteModal: true});
	}

	deleteKey = () => {
		Machinable.rootKeys(this.state.slug).delete(this.state.rootKey.key, this.props.onDelete, this.colError);
	}

	updateAccess = (op) => {
		let { rootKey } = this.state;

		if (rootKey.hasOwnProperty(op)) {
			rootKey[op] = !rootKey[op];

			Machinable.rootKeys(this.state.slug).update(rootKey.key, rootKey, () => this.setState({rootKey}), this.colError);
		}
	}

	onAddKey = (event) => {
		console.log(event);
	}

	onEditKey = (event) => {
		const { rootKey } = this.state;
		// updated_src
		console.log(event);
		Machinable.rootKeys(this.state.slug).updateKeyValue(
				rootKey.key, 
				event.updated_src,
				function(){},
				this.colError
			);
	}

	onDeleteKey = (event) => {
		console.log(event);
	}

	render() {
		const { rootKey, slug, loading, rootKeyData } = this.state
		const fullURL = Statics.GenerateAPIHost(slug) + "/json/" + rootKey.key + "/";

		return (
			<>
				<div className="grid grid-2 align-center">
					<a className="anchor vertical-align" target="_blank" rel="noopener noreferrer" href={fullURL} title={fullURL}>{`/json/${rootKey.key}/`}</a>
					<div className="align-right">
						<Dropdown 
							type="text plain"
							width={300}
							buttonText={<FontAwesomeIcon icon={faCog} />}
							disableClickClose={true}
							buttonClasses={"no-click btn-small"}
							classes="col-1 align-items-right clear-margin clear-padding">
							<div style={{"margin": "-2px"}}>
								<h3 className="background-content padding clear-margin">
									<span className="text-muted">Settings - </span><span className="text-400">{rootKey.key}</span>
								</h3>
								<div className="grid grid-3 padding-side-bit-less padding-top-bit-less">
									<div className="col-2 flex-col">
										<h4 className="margin-vertical-5 vertical-align">Create</h4>
										<p className="text-muted text-small no-margin">
											{rootKey.create && "Authentication is required to create new keys/indices"}
											{!rootKey.create && "Anyone with the project URL can create keys/indices"}
										</p>
									</div>
									<div className="margin-vertical-5 vertical-align align-right">
										<Switch on={rootKey.create} onChange={() => this.updateAccess('create')}/>
									</div>
								</div>
								<hr className="thin"/>

								<div className="grid grid-3 padding-side-bit-less">
									<div className="col-2 flex-col">
										<h4 className="margin-vertical-5 vertical-align">Read</h4>
										<p className="text-muted text-small no-margin">
											{rootKey.read && "Authentication is required to read keys/indices"}
											{!rootKey.read && "Anyone with the project URL can read keys/indices"}
										</p>
									</div>
									<div className="margin-vertical-5 vertical-align align-right">
										<Switch on={rootKey.read} onChange={() => this.updateAccess('read')}/>
									</div>
								</div>
								<hr className="thin"/>

								<div className="grid grid-3 padding-side-bit-less">
									<div className="col-2 flex-col">
										<h4 className="margin-vertical-5 vertical-align">Update</h4>
										<p className="text-muted text-small no-margin">
											{rootKey.update && "Authentication is required to update keys/indices"}
											{!rootKey.update && "Anyone with the project URL can update keys/indices"}
										</p>
									</div>
									<div className="margin-vertical-5 vertical-align align-right">
										<Switch on={rootKey.update} onChange={() => this.updateAccess('update')}/>
									</div>
								</div>
								<hr className="thin"/>

								<div className="grid grid-3 padding-side-bit-less padding-bottom">
									<div className="col-2 flex-col">
										<h4 className="margin-vertical-5 vertical-align">Delete</h4>
										<p className="text-muted text-small no-margin">
											{rootKey.delete && "Authentication is required to delete keys/indices"}
											{!rootKey.delete && "Anyone with the project URL can delete keys/indices"}
										</p>
									</div>
									<div className="margin-vertical-5 vertical-align align-right">
										<Switch on={rootKey.delete} onChange={() => this.updateAccess('delete')}/>
									</div>
								</div>
							</div>
						</Dropdown>
						<Button classes="text plain text-more-muted btn-small" onClick={this.confirmDeleteKey}>
							<FontAwesomeIcon icon={faTrash} />
						</Button>
					</div>
				</div>
				{loading && <Loader loading={loading} />}
				{!loading &&
					<>
						<div className="margin-top padding">
							<ReactJson
								defaultValue={true}
								onAdd={this.onEditKey}
								onEdit={this.onEditKey}
								onDelete={this.onEditKey}
								collapsed={2} 
								name={false} 
								iconStyle="square" 
								src={rootKeyData} />
						</div>

						<Modal 
							close={this.closeModal}
							isOpen={this.state.showDeleteModal}>
							<div className="align-center grid grid-3">
								<div className="col-3-2">
									<div className="grid grid-1">
										<Card
											classes="footer-plain no-border"
											footer={
												<div className="grid grid-2">
													<div className="col-2 col-right">
														<Button classes="plain text" onClick={this.closeModal}>Cancel</Button>	
														<Button classes="danger margin-left" type="submit" loading={loading} onClick={this.deleteKey}>Yes, I'm sure</Button>	
													</div>
												</div>
											}>

											<h2 className="text-center">Delete Root Key</h2>
											<h3 className="text-center">Are you sure you want to delete <strong>{rootKey && rootKey.key}</strong>?</h3>
											<p className="text-center">
												This will delete all data associated with this key. This cannot be undone.
											</p>
										</Card>
									</div>
								</div>
							</div>
						</Modal>

					</>
				}

			</>
		  );
	}
}

export default Details;
