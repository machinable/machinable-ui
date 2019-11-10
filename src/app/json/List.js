import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Card, Button, Input } from 'turtle-ui';
import Loader from '../../components/Loader';
import Dismiss from '../../components/DismissModalButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import faEllipsis from '@fortawesome/fontawesome-free-solid/faEllipsisV';
import Machinable from '../../client';
import Empty from '../../images/moon.svg';
import Detail from './Details';

import moment from 'moment';

class KeyList extends Component {

	constructor(props) {
        super(props);
        this.state = {
			keys: [],
			slug: props.slug,
			data: {},
			deleteKey: {},
			errors: [],
			deleteRootKey: "",
			newRootKey: "",
			activeKey: {id: ""},
			showDeleteModal: false,
			showCreateModal: false,
			loading: true,
		}
	}

	colError = (response) => {
		console.log(response);
		this.setState({loading: false, errors: [response.data && response.data.error]});
	}

	colSuccess = (response) => {
		this.setState({keys: response.data.items, loading: false, showDeleteModal: false, showCreateModal: false});
	}

	getRootKeys = () => {
		Machinable.rootKeys(this.state.slug).list(this.colSuccess, this.colError);
	}

	createRootKey = () => {
		const { newRootKey } = this.state;
		this.setState({loading: true}, function() {
			Machinable.rootKeys(this.state.slug).create(newRootKey, {}, this.getRootKeys, this.colError);
		});
	}

	getRootKey = (key) => {
		console.log(key);
		this.setState({activeKey: key});
	}

	closeModal = () => {
		var html = document.getElementsByTagName('html')[0];
        html.style.cssText = "--root-overflow: auto";
		this.setState({showDeleteModal: false, showCreateModal: false, deleteRootKey: ""});
	}

	openDeleteModal = (key) => {
		var html = document.getElementsByTagName('html')[0];
        html.style.cssText = "--root-overflow: hidden";
		this.setState({showDeleteModal: true, deleteKey: key});
	}

	openCreateModal = () => {
		var html = document.getElementsByTagName('html')[0];
        html.style.cssText = "--root-overflow: hidden";
		this.setState({showCreateModal: true, deleteRootKey: ""});
	}

	deleteRootKey = () => {
		this.setState({loading: true});
		Machinable.rootKeys(this.state.slug).delete(this.state.deleteKey.key, this.getRootKeys, this.colError);
	}

	onChange = (e) => {
		const keyName = e.target.value;
		this.setState({newRootKey: keyName});
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
                        <Button classes="accent" onClick={this.openCreateModal}>Create A Key</Button>
                    </div>
				</div>
            </div>
		)
	}

	renderRootKeys = () => {
	
		const { keys, activeKey, slug } = this.state;

		return (
			<Card
				classes="m-card m-item-selection clear-padding"
			>
				<div className="m-item-selection-nav">
					<div className="m-selection-header grid grid-1">
						<Button classes="brand text plain btn-block" onClick={this.openCreateModal}>New Root Key</Button>
					</div>

					<div className="m-selection-content">
						<div className="m-item-header">Keys</div>
						{keys.length > 0 && keys.map(function(key, i){
							return (
								<div 
									key={key.id} 
									className={"m-selection-item text-muted" + (key.id === activeKey.id ? " active" : "")}
									onClick={() => this.getRootKey(key)}>

									{key.key}

								</div>
							);
						}, this)}
						{keys.length === 0 && <div className="m-selection-items-empty">No Keys</div>}
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
					{activeKey.id === "" && this.emptyState()}
					{activeKey.id !== "" &&
						<Detail slug={slug} rootKey={activeKey}/>
					}
				</div>
			</Card>
		);
	}

	render() {
		var renderKeys = this.renderRootKeys();

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

				<Modal 
					close={this.closeModal}
					isOpen={this.state.showCreateModal}>
                    <div className="align-center grid grid-3">
                        <div className="col-3-2">
                            <div className=" grid grid-1">
                                <Card
                                    classes="footer-plain no-border"
                                    footer={
                                        <div className="grid grid-2">
                                            <div className="col-2 col-right">
                                                <Button classes="plain text" onClick={this.closeModal}>Cancel</Button>	
                                                <Button classes="brand margin-left" type="submit" loading={this.state.loading} onClick={this.createRootKey}>Create</Button>	
                                            </div>
                                        </div>
                                    }>
                                    <Dismiss onClick={this.closeModal} />

                                    <h2 className="text-center">New Root Key</h2>

                                    { this.state.errors.length > 0 &&
                                        <div className="text-danger text-center margin-bottom-more">
                                            {this.state.errors.map(function(error){
                                                return (<div className="text-400 padding-bottom">{error}</div>)
                                            })}
                                        </div>
                                    }

                                    <div className="grid grid-1">
										<Input 
											placeholder="root key name" 
											label="Key Name" 
											name="keyname" 
											value={this.state.newRootKey} 
											onChange={this.onChange}
										/>
                                    </div>
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