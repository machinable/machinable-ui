import React, { Component } from 'react';
import { Switch} from 'turtle-ui';
import Machinable from '../../client';
import Statics from '../../Statics';
import ReactJson from 'react-json-view';
import Nav from '../../components/DisplayNav';
import moment from 'moment';

class Data extends Component {
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
		Machinable.resources(this.state.slug).data().list(this.state.path, this.dataSuccess, this.dataError);
	}

	componentDidMount = () => {		
		this.getData();
	}

	render() {
		return (
			<div className="margin-top-more code">
				<ReactJson collapsed={2} name={this.state.path} iconStyle="square" src={this.state.items} />
			</div>
		);
	}
}

class Schema extends Component {
	render() {
		return (
			<div className="margin-top-more code">
				<ReactJson name={"properties"} iconStyle="square" src={this.props.def.properties} />
			</div>
		);
	}
}

class Settings extends Component {
	constructor(props) {
        super(props);

		this.state = {
			read: props.def.parallel_read,
            write: props.def.parallel_write,
            def: props.def
		}
    }

    componentDidUpdate = (previousProps, previousState) => {
        if (previousProps.def.id !== this.props.def.id) {
            this.setState({
                read: this.props.def.parallel_read, 
                write: this.props.def.parallel_write,
                def: this.props.def});
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
		Machinable.resources(this.props.slug).update(this.state.def.id, update, this.toggleReadState, function(){});
    }
    
    updateWrite = () => {
        var update = {parallel_read: this.state.read, parallel_write: !this.state.write};
		Machinable.resources(this.props.slug).update(this.state.def.id, update, this.toggleWriteState, function(){});
	}

	render() {
		var fullURL = Statics.GenerateAPIHost(this.props.slug) + "/" + Statics.API + "/" + this.props.def.path_name;
		return (
			<div className="margin-top-more">
                <div className="grid grid-2">
                    <h4 className="margin-vertical-5">Name</h4>
                    <h4 className="margin-vertical-5 vertical-align align-right text-muted">
                        <span>{this.state.def.path_name}</span>
                    </h4>
                </div>
                <hr className="thin"/>
                <div className="grid grid-2">
                    <h4 className="margin-vertical-5">ID</h4>
                    <h4 className="margin-vertical-5 vertical-align align-right text-muted">
                        <span>{this.state.def.id}</span>
                    </h4>
                </div>
                <hr className="thin"/>
                <div className="grid grid-2">
                    <h4 className="margin-vertical-5">URL</h4>
                    <h4 className="margin-vertical-5 vertical-align align-right text-muted">
                        <a className="anchor" target="_blank" rel="noopener" href={fullURL} title={fullURL}>{fullURL}</a>
                    </h4>
                </div>
                <hr className="thin"/>
                <div className="grid grid-2">
                    <h4 className="margin-vertical-5">Created</h4>
                    <h4 className="margin-vertical-5 vertical-align align-right text-muted">
                        <span>{moment(this.state.def.created).format('MMMM Do YYYY, h:mm a')}</span>
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

class Details extends Component {
	constructor(props) {
        super(props);

		this.state = {
            navSelection: {text: "Settings", render: this.renderSettings}
		}
	}
	
	renderData = () => {
		return (
			<Data slug={this.props.slug} path={this.props.path}/>
		);
	}

	renderSettings = () => {
		return (
			<Settings slug={this.props.slug} path={this.props.path} def={this.props.definition}/>
		);
	}

	renderProperties = () => {
		return (
			<Schema slug={this.props.slug} path={this.props.path} def={this.props.definition}/>
		);
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
                        {text: "Properties", render: this.renderProperties},
                        {text: "Data", render: this.renderData}
                    ]}
                />
				{this.state.navSelection.render()}
			</div>
		);
	}
}

export default Details;