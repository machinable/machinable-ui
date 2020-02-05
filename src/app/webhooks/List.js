import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Table, Button, Input } from 'turtle-ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/fontawesome-free-solid';
import NewHook from './NewHook';

class List extends Component {

    constructor(props) {
        super(props);
        this.state = {
            projectSlug: props.slug,
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

    render() {
        let items = [];
        let buttons = [];
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
                    headers={["Label", "Entity", "Event", "Enabled", ""]}
                    values={[
                        ["Slack", "API Resource", "Create", <FontAwesomeIcon style={{color: "green"}} icon={faCheckCircle} fixedWidth/>, ""]
                    ]}

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

                <NewHook isOpen={this.state.newHookModal} onClose={this.closeModal}/>
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
