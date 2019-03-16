import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, Card, Input, Dropdown, List, ListItem, Table, TextArea } from 'turtle-ui';
import Loader from '../../components/Loader';
import Dismiss from '../../components/DismissModalButton';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faEllipsis from '@fortawesome/fontawesome-free-solid/faEllipsisV';
import Empty from '../../images/empty_board.svg';
import Machinable from '../../client';
import Statics from '../../Statics';
import Data from './Details';
import slugify from 'slugify';
import moment from 'moment';
import MonacoEditor from 'react-monaco-editor';

class Resources extends Component {

	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			resources: {items:[]},
			showModal: false,
			showExtraModal: false,
			showDeleteModal: false,
			slug: props.slug,
			newResource: {
				errors: [],
				title: "",
				path_name: "",
				properties: undefined
			},
			extraElement: <div>nothing selected</div>,
			deleteResource: {}
		}
	}

	resError = (response) => {
		console.log(response);
		this.setState({loading: false});
	}

	resSuccess = (response) => {
		this.setState({resources: response.data, loading: false, newResource: {
			title: "",
			path_name: "",
			errors: [],
			properties: undefined
		}}, this.closeModal);
	}

	getResources = () => {
		Machinable.resources(this.state.slug).list(this.resSuccess, this.resError);
	}

	closeModal = () => {
		var html = document.getElementsByTagName('html')[0];
        html.style.cssText = "--root-overflow: auto";
		this.setState({showModal: false, showDeleteModal: false, newResource: {
			title: "",
			path_name: "",
			errors: [],
			properties: undefined
		}});
	}

	openModal = () => {
		var html = document.getElementsByTagName('html')[0];
        html.style.cssText = "--root-overflow: hidden";
		this.setState({showModal: true});
	}

	closeExtraModal = () => {
		var html = document.getElementsByTagName('html')[0];
        html.style.cssText = "--root-overflow: auto";
		this.setState({showExtraModal: false, showDeleteModal: false});
	}

	openExtraModal = (element) => {
		var html = document.getElementsByTagName('html')[0];
        html.style.cssText = "--root-overflow: hidden";
		this.setState({showExtraModal: true, extraElement: element});
	}

	openDeleteModal = (resource) => {
		var html = document.getElementsByTagName('html')[0];
        html.style.cssText = "--root-overflow: hidden";
		this.setState({showDeleteModal: true, deleteResource: resource});
	}

	deleteResource = () => {
		this.setState({loading: true});
		Machinable.resources(this.state.slug).delete(this.state.deleteResource.id, this.getResources, this.resError);
	}

	onChange = (event) => {
	    const target = event.target;
	    var value = target.value;
	    const name = target.name;

		var newResource = this.state.newResource;
		

		if (name === "title") {
			newResource["path_name"] = value;
		} 
		else if (name === "path_name") {
			var vals = value.split("/")
			if (vals.length > 1) {
				value = value.split("/")[1];
			}
		}
		else if (name === "properties") {
			try{
				var temp = JSON.parse(value);
				temp = JSON.stringify(temp, undefined, 4);
				value = temp;
			}catch(err){}
		}

		newResource[name] = value;

		// slugify path name
		newResource["path_name"] = slugify(newResource["path_name"], {
										replacement: '-',
										remove: null,  
										lower: false
									});

	    this.setState({
	    	newResource: newResource
	    });
	}

	saveError = (response) => {
		console.log(response);

		var newResource = this.state.newResource;
		newResource.errors.push(response.data.error);

		this.setState({
			newResource: newResource
		});
	}

	saveSuccess = (response) => {
		this.getResources()
	}

	saveResource = () => {
		var errors = [];
		var newResource = this.state.newResource;
		newResource.errors = [];
		this.setState({
			newResource: newResource
		});
		if (newResource.title === "") {
			errors.push("Resource title cannot be empty.");
		}
		if (newResource.path_name === "") {
			errors.push("Resource path cannot be empty.");
		}
		if (newResource.properties === undefined) {
			errors.push("A resource must have at least one property.");
		} else {
			try {
				JSON.parse(newResource.properties);
			} catch(err) {
				errors.push(err.message);
			}
		}

		if (errors.length > 0) {
			newResource.errors = errors;
			this.setState({
				newResource: newResource
			});
			return;
		}

		var payload = {
			"title": newResource.title,
			"path_name": newResource.path_name,
			"properties": JSON.parse(newResource.properties)
		};

		Machinable.resources(this.state.slug).create(payload, this.saveSuccess, this.saveError)
	}

	componentDidMount = () => {		
		this.getResources();
	}

	getResourceTable = () => {
		var resourceValues = this.state.resources.items.map(function(def, idx){
			var fullURL = Statics.GenerateAPIHost(this.state.slug) + "/api/" + def.path_name;
			var definitionTitle = <div>
										<h4 className="text-400 no-margin margin-bottom-less">{def.title}</h4>
										<div className="text-small text-information">
											<a className="anchor" target="_blank" rel="noopener" href={fullURL} title={fullURL}>{fullURL}</a>
										</div>
									</div>;
			return [
				definitionTitle,
				<div>{moment(def.created).fromNow()}</div>,
				<Dropdown 
					showIcon={true}
					width={250}
					buttonText={Object.keys(def.properties).length + " Properties"}
					buttonClasses="text plain text-information vertical-align">
					<div className="grid grid-1">
						<List>
							{Object.keys(def.properties).map(function(key, pidx){
								var prop = def.properties[key];
								var desc = prop.description === undefined ? null : <div>&nbsp;&nbsp;{prop.description}</div>;
								var title = <div><span className="text-400">{key}</span>&nbsp;-&nbsp;<i className={"text-" + prop.type}>{prop.type}</i></div>
								return (
									<ListItem 
										key={"res-prop-" + idx + pidx}
										title={title}
										description={desc}/>
								)
							})}
						</List>
					</div>
				</Dropdown>,
				<div className="align-right vertical-align">
					<Dropdown 
						showIcon={false}
						width={150}
						buttonText={<FontAwesomeIcon className="text-muted" icon={faEllipsis} />}
						buttonClasses="text plain vertical-align"
						classes="align-items-right">
						<div className="grid grid-1">
							<List>
								<ListItem title={<div className="text-center text-400">More</div>} onClick={() => this.openExtraModal(<Data title={definitionTitle} definition={def} slug={this.state.slug} path={def.path_name} />)}/>
								<hr className="no-margin no-padding"/>
								<ListItem title={<div className="text-center text-danger text-400">Delete</div>} onClick={() => this.openDeleteModal(def)}/>
							</List>
						</div>
					</Dropdown>
				</div>
			]
		}, this);

		return (
			<React.Fragment>
				<Table 
					classes="m-table"
					headers={["Name", "Created", <div className="align-center m-th">Properties</div>, ""]}
					values={resourceValues} />

				<Button classes="accent page-btn" onClick={this.openModal}>New Resource</Button>
			</React.Fragment>
		);
	}

	emptyState = () => {
		return (
			<div className="grid grid-1">
                <div className="align-center flex-col">
					<h2 className="text-center">Get started with a new API Resource</h2>
                    <img src={Empty} alt="" className="empty-state-sm"/>
                    <h3 className="text-center">Define an API Resource that will validate user submitted data</h3>
					<div className="align-center">
                        <Button classes="accent" onClick={this.openModal}>Create A Resource</Button>
                    </div>
				</div>
            </div>
		);
	}

	render() {
		var renderResources = Object.keys(this.state.resources.items).length > 0 ? this.getResourceTable() : this.emptyState();

		var sampleSchema = JSON.stringify({
			"firstName": {
				"type": "string",
				"description": "The person's first name."
			  },
			  "lastName": {
				"type": "string",
				"description": "The person's last name."
			  },
			  "age": {
				"description": "Age in years which must be equal to or greater than zero.",
				"type": "integer",
				"minimum": 0
			  }
		}, undefined, 4);

		var newProperties = this.state.newResource.properties;

		try {
			newProperties = JSON.parse(newProperties);
			newProperties = JSON.stringify(newProperties, undefined, 4);
		} catch(err) {}

		return (
			<div>
				<Loader loading={this.state.loading} />
				{!this.state.loading && renderResources}
				
				<Modal
					classes="from-right"
					close={this.closeExtraModal}
					isOpen={this.state.showExtraModal}>
					<div className="full-height grid grid-4">
						<div className="col-2-5">
							<div className="grid grid-1">
								<Card 
									classes="footer-plain no-border"
									footer={
										<div className="grid grid-2">
											<div className="col-2 col-right">
												<Button classes="plain text" onClick={this.closeExtraModal}>Close</Button>	
											</div>
										</div>
									}>
									{this.state.extraElement}
								</Card>
							</div>
						</div>
					</div>
				</Modal>

				<Modal 
					close={this.closeExtraModal}
					isOpen={this.state.showDeleteModal}>
                    <div className="align-center grid grid-3">
                        <div className="col-3-2">
                            <div className=" grid grid-1">
                                <Card
                                    classes="footer-plain no-border"
                                    footer={
                                        <div className="grid grid-2">
                                            <div className="col-2 col-right">
                                                <Button classes="plain text" onClick={this.closeExtraModal}>Cancel</Button>	
                                                <Button classes="danger margin-left" type="submit" loading={this.state.loading} onClick={this.deleteResource}>Yes, I'm sure</Button>	
                                            </div>
                                        </div>
                                    }>
									<Dismiss onClick={this.closeExtraModal}/>
                                    <h2 className="text-center">Delete Resource</h2>
									<h3 className="text-center">Are you sure you want to delete <strong>{this.state.deleteResource.title}</strong>?</h3>
									<p className="text-center">
										This will delete the definition and remove all data stored for this resource. This cannot be undone.
									</p>
                                </Card>
                            </div>
                        </div>
                    </div>
                </Modal>

				<Modal
					classes="from-right"
					close={this.closeModal}
					isOpen={this.state.showModal}>

					<div className="full-height grid grid-5">
						<div className="col-3-5 grid-column-end-6">
							<div className="grid grid-1">
								<Card 
									classes="footer-plain no-border"
									footer={
										<div className="grid grid-2">
											<div className="col-2 col-right">
												<Button classes="accent" onClick={this.saveResource}>Save</Button>	
												<Button classes="plain text" onClick={this.closeModal}>Cancel</Button>	
											</div>
										</div>
									}>
									<div className="modal-header">
										<h2 className="text-400 margin-bottom no-margin-top">Create a resource</h2>
										<p className="text-muted margin-top margin-bottom-even-more">Configure an API Resource to store structured data</p>
									</div>
									<div className="grid grid-1">
										{this.state.newResource.errors.length > 0 &&
											<div className="text-danger">
												{this.state.newResource.errors.map(function(error, i){
													return(
														<div>{error}</div>
													)
												})}
											</div>
										}
										
										<Input placeholder="descriptive title of the resource" label="Title" name="title" value={this.state.newResource.title} onChange={this.onChange}/>
										<Input placeholder="the url path of this resource" label="Path" name="path_name" value={"/" + this.state.newResource.path_name} onChange={this.onChange}/>
										{/* <TextArea 
											placeholder={sampleSchema} 
											label="Properties" 
											description={
												<div className="margin-top-less text-medium text-muted">
													Define your resource properties using <a className="link text-400 text-information" target="_blank" rel="noopener" href="https://json-schema.org/">JSON Schema</a>. 
													Check out our <a className="link text-400 text-information" target="_blank" rel="noopener" href={Statics.DOCS.JSON_SCHEMA_SAMPLES}>samples schemas</a> to get an idea of how to structure your data.
												</div>} 
											name="properties" 
											rows={18} 
											value={newProperties} 
											onChange={this.onChange}/> */}
										
										<MonacoEditor
											width="100%"
											height="400"
											theme="vs"
											language="json"/>
									</div>
								</Card>
							</div>
						</div>
					</div>
				</Modal>
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
  
export default connect(mapStateToProps)(Resources);