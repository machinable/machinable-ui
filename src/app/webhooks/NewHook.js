import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Select, Button, Input, Card } from 'turtle-ui';
import Loader from '../../components/Loader';
import Dismiss from '../../components/DismissModalButton';

class NewHook extends Component {

    constructor(props) {
        super(props);
        this.state = {
            projectSlug: props.slug,
            loading: false,
            errors: [],
        }
    }

    createHook = () => {

    }

    render() {
        return (
            <Modal
            classes={"from-right"}
                close={this.props.onClose}
                isOpen={this.props.isOpen}>

<div className="full-height grid grid-5">
                <div className="col-3-5 grid-column-end-6">
                        <div className=" grid grid-1">
                            <Card
                                classes="footer-plain no-border"
                                footer={
                                    <div className="grid grid-2">
                                        <div className="col-2 col-right">
                                            <Button classes="plain text" onClick={this.props.onClose}>Cancel</Button>	
                                            <Button classes="brand margin-left" type="submit" loading={this.state.loading} onClick={this.createHook}>Create</Button>	
                                        </div>
                                    </div>
                                }>
                                {/* <Dismiss onClick={this.props.onClose} /> */}

                                <h2>New Web Hook</h2>

                                { this.state.errors.length > 0 &&
                                    <div className="text-danger text-center margin-bottom-more">
                                        {this.state.errors.map(function(error){
                                            return (<div className="text-400 padding-bottom">{error}</div>)
                                        })}
                                    </div>
                                }

                                <div className="grid grid-1">

                                    <Input placeholder="short/descriptive label" label="Label" name="label" />

                                    <div className="grid grid-8">
                                        <div className="col col-2">
                                            <Select 
                                                label="Entity Type"
                                                options={[
                                                    {value: "resource", text: "API Resource"},
                                                    {value: "json", text: "Key/Value"},
                                                ]} 
                                                name="entity_type" 
                                            />
                                        </div>

                                        <div className="col col-6">
                                            <Select
                                                label="Entity"
                                                options={[]} 
                                                name="entity"
                                            />
                                        </div>
                                    </div>

                                    <Select
                                        label="Event"
                                        options={[
                                            {value: "create", text: "On Create"},
                                            {value: "edit", text: "On Edit"},
                                            {value: "delete", text: "On Delete"},
                                        ]}
                                    />

                                    <Input placeholder="url endpoint" label="URL" name="url" />

                                    <strong>Request Headers</strong>
                                    <div className="margin-top-less text-medium text-muted">
                                        Custom HTTP headers to be sent with the web hook request.
                                    </div>
                                </div>
                                
                            </Card>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}

// redux
function mapStateToProps(state) {
    return {
        slug: state.project_slug
    };
}

export default connect(mapStateToProps)(NewHook);
