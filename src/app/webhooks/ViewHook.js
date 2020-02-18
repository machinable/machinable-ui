import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Select, Button, Input, Card, Switch } from 'turtle-ui';
import Loader from '../../components/Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes';
import Machinable from '../../client';
import Nav from '../../components/DisplayNav';

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
                        <span>{hook['hook_url']}</span>
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
    render() {
        return (
			<div className="margin-top-more">logs</div>
        )
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
        const { hook, entity } = this.state;
        return (
            <Logs hook={hook} entity={entity} />
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
