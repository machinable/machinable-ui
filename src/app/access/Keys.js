import React, { Component } from 'react';
import { Table, Button, Input, TextArea, Switch, Modal, Card, Dropdown, List, ListItem } from 'turtle-ui';
import { connect } from 'react-redux';
import Loader from '../../components/Loader';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faKey from '@fortawesome/fontawesome-free-solid/faKey';
import faEllipsis from '@fortawesome/fontawesome-free-solid/faEllipsisV';
import Empty from '../../images/safe.svg';
import Machinable from '../../client';
import moment from 'moment';

class Keys extends Component {

	constructor(props) {
        super(props);
		this.state = {
            loading: true,
            keys: [],
            showModal: false,
            showDeleteModal: false,
            slug: props.slug, 
            errors: [],
            newKey: {},
            deleteKey: {description:""}
		}
	}

    keyError = (response) => {
        console.log(response);
        this.setState({loading: false});
    }

    createKeyError = (response) => {
        console.log(response);
        this.setState({loading: false, errors: [response.data.error]});
    }

    keySuccess = (response) => {
        this.setState({keys: response.data.items, loading: false, showModal: false, showDeleteModal: false});
    }

    getKeys = () => {
        Machinable.keys(this.state.slug).list(this.keySuccess, this.keyError);
    }

	componentDidMount = () => {		
		this.getKeys();
    }
    
    closeModal = () => {
		var html = document.getElementsByTagName('html')[0];
        html.style.cssText = "--root-overflow: auto";
		this.setState({showModal: false});
	}

	openModal = (response) => {
        var key = response.data.key
		var html = document.getElementsByTagName('html')[0];
        html.style.cssText = "--root-overflow: hidden";
		this.setState({showModal: true, newKey:{"key": key, "read": true, "description": ""}});
    }

    openDeleteModal = (key) => {
		var html = document.getElementsByTagName('html')[0];
        html.style.cssText = "--root-overflow: hidden";
		this.setState({showDeleteModal: true, deleteKey: key});
	}

	deleteKey = () => {
		this.setState({loading: true});
		Machinable.keys(this.state.slug).delete(this.state.deleteKey.id, this.getKeys, this.createKeyError);
	}

    generateNewKey = () => {
        Machinable.keys(this.state.slug).generate(this.openModal, this.keyError);
    }

    onChange = (event) => {
        const target = event.target;
	    const value = target.type === 'checkbox' ? target.checked : target.value;
	    const name = target.name;
        var nk = this.state.newKey;
        nk[name] = value;
        
	    this.setState({
	    	newKey: nk
	    });
        
    }

    createKey = () => {
        this.setState({loading: true, errors: []});
        Machinable.keys(this.state.slug).create(this.state.newKey, this.getKeys, this.createKeyError)
    }
    
    emptyState = () => {
        return (
            <div className="grid grid-8">
                <div className="col-2-8 flex-col">
                    <h2 className="text-center">No API Keys</h2>
                    <img src={Empty} className="empty-state-sm"/>
                    <h3 className="text-center">Create API Keys with read/write access to your project's API Resources and Collections</h3>
                    <div className="align-center">
                        <Button classes="accent" onClick={this.generateNewKey}>Generate API Token</Button>
                    </div>
                </div>
            </div>
        );
    }

    renderKeys = () => {
        var tableValues = this.state.keys.map(function(key, idx){
            var accessList = [];
            if(key.read) {
                accessList.push("read");
            }
            if(key.write) {
                accessList.push("write");
            }
            if(accessList.length == 0) {
                accessList.push("none");
            }
            return [
                <div className="vertical-align">
                    <FontAwesomeIcon className="margin-right text-muted" style={{"fontSize": "24px"}} icon={faKey} />
                    <div>
                        <h3 className="text-400 no-margin">{key.description}</h3>
                        <div className="text-muted">{moment(key.created).fromNow()}</div>
                    </div>
                </div>,
                <div>{accessList.join(" / ")}</div>,
                <div className=" align-right">
                    <Dropdown 
                        showIcon={false}
                        width={150}
                        buttonText={<FontAwesomeIcon className="text-muted" icon={faEllipsis} />}
                        buttonClasses="text plain vertical-align"
                        classes="align-items-right">
                        <div className="grid grid-1">
                            <List>
                                <ListItem title={<div className="text-center">Edit Access</div>}/>
                                <hr className="no-margin no-padding"/>
                                <ListItem title={<div className="text-center text-danger text-400" onClick={() => this.openDeleteModal(key)}>Delete</div>}/>
                            </List>
                        </div>
                    </Dropdown>
                </div>
            ]
        }, this);

        return (
            <React.Fragment>
                <Table
                    classes="hover m-table"
                    headers={["Description","Access",""]}
					values={tableValues}
				/>
				<Button classes="accent page-btn" onClick={this.generateNewKey}>Generate API Token</Button>
            </React.Fragment>
        )
    }

	copyText = (id) => {
		var copyText = document.getElementById(id);
		copyText.select();
		document.execCommand("Copy");
    }
    
	render() {

        var renderKeys = this.state.keys.length > 0 ? this.renderKeys() : this.emptyState();

		return (
			<div>
                <Loader loading={this.state.loading}/>
                {!this.state.loading && renderKeys}
                
                <Modal 
					close={this.closeModal}
					isOpen={this.state.showModal}>
                    <div className="align-center grid grid-3">
                        <div className="col-3-2">
                            <div className=" grid grid-1">
                                <Card
                                    classes="footer-plain no-border"
                                    footer={
                                        <div className="grid grid-2">
                                            <div className="col-2 col-right">
                                                <Button classes="plain text" onClick={this.closeModal}>Cancel</Button>	
                                                <Button classes="brand margin-left" type="submit" loading={this.state.loading} onClick={this.createKey}>Create</Button>	
                                            </div>
                                        </div>
                                    }>

                                    <h2 className="text-center">New API Key</h2>

                                    { this.state.errors.length > 0 &&
                                        <div className="text-danger text-center margin-bottom-more">
                                            {this.state.errors.map(function(error){
                                                return (<div className="text-400 padding-bottom">{error}</div>)
                                            })}
                                        </div>
                                    }

                                    <div className="grid grid-1">
                                        <strong>Generated Key</strong>
                                        <div className="background-content padding-bit-less vertical-align">
                                            <span>{this.state.newKey.key}</span>
                                            <Button classes="btn-small margin-left" onClick={() => this.copyText("generated-key")}>Copy</Button>
							                <textarea cols="1000" className="copy-text"  id="generated-key" value={this.state.newKey.key} readOnly/>
                                        </div>
                                        <div className="text-small text-muted">Copy this API key and save it somewhere safe. You will not be able to view it here again.</div>
                                        <TextArea placeholder="what will this API Key be used for?" label="Description" name="description" value={this.state.newKey.description} onChange={this.onChange}/>
                                        <div className="grid grid-2">
                                            <div className="align-center vertical-align">
                                                <strong className="margin-right">Read</strong>
                                                <Switch name="read" on={this.state.newKey.read} onChange={this.onChange}/>
                                            </div>
                                            <div className="align-center vertical-align">
                                                <strong className="margin-right">Write</strong>
                                                <Switch name="write" on={this.state.newKey.write} onChange={this.onChange}/>
                                            </div>
                                        </div>
                                    </div>
                                    
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
                                                <Button classes="danger margin-left" type="submit" loading={this.state.loading} onClick={this.deleteKey}>Yes, I'm sure</Button>	
                                            </div>
                                        </div>
                                    }>

                                    <h2 className="text-center">Delete API Key</h2>
                                    { this.state.errors.length > 0 &&
                                        <div className="text-danger text-center margin-bottom-more">
                                            {this.state.errors.map(function(error){
                                                return (<div className="text-400 padding-bottom">{error}</div>)
                                            })}
                                        </div>
                                    }
									<h3 className="text-center">Are you sure you want to delete <strong>{this.state.deleteKey.description}</strong>?</h3>
									<p className="text-center">
										Any application using this API key will no longer have access. This cannot be undone.
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
  
export default connect(mapStateToProps)(Keys);