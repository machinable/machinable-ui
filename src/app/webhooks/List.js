import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Table, Button, Input, Dropdown, List as TList, ListItem, Card } from 'turtle-ui';
import Dismiss from '../../components/DismissModalButton';
import Loader from '../../components/Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV as faEllipsis } from '@fortawesome/fontawesome-free-solid';
import { faPowerOff } from '@fortawesome/fontawesome-free-solid';
import Machinable from '../../client';
import NewHook from './NewHook';
import EditHook from './EditHook';
import ViewHook from './ViewHook';

class List extends Component {

    constructor(props) {
        super(props);
        this.state = {
            slug: props.slug,
            hooks: [],
            loading: true,
            newHookModal: false,
            showDeleteModal: false,
            editHook: {},
            viewHook: {},
            resources: {},
            deleteHook: {},
            keys: {}
        }
    }

    openDeleteModal = (hook) => {
		var html = document.getElementsByTagName('html')[0];
        html.style.cssText = "--root-overflow: hidden";
        this.setState({showDeleteModal: true, deleteHook: hook});
    }

    closeDeleteModal = () => {
		var html = document.getElementsByTagName('html')[0];
        html.style.cssText = "--root-overflow: auto";
        this.setState({showDeleteModal: false});
    }

    openModal = () => {
		var html = document.getElementsByTagName('html')[0];
        html.style.cssText = "--root-overflow: hidden";
        this.setState({newHookModal: true});
    }

    closeModal = () => {
		var html = document.getElementsByTagName('html')[0];
        html.style.cssText = "--root-overflow: auto";
        this.setState({newHookModal: false, editHook: {}, viewHook: {}});
    }

    hookError = (response) => {
        console.log(response);
        this.setState({loading: false});
    }

    hookSuccess = (response) => {
        this.setState({
            hooks: response.data.items, 
            loading: false, 
            newHookModal: false,
            showDeleteModal: false
        });
    }

    listHooks = () => {
        Machinable.hooks(this.state.slug).list(this.hookSuccess, this.hookError);
    }

    deleteHook = () => {
        const { deleteHook } = this.state;
        this.setState({loading: true});
        Machinable.hooks(this.state.slug).delete(deleteHook.id, this.listHooks, this.hookError);
    }

    entityError = (response) => {
        console.log(response);
        this.setState({loading: false, errors: [response.data.error]});
    }

    recResources = (response) => {
        const items = response.data.items;
        let entities = {};

        for (let index = 0; index < items.length; index++) {
            const element = items[index];
            entities[element.id] = element.title;
        }
        
        this.setState({ resources: entities });
    }

    recKeys = (response) => {
        const items = response.data.items;
        let entities = {};

        for (let index = 0; index < items.length; index++) {
            const element = items[index];
            entities[element.id] = element.key;
        }
        
        this.setState({ keys: entities });
    }

    listResources = () => {
        Machinable.resources(this.state.slug).list(this.recResources, this.entityError);
    }

    listJsonKeys = () => {
        Machinable.rootKeys(this.state.slug).list(this.recKeys, this.entityError);
    }

	componentDidMount = () => {		
        this.listJsonKeys();
        this.listResources();
		this.listHooks();
    }
    
    renderHooks = () => {
        let items = [];
        let buttons = [];

        const { hooks, resources, keys } = this.state;

        for (let index = 0; index < hooks.length; index++) {
            const hook = hooks[index];
            let entityName = "";
            if(hook["entity"] === "resource") {
                entityName = (<div><span>{resources[hook["entity_id"]]}</span> <span className="text-more-muted">[resource]</span></div>);
            } else {
                entityName = (<div><span>{keys[hook["entity_id"]]}</span> <span className="text-more-muted">[key/value]</span></div>);
            }
            items.push([
                <div className="text-400">{hook["label"]}</div>,
                entityName,
                hook["event"],
                <div className="text-center"><FontAwesomeIcon className={hook["is_enabled"] ? "text-success" : "text-more-muted"} icon={faPowerOff} fixedWidth/></div>,
                <div className="align-center">
                    <Dropdown 
                        showIcon={false}
                        width={150}
                        buttonText={<FontAwesomeIcon className="text-muted" icon={faEllipsis} />}
                        buttonClasses="btn-small text plain vertical-align"
                        classes="align-items-right">
                        <div className="grid grid-1">
                            <TList>
                                <ListItem onClick={() => this.setState({viewHook: {hook: hook, entity: entityName}})} title={<div className="text-center text-400">Details</div>}/>
                                <ListItem onClick={() => this.setState({editHook: hook})} title={<div className="text-center text-400">Edit</div>}/>
                                <hr className="no-margin no-padding"/>
                                <ListItem onClick={() => this.openDeleteModal(hook)} title={<div className="text-center text-danger text-400">Delete</div>}/>
                            </TList>
                        </div>
                    </Dropdown>
                </div>
            ]);
        }

        return (
            <Table
                title={
                    <div className="grid grid-2">
                        <div className="vertical-align">
                            <Input labelClasses="flex-1" classes="search" placeholder="Search webhooks..." />
                        </div>
                        <div className="align-right">
                            <Button classes="brand plain page-btn" onClick={this.openModal}>New Hook</Button>
                        </div>
                    </div>
                }
                classes="m-table"
                headers={items.length ? ["Label", "Entity", "Event", <div className="m-th text-center">Enabled</div>, <div className="m-th text-center">Options</div>] : []}
                values={items.length ? items : [[<div className="text-center text-muted">No Web Hooks</div>]]}

                footer={<div className="grid grid-2">
                    <div className="text-small text-muted vertical-align">
                        showing 1 to {items.length} of {items.length} entries
                        </div>
                    <div className="pull-right">
                        {buttons.map(function (btn, index) {
                            return (
                                btn
                            )
                        })}
                    </div>
                </div>}
            />
        );
    }

    render() {
        const { resources, keys } = this.state;
        return (
            <>
				<Loader loading={this.state.loading} />
				{!this.state.loading && this.renderHooks()}

                <NewHook resources={resources} keys={keys} isOpen={this.state.newHookModal} onClose={this.closeModal} onCreate={this.listHooks}/>
            
                <EditHook resources={resources} keys={keys}  editHook={this.state.editHook} isOpen={this.state.editHook.hasOwnProperty("id")} onClose={this.closeModal} onCreate={this.listHooks}/>
                
                <ViewHook hook={this.state.viewHook} isOpen={this.state.viewHook.hasOwnProperty("hook")} onClose={this.closeModal}/>

				<Modal 
					close={this.closeDeleteModal}
					isOpen={this.state.showDeleteModal}>
                    <div className="align-center grid grid-3">
                        <div className="col-3-2">
                            <div className=" grid grid-1">
                                <Card
                                    classes="footer-plain no-border"
                                    footer={
                                        <div className="grid grid-2">
                                            <div className="col-2 col-right">
                                                <Button classes="plain text" onClick={this.closeDeleteModal}>Cancel</Button>	
                                                <Button classes="danger margin-left" type="submit" loading={this.state.loading} onClick={this.deleteHook}>Yes, I'm sure</Button>	
                                            </div>
                                        </div>
                                    }>
									<Dismiss onClick={this.closeExtraModal}/>
                                    <h2 className="text-center">Delete Web Hook</h2>
									<h3 className="text-center">Are you sure you want to delete <strong>{this.state.deleteHook.label}</strong>?</h3>
									<p className="text-center">
										This will permanently delete the configured web hook and any request history. This cannot be undone.
									</p>
                                </Card>
                            </div>
                        </div>
                    </div>
                </Modal>

            </>
        );
    }
}

// redux
function mapStateToProps(state) {
    return {
        slug: state.project_slug
    };
}

export default connect(mapStateToProps)(List);
