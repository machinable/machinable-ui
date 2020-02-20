import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Card, Table } from 'turtle-ui';
import Loader from '../../components/Loader';
import Machinable from '../../client';
import Nav from '../../components/DisplayNav';
import moment from 'moment';

class Details extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hook: props.hook.hook,
            entity: props.hook.entity,
        }
    }

    render() {
        const { hook, entity } = this.props;

        return (
			<div className="margin-top-more">
                <div className="grid grid-2">
                    <h4 className="margin-vertical-5">Label</h4>
                    <h4 className="margin-vertical-5 vertical-align align-right text-muted">
                        <span>{hook['label']}</span>
                    </h4>
                </div>

                <hr className="thin"/>
                <div className="grid grid-2">
                    <h4 className="margin-vertical-5">Enabled</h4>
                    <h4 className="margin-vertical-5 vertical-align align-right text-muted">
                        <span>{hook['is_enabled'] ? "Yes" : "No"}</span>
                    </h4>
                </div>
                
                <hr className="thin"/>
                <div className="grid grid-2">
                    <h4 className="margin-vertical-5">Entity</h4>
                    <h4 className="margin-vertical-5 vertical-align align-right text-muted">
                        <span>{entity}</span>
                    </h4>
                </div>

                <hr className="thin"/>
                <div className="grid grid-2">
                    <h4 className="margin-vertical-5">Event</h4>
                    <h4 className="margin-vertical-5 vertical-align align-right text-muted">
                        <span>{hook['event']}</span>
                    </h4>
                </div>

                <hr className="thin"/>
                <div className="grid grid-2">
                    <h4 className="margin-vertical-5">URL</h4>
                    <h4 className="margin-vertical-5 vertical-align align-right text-muted">
                        <span><a className="anchor" target="_blank" rel="noopener noreferrer" href={hook['hook_url']}>{hook['hook_url']}</a></span>
                    </h4>
                </div>

                <hr className="thin"/>
                <div className="grid grid-3">
                    <h4 className="margin-vertical-5 col-1">Headers</h4>
                    <h4 className="margin-vertical-5 vertical-align align-right text-muted col-2">
                        <div className="grid grid-2">
                        {
                            hook['headers'].map(function(header, i) {
                                return (
                                    <>
                                    <div>{header.key}</div>
                                    <div>{header.value}</div>
                                    </>
                                )
                            })
                        }
                        </div>
                    </h4>
                </div>
            </div>
        );
    }
}

class Logs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            slug: props.slug,
            loading: true,
            logs: []
        }
    }

    recError = (response) => {
        console.log(response);
        this.setState({loading: false});
    }

    recResults = (response) => {
        this.setState({logs: response.data.items, loading: false});
    }

    componentWillMount() {
        Machinable.hooks(this.state.slug).listResults(this.props.hook.id, this.recResults, this.recError);
    }

    renderLogs = () => {
        const { logs } = this.state;
        let values = [];
        for (let index = 0; index < logs.length; index++) {
            const element = logs[index];
            values.push([
                <div className="text-muted text-small">{moment(element.created).fromNow()}</div>,
                <div className="text-center"><span className={"text-400 text-center tag tag-" + (element.status_code+"")[0]}>{element.status_code}</span></div>,
                <div className="text-right">{element.response_time} ms</div>
            ]);
        }

        return (
            <div className="margin-top-more">
                <i className="text-small text-muted">Web Hook logs for the past 1 hour</i>
                <Table
                    classes="margin-top-more m-table"
                    headers={["Time", <div className="m-th text-center">Status Code</div>, <div className="m-th text-right">Response Time</div>]}
                    values={values}
                />
            </div>
        )
    }

    render() {
        const { loading } = this.state;
        let logs = loading ? <Loader loading={loading} /> : this.renderLogs();
        return (
            <>
                {logs}
            </>
        );
    }
}

class ViewHook extends Component {

    constructor(props) {
        super(props);
        this.state = {
            slug: props.slug,
            loading: false,
            errors: [],
            hook: props.hook.hook,
            entity: props.hook.entity,
            navSelection: {text: "Details", render: this.renderDetails},
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.hook && prevProps.hook['hook'] !== this.props.hook['hook']) {
            this.setState({hook: this.props.hook['hook'], entity: this.props.hook['entity']});
        }
    }

    renderDetails = () => {
        const { hook, entity } = this.state;
        return (
            <Details hook={hook} entity={entity} />
        );
    }

    renderLogs = () => {
        const { hook, entity, slug } = this.state;
        return (
            <Logs hook={hook} entity={entity} slug={slug} />
        );
    }

	toggleNav = (link) => {
        this.setState({navSelection: link});
    }

    render() {
        const { hook, entity } = this.state;

        return (
            <Modal
                classes={"from-right"}
                close={this.props.onClose}
                isOpen={this.props.isOpen}>

                <div className="full-height grid grid-4">
                    <div className="col-2-5">
                        <div className=" grid grid-1">
                            {hook &&
                            <Card
                                classes="footer-plain no-border"
                                footer={
                                    <div className="grid grid-2">
                                        <div className="col-2 col-right">
                                            <Button classes="plain text" onClick={this.props.onClose}>Close</Button>
                                        </div>
                                    </div>
                                }>
                                    
                                <h2 className="margin-vertical-5">{hook['label']}</h2>
                                
                                <Nav
                                    onClickCallback={this.toggleNav}
                                    classes="horizontal link-underline underline margin-top-more" 
                                    selected={this.state.navSelection.text}
                                    links={[
                                        {text: "Details", render: this.renderDetails},
                                        {text: "Logs", render: this.renderLogs}
                                    ]}
                                />

                                {hook && this.state.navSelection.render()}
                            </Card>}
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

export default connect(mapStateToProps)(ViewHook);
