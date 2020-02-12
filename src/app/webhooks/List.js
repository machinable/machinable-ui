import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Table, Button, Input, Dropdown, List as TList, ListItem } from 'turtle-ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV as faEllipsis } from '@fortawesome/fontawesome-free-solid';
import { faPowerOff } from '@fortawesome/fontawesome-free-solid';
import Machinable from '../../client';
import NewHook from './NewHook';

class List extends Component {

    constructor(props) {
        super(props);
        this.state = {
            slug: props.slug,
            hooks: [],
            loading: true,
            newHookModal: false
        }
    }

    openModal = () => {
		var html = document.getElementsByTagName('html')[0];
        html.style.cssText = "--root-overflow: hidden";
        this.setState({newHookModal: true});
    }

    closeModal = () => {
		var html = document.getElementsByTagName('html')[0];
        html.style.cssText = "--root-overflow: auto";
        this.setState({newHookModal: false});
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
        });
    }

    listHooks = () => {
        Machinable.hooks(this.state.slug).list(this.hookSuccess, this.hookError);
    }

	componentDidMount = () => {		
		this.listHooks();
	}

    render() {
        let items = [];
        let buttons = [];

        const { hooks } = this.state;

        for (let index = 0; index < hooks.length; index++) {
            const hook = hooks[index];
            items.push([
                <div className="text-400">{hook["label"]}</div>,
                hook["entity"],
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
                                <ListItem onClick={function(){}} title={<div className="text-center text-400">Details</div>}/>
                                <ListItem onClick={function(){}} title={<div className="text-center text-400">Edit</div>}/>
                                <hr className="no-margin no-padding"/>
                                <ListItem onClick={function(){}} title={<div className="text-center text-danger text-400">Delete</div>}/>
                            </TList>
                        </div>
                    </Dropdown>
                </div>
            ]);
        }

        return (
            <>
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

                <NewHook isOpen={this.state.newHookModal} onClose={this.closeModal} onCreate={this.listHooks}/>
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
