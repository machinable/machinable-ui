import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Select, Button, Input, Card } from 'turtle-ui';
import Loader from '../../components/Loader';
import Dismiss from '../../components/DismissModalButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes';

class NewHook extends Component {

    constructor(props) {
        super(props);
        this.state = {
            projectSlug: props.slug,
            loading: false,
            errors: [],
            newHook: {
                headers: []
            }
        }
    }

    addHeader = () => {
        let { newHook } = this.state;
        newHook['headers'].push({key: "", value: ""});
        this.setState({newHook: newHook});
    }

    removeHeader = (i) => {
        console.log("delete", i);
        let { newHook } = this.state;
        console.log(newHook.headers);
        newHook.headers.splice(i, 1);
        console.log(newHook.headers);
        this.setState({newHook: newHook});
    }

    updateHeaderKey = (event, i) => {
        let { newHook } = this.state;
        newHook.headers[i].key = event.target.value;
        this.setState({newHook: newHook});
    }

    updateHeaderValue = (event, i) => {
        let { newHook } = this.state;
        newHook.headers[i].value = event.target.value;
        this.setState({newHook: newHook});
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

                                    {this.state.newHook.headers.map(function(header, i){
                                        const index = i;
                                        return (
                                            <div key={i}>
                                                <div className="flex">
                                                    <div className="margin-right-less">
                                                        <Input placeholder="header key" value={header.key} name={header.key} onChange={(event) => this.updateHeaderKey(event, index)}/>
                                                    </div>
                                                    <div className="margin-right-less">
                                                        <Input placeholder="header value" value={header.value} name={`${header.key}-value`} onChange={(event) => this.updateHeaderValue(event, index)}/>
                                                    </div>

                                                    <Button type="button" classes="text plain btn-small" onClick={() => this.removeHeader(index)}>
                                                        <FontAwesomeIcon className="text-more-muted" icon={faTimes}/>
                                                    </Button>
                                                </div>
                                            </div>
                                        )
                                    }, this)}

                                    <div>
                                        <div className="flex">
                                            <Button classes="brand plain margin-top btn-small" onClick={() => this.addHeader()}>Add Header</Button>
                                        </div>
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
