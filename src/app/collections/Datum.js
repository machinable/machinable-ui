import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch } from 'turtle-ui';
import Nav from '../../components/DisplayNav';
import Machinable from '../../client';
import Statics from '../../Statics';
import ReactJson from 'react-json-view';
import moment from 'moment';

class CollectionData extends Component {
	constructor(props) {
		super(props);
		this.state = {
			slug: props.slug,
			path: props.path,
			items: {}
		}
	}

	dataError = (response) => {
		console.log(response)
	}

	dataSuccess = (response) => {
		this.setState({items: response.data});
	}

	getData = () => {
		Machinable.collections(this.state.slug).data().list(this.state.path, this.dataSuccess, this.dataError);
	}

	componentDidMount = () => {		
		this.getData();
	}

	render() {
		return (
			<div className="margin-top-more code">
				<ReactJson collapsed={2} name={false} iconStyle="square" src={this.state.items} />
			</div>
		);
	}
}

class CollectionSettings extends Component {
    constructor(props) {
        super(props);

		this.state = {
			read: props.collection.parallel_read,
            write: props.collection.parallel_write,
            collection: props.collection
		}
    }

    componentDidUpdate = (previousProps, previousState) => {
        if (previousProps.collection.id !== this.props.collection.id) {
            this.setState({
                read: this.props.collection.parallel_read, 
                write: this.props.collection.parallel_write,
                collection: this.props.collection});
        }
    }

    toggleReadState = () => {
        this.setState({read: !this.state.read})
    }

    toggleWriteState = () => {
        this.setState({write: !this.state.write})
    }

    updateRead = () => {
        var update = {parallel_read: !this.state.read, parallel_write: this.state.write};
		Machinable.collections(this.props.slug).update(this.state.collection.id, update, this.toggleReadState, function(){});
    }
    
    updateWrite = () => {
        var update = {parallel_read: this.state.read, parallel_write: !this.state.write};
		Machinable.collections(this.props.slug).update(this.state.collection.id, update, this.toggleWriteState, function(){});
	}

    render() {
        var fullURL = Statics.GenerateAPIHost(this.props.slug) + "/" + Statics.COLLECTIONS + "/" + this.state.collection.name;
		return (
			<div className="margin-top-more">
                {/* <ReactJson name={false} iconStyle="square" src={this.props.collection} /> */}
                <div className="grid grid-2">
                    <h4 className="margin-vertical-5">Name</h4>
                    <h4 className="margin-vertical-5 vertical-align align-right text-muted">
                        <span>{this.state.collection.name}</span>
                    </h4>
                </div>
                <hr className="thin"/>
                <div className="grid grid-2">
                    <h4 className="margin-vertical-5">ID</h4>
                    <h4 className="margin-vertical-5 vertical-align align-right text-muted">
                        <span>{this.state.collection.id}</span>
                    </h4>
                </div>
                <hr className="thin"/>
                <div className="grid grid-2">
                    <h4 className="margin-vertical-5">URL</h4>
                    <h4 className="margin-vertical-5 vertical-align align-right text-muted">
                        <a className="anchor" target="_blank" rel="noopener noreferrer" href={fullURL} title={fullURL}>{fullURL}</a>
                    </h4>
                </div>
                <hr className="thin"/>
                <div className="grid grid-2">
                    <h4 className="margin-vertical-5">Created</h4>
                    <h4 className="margin-vertical-5 vertical-align align-right text-muted">
                        <span>{moment(this.state.collection.created).format('MMMM Do YYYY, h:mm a')}</span>
                    </h4>
                </div>
                <hr className="thin"/>
                <div className="grid grid-3">
                    <div className="col-2 flex-col">
                        <h4 className="margin-vertical-5 vertical-align">Parallel Read</h4>
                        <p className="text-muted text-small no-margin">
                            {this.state.read && "All objects are readable by all users"}
                            {!this.state.read && "Users can only view objects that they have created"}
                        </p>
                    </div>
                    <div className="margin-vertical-5 vertical-align align-right">
                        <Switch on={this.state.read} onChange={this.updateRead}/>
                    </div>
                </div>
                <hr className="thin"/>
                <div className="grid grid-3">
                    <div className="col-2 flex-col">
                        <h4 className="margin-vertical-5 vertical-align">Parallel Write</h4>
                        <p className="text-muted text-small no-margin">
                            {this.state.write && "All objects can be edited and deleted by all users"}
                            {!this.state.write && "Users can only edit/delete objects that they have created"}
                        </p>
                    </div>
                    <div className="margin-vertical-5 vertical-align align-right">
                        <Switch on={this.state.write} onChange={this.updateWrite}/>
                    </div>
                </div>
                <hr/>
            </div>
		);
	}
}

class Datum extends Component {
	constructor(props) {
        super(props);

		this.state = {
            navSelection: {text: "Settings", render: this.renderSettings}
		}
    }

    componentDidUpdate = (previousProps, previousState) => {
        if (previousState.navSelection.text !== "Settings") {
            this.setState({navSelection: {text: "Settings", render: this.renderSettings}});
        }
    }

	renderData = () => {
		return(
			<CollectionData slug={this.props.slug} path={this.props.collection.name}/>
		)
	}

	renderSettings = () => {
		return(
			<CollectionSettings slug={this.props.slug} collection={this.props.collection}/>
		)
	}

	toggleNav = (link) => {
        console.log(link);
        this.setState({navSelection: link});
    }

	render() {
		return (
			<div>
				{this.props.title}
				<Nav
                    onClickCallback={this.toggleNav}
                    classes="horizontal link-underline underline margin-top-more" 
                    selected={this.state.navSelection.text}
                    links={[
                        {text: "Settings", render: this.renderSettings},
                        {text: "Data", render: this.renderData}
                    ]}
                />
				{this.state.navSelection.render()}
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
  
export default connect(mapStateToProps)(Datum);