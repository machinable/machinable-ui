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
		Machinable.resources(this.state.slug).data().list(this.props.path, this.dataSuccess, this.dataError);
	}

	componentDidMount = () => {		
		this.getData();
	}

	render() {
		return (
			<div className="margin-top-more code">
				<ReactJson collapsed={2} name={this.props.path} iconStyle="square" src={this.state.items} />
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
            def: props.def
		}
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
                        <a className="anchor" target="_blank" rel="noopener noreferrer" href={fullURL} title={fullURL}>{fullURL}</a>
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
            </div>
		);
	}
}

class Access extends Component {

    updateAccess = (field) => {
        var def = this.props.def;
        def[field] = !def[field]
        this.props.updateDefinition(def);
    }

	render() {
		return (
			<div className="margin-top-more">
            
                <div className="grid grid-3">
                    <div className="col-2 flex-col">
                        <h4 className="margin-vertical-5 vertical-align">Create</h4>
                        <p className="text-muted text-small no-margin">
                            {this.props.def.create && "Authentication is required to create new objects"}
                            {!this.props.def.create && "Anyone with the project URL can create objects"}
                        </p>
                    </div>
                    <div className="margin-vertical-5 vertical-align align-right">
                        <Switch on={this.props.def.create} onChange={() => this.updateAccess('create')}/>
                    </div>
                </div>
                <hr className="thin"/>

                <div className="grid grid-3">
                    <div className="col-2 flex-col">
                        <h4 className="margin-vertical-5 vertical-align">Read</h4>
                        <p className="text-muted text-small no-margin">
                            {this.props.def.read && "Authentication is required to read objects"}
                            {!this.props.def.read && "Anyone with the project URL can read objects"}
                        </p>
                    </div>
                    <div className="margin-vertical-5 vertical-align align-right">
                        <Switch on={this.props.def.read} onChange={() => this.updateAccess('read')}/>
                    </div>
                </div>
                <hr className="thin"/>

                <div className="grid grid-3">
                    <div className="col-2 flex-col">
                        <h4 className="margin-vertical-5 vertical-align">Update</h4>
                        <p className="text-muted text-small no-margin">
                            {this.props.def.update && "Authentication is required to update objects"}
                            {!this.props.def.update && "Anyone with the project URL can update objects"}
                        </p>
                    </div>
                    <div className="margin-vertical-5 vertical-align align-right">
                        <Switch on={this.props.def.update} onChange={() => this.updateAccess('update')}/>
                    </div>
                </div>
                <hr className="thin"/>

                <div className="grid grid-3">
                    <div className="col-2 flex-col">
                        <h4 className="margin-vertical-5 vertical-align">Delete</h4>
                        <p className="text-muted text-small no-margin">
                            {this.props.def.delete && "Authentication is required to delete objects"}
                            {!this.props.def.delete && "Anyone with the project URL can delete objects"}
                        </p>
                    </div>
                    <div className="margin-vertical-5 vertical-align align-right">
                        <Switch on={this.props.def.delete} onChange={() => this.updateAccess('delete')}/>
                    </div>
                </div>
                <hr className="thin"/>

                <div className="grid grid-3">
                    <div className="col-2 flex-col">
                        <h4 className="margin-vertical-5 vertical-align">Parallel Read</h4>
                        <p className="text-muted text-small no-margin">
                            {this.props.def.parallel_read && "All objects are readable by all users"}
                            {!this.props.def.parallel_read && "Users can only view objects that they have created"}
                        </p>
                    </div>
                    <div className="margin-vertical-5 vertical-align align-right">
                        <Switch on={this.props.def.parallel_read} onChange={() => this.updateAccess('parallel_read')}/>
                    </div>
                </div>
                <hr className="thin"/>
                <div className="grid grid-3">
                    <div className="col-2 flex-col">
                        <h4 className="margin-vertical-5 vertical-align">Parallel Write</h4>
                        <p className="text-muted text-small no-margin">
                            {this.props.def.parallel_write && "All objects can be edited and deleted by all users"}
                            {!this.props.def.parallel_write && "Users can only edit/delete objects that they have created"}
                        </p>
                    </div>
                    <div className="margin-vertical-5 vertical-align align-right">
                        <Switch on={this.props.def.parallel_write} onChange={() => this.updateAccess('parallel_write')}/>
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
            navSelection: {text: "Details", render: this.renderSettings},
            definition: props.definition
		}
    }
    
    updated = (definition) => {
        this.setState({
            definition: definition
        });
    }

    updateDefinition = (definition) => {
        var doUpdate = this.updated;
        Machinable.resources(this.props.slug)
            .update(
                this.state.definition.id, 
                definition, 
                function(response){
                    doUpdate(definition);
                }, 
                function(response){console.log(response);});
    }
	
	renderData = () => {
		return (
			<Data slug={this.props.slug} path={this.props.path}/>
		);
	}

	renderSettings = () => {
		return (
			<Settings slug={this.props.slug} path={this.props.path} def={this.state.definition}/>
		);
	}

	renderProperties = () => {
		return (
			<Schema slug={this.props.slug} path={this.props.path} def={this.state.definition}/>
		);
    }
    
    renderAccess = () => {
		return (
			<Access slug={this.props.slug} path={this.props.path} def={this.state.definition} updateDefinition={this.updateDefinition}/>
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
                        {text: "Details", render: this.renderSettings},
                        {text: "Access", render: this.renderAccess},
                        {text: "Schema", render: this.renderProperties},
                        {text: "Data", render: this.renderData}
                    ]}
                />
				{this.state.navSelection.render()}
			</div>
		);
	}
}

export default Details;