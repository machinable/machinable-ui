import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Select, Button, Input, Card, Switch } from 'turtle-ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes';
import Machinable from '../../client';

class EditHook extends Component {

    constructor(props) {
        super(props);
        this.state = {
            slug: props.slug,
            loading: false,
            errors: [],
            editHook: props.editHook,
            entities: [],
            keys: props.keys,
            resources: props.resources,
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.editHook && prevProps.editHook['id'] !== this.props.editHook['id']) {
            this.setState({editHook: this.props.editHook}, this.updateEntities);
        } else if (prevProps.keys !== this.props.keys) {
            this.setState({keys: this.props.keys}, this.recKeys);
        } else if (prevProps.resources !== this.props.resources) {
            this.setState({resources: this.props.resources}, this.recResources);
        }
    }

    updateEntities = () => {
        const { editHook } = this.state;
        if (editHook["entity"] === "json") {
            this.recKeys();
        } else {
            this.recResources();
        }
    }

    clear = () => {
        this.setState({
            errors: [],
            loading: false
        });
    }

    addHeader = () => {
        let { editHook } = this.state;
        editHook['headers'].push({ key: "", value: "" });
        this.setState({ editHook: editHook });
    }

    removeHeader = (i) => {
        let { editHook } = this.state;
        editHook.headers.splice(i, 1);
        this.setState({ editHook: editHook });
    }

    updateHeaderKey = (event, i) => {
        let { editHook } = this.state;
        editHook.headers[i].key = event.target.value;
        this.setState({ editHook: editHook });
    }

    updateHeaderValue = (event, i) => {
        let { editHook } = this.state;
        editHook.headers[i].value = event.target.value;
        this.setState({ editHook: editHook });
    }

    onChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        let { editHook } = this.state;

        editHook[name] = value;

        if (name === "entity") {
            if (value === "resource") {
                this.recResources();
            } else if (value === "json") {
                this.recKeys();
            }
        }

        this.setState({
            editHook: editHook,
            errors: []
        });
    }

    hookError = (response) => {
        this.setState({ loading: false, errors: [response.data.error] });
        console.log(response);
        // TODO
    }

    hookSuccess = (response) => {
        this.clear();
        this.props.onCreate();
        this.props.onClose();
    }

    putHook = () => {
        let { editHook } = this.state;
        Machinable.hooks(this.state.slug).update(editHook, this.hookSuccess, this.hookError);
    }

    saveHook = () => {
        this.setState({ loading: true }, this.putHook);
    }

    entityError = (response) => {
        console.log(response);
        this.setState({ loading: false, errors: [response.data.error] });
    }

    recResources = () => {
        const { resources, editHook } = this.state;
        if (editHook["entity"] === "resource") {
            let entities = [{ "value": "", "text": "" }];

            for (const key in resources) {
                if (resources.hasOwnProperty(key)) {
                    const element = resources[key];
                    entities.push({
                        "value": key,
                        "text": element
                    });
                }
            }

            this.setState({ entities: entities });
        }
    }

    recKeys = () => {
        const { keys, editHook } = this.state;
        if (editHook["entity"] === "json") {
            let entities = [{ "value": "", "text": "" }];

            for (const key in keys) {
                if (keys.hasOwnProperty(key)) {
                    const element = keys[key];
                    entities.push({
                        "value": key,
                        "text": element
                    });
                }
            }

            this.setState({ entities: entities });
        }
    }

    componentDidMount = () => {
        // this.getHook();
        this.recResources();
    }

    render() {
        const { editHook, entities } = this.state;

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
                                            <Button classes="brand margin-left" type="submit" loading={this.state.loading} onClick={this.saveHook}>Save</Button>
                                        </div>
                                    </div>
                                }>
                                {/* <Dismiss onClick={this.props.onClose} /> */}

                                <h2>Edit Web Hook</h2>

                                {this.state.errors.length > 0 &&
                                    <div className="text-danger text-center margin-bottom-more">
                                        {this.state.errors.map(function (error) {
                                            return (<div key={error} className="text-400 padding-bottom">{error}</div>)
                                        })}
                                    </div>
                                }

                                {editHook.hasOwnProperty("id") && 
                                <div className="grid grid-1">

                                    <Input placeholder="short/descriptive label" label="Label" name="label" value={editHook['label']} onChange={this.onChange} />

                                    <div className="grid grid-8">
                                        <div className="col col-2">
                                            <Select
                                                label="Entity Type"
                                                options={[
                                                    { value: "resource", text: "API Resource" },
                                                    { value: "json", text: "Key/Value" },
                                                ]}
                                                name="entity"
                                                value={editHook['entity']}
                                                onChange={this.onChange}
                                            />
                                        </div>

                                        <div className="col col-6">
                                            <Select
                                                label="Entity"
                                                options={entities}
                                                name="entity_id"
                                                value={editHook['entity_id']}
                                                onChange={this.onChange}
                                            />
                                        </div>
                                    </div>

                                    <Select
                                        label="Event"
                                        options={[
                                            { value: "create", text: "On Create" },
                                            { value: "edit", text: "On Edit" },
                                            { value: "delete", text: "On Delete" },
                                        ]}
                                        name="event"
                                        value={editHook['event']}
                                        onChange={this.onChange}
                                    />

                                    <Input
                                        placeholder="url endpoint"
                                        label="URL"
                                        name="hook_url"
                                        value={editHook['hook_url']}
                                        onChange={this.onChange}
                                    />

                                    <div className="grid grid-1">
                                        <strong>Enabled</strong>

                                        <Switch on={editHook['is_enabled']} name="is_enabled" onChange={this.onChange} />
                                    </div>
                                    <strong>Request Headers</strong>
                                    <div className="margin-top-less text-medium text-muted">
                                        Custom HTTP headers to be sent with the web hook request.
                                    </div>

                                    {this.state.editHook.headers.map(function (header, i) {
                                        const index = i;
                                        return (
                                            <div key={i}>
                                                <div className="flex">
                                                    <div className="margin-right-less">
                                                        <Input placeholder="header key" value={header.key} name={header.key} onChange={(event) => this.updateHeaderKey(event, index)} />
                                                    </div>
                                                    <div className="margin-right-less">
                                                        <Input placeholder="header value" value={header.value} name={`${header.key}-value`} onChange={(event) => this.updateHeaderValue(event, index)} />
                                                    </div>

                                                    <Button type="button" classes="text plain btn-small" onClick={() => this.removeHeader(index)}>
                                                        <FontAwesomeIcon className="text-more-muted" icon={faTimes} />
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
                                </div>}

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

export default connect(mapStateToProps)(EditHook);
