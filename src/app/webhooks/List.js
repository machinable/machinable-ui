import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Button, Input } from 'turtle-ui';

class List extends Component {

    constructor(props) {
        super(props);
        this.state = {
            spec: {},
            projectSlug: props.slug,
            loading: true,
        }
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
								<Input labelClasses="flex-1" classes="search" placeholder="Search webhooks..."/>
							</div>
							<div className="align-right">
								<Button classes="brand plain page-btn">New Webhook</Button>
							</div>
						</div>
                    }
                    classes="m-table"
                    headers={["Label", "Entity", "Event"]}
                    values={[]}

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
