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


class Access extends Component {

    updateAccess = (field) => {
        var collection = this.props.collection;
        collection[field] = !collection[field]
        this.props.updateCollection(collection);
    }

	render() {
		return (
			<div className="margin-top-more">
            
                <div className="grid grid-3">
                    <div className="col-2 flex-col">
                        <h4 className="margin-vertical-5 vertical-align">Create</h4>
                        <p className="text-muted text-small no-margin">
                            {this.props.collection.create && "Authentication is required to create new objects"}
                            {!this.props.collection.create && "Anyone with the project URL can create objects"}
                        </p>
                    </div>
                    <div className="margin-vertical-5 vertical-align align-right">
                        <Switch on={this.props.collection.create} onChange={() => this.updateAccess('create')}/>
                    </div>
                </div>
                <hr className="thin"/>

                <div className="grid grid-3">
                    <div className="col-2 flex-col">
                        <h4 className="margin-vertical-5 vertical-align">Read</h4>
                        <p className="text-muted text-small no-margin">
                            {this.props.collection.read && "Authentication is required to read objects"}
                            {!this.props.collection.read && "Anyone with the project URL can read objects"}
                        </p>
                    </div>
                    <div className="margin-vertical-5 vertical-align align-right">
                        <Switch on={this.props.collection.read} onChange={() => this.updateAccess('read')}/>
                    </div>
                </div>
                <hr className="thin"/>

                <div className="grid grid-3">
                    <div className="col-2 flex-col">
                        <h4 className="margin-vertical-5 vertical-align">Update</h4>
                        <p className="text-muted text-small no-margin">
                            {this.props.collection.update && "Authentication is required to update objects"}
                            {!this.props.collection.update && "Anyone with the project URL can update objects"}
                        </p>
                    </div>
                    <div className="margin-vertical-5 vertical-align align-right">
                        <Switch on={this.props.collection.update} onChange={() => this.updateAccess('update')}/>
                    </div>
                </div>
                <hr className="thin"/>

                <div className="grid grid-3">
                    <div className="col-2 flex-col">
                        <h4 className="margin-vertical-5 vertical-align">Delete</h4>
                        <p className="text-muted text-small no-margin">
                            {this.props.collection.delete && "Authentication is required to delete objects"}
                            {!this.props.collection.delete && "Anyone with the project URL can delete objects"}
                        </p>
                    </div>
                    <div className="margin-vertical-5 vertical-align align-right">
                        <Switch on={this.props.collection.delete} onChange={() => this.updateAccess('delete')}/>
                    </div>
                </div>
                <hr className="thin"/>

                <div className="grid grid-3">
                    <div className="col-2 flex-col">
                        <h4 className="margin-vertical-5 vertical-align">Parallel Read</h4>
                        <p className="text-muted text-small no-margin">
                            {this.props.collection.parallel_read && "All objects are readable by all users"}
                            {!this.props.collection.parallel_read && "Users can only view objects that they have created"}
                        </p>
                    </div>
                    <div className="margin-vertical-5 vertical-align align-right">
                        <Switch on={this.props.collection.parallel_read} onChange={() => this.updateAccess('parallel_read')}/>
                    </div>
                </div>
                <hr className="thin"/>
                <div className="grid grid-3">
                    <div className="col-2 flex-col">
                        <h4 className="margin-vertical-5 vertical-align">Parallel Write</h4>
                        <p className="text-muted text-small no-margin">
                            {this.props.collection.parallel_write && "All objects can be edited and deleted by all users"}
                            {!this.props.collection.parallel_write && "Users can only edit/delete objects that they have created"}
                        </p>
                    </div>
                    <div className="margin-vertical-5 vertical-align align-right">
                        <Switch on={this.props.collection.parallel_write} onChange={() => this.updateAccess('parallel_write')}/>
                    </div>
                </div>
                <hr/>
            </div>
		);
	}
}

class CollectionSettings extends Component {
    render() {
        var fullURL = Statics.GenerateAPIHost(this.props.slug) + "/" + Statics.COLLECTIONS + "/" + this.props.collection.name;
		return (
			<div className="margin-top-more">
                {/* <ReactJson name={false} iconStyle="square" src={this.props.collection} /> */}
                <div className="grid grid-2">
                    <h4 className="margin-vertical-5">Name</h4>
                    <h4 className="margin-vertical-5 vertical-align align-right text-muted">
                        <span>{this.props.collection.name}</span>
                    </h4>
                </div>
                <hr className="thin"/>
                <div className="grid grid-2">
                    <h4 className="margin-vertical-5">ID</h4>
                    <h4 className="margin-vertical-5 vertical-align align-right text-muted">
                        <span>{this.props.collection.id}</span>
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
                        <span>{moment(this.props.collection.created).format('MMMM Do YYYY, h:mm a')}</span>
                    </h4>
                </div>
                <hr className="thin"/>
            </div>
		);
	}
}

class Details extends Component {
	constructor(props) {
        super(props);

		this.state = {
            navSelection: {text: "Details", render: this.renderSettings},
            collection: props.collection
		}
    }
    
    updated = (collection) => {
        this.setState({
            collection: collection
        });
    }

    updateCollection = (collection) => {
        var doUpdate = this.updated;
        Machinable.collections(this.props.slug)
            .update(
                this.state.collection.id, 
                collection, 
                function(response){
                    doUpdate(collection);
                }, 
                function(response){console.log(response);});
    }
	
	renderData = () => {
		return(
			<CollectionData slug={this.props.slug} path={this.state.collection.name}/>
		)
	}

	renderSettings = () => {
		return(
			<CollectionSettings slug={this.props.slug} collection={this.state.collection}/>
		)
	}

    renderAccess = () => {
		return (
			<Access slug={this.props.slug} path={this.props.path} collection={this.state.collection} updateCollection={this.updateCollection}/>
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
  
export default connect(mapStateToProps)(Details);