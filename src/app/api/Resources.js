import React, { Component } from 'react';
import { Button, Modal, Card, Input, Select } from 'turtle-ui';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faPlus from '@fortawesome/fontawesome-free-solid/faPlusCircle';
import faTrash from '@fortawesome/fontawesome-free-solid/faTrash';
import Machinable from '../../client';
import ReactJson from 'react-json-view';
import slugify from 'slugify';

class Resources extends Component {

	constructor(props) {
		super(props);
		this.state = {
			resources: {},
			showModal: false,
			newResource: {
				errors: [],
				title: "",
				path_name: "",
				properties: [{key: "", type: "string", description: ""}]
			}
		}
	}

	resError = (response) => {
		console.log(response)
	}

	resSuccess = (response) => {
		this.setState({resources: response.data}, this.closeModal);
	}

	getResources = () => {
		Machinable.resources().list(this.resSuccess, this.resError);
	}

	closeModal = () => {
		var html = document.getElementsByTagName('html')[0];
        html.style.cssText = "--root-overflow: auto";
		this.setState({showModal: false, newResource: {
			title: "",
			path_name: "",
			errors: [],
			properties: [{key: "", type: "string", description: ""}]
		}});
	}

	openModal = () => {
		var html = document.getElementsByTagName('html')[0];
        html.style.cssText = "--root-overflow: hidden";
		this.setState({showModal: true});
	}

	addProperty = () => {
		var newResource = this.state.newResource;
		newResource.properties.push({key: "", type: "string", description: ""});

		this.setState({newResource: newResource});
	}

	onChange = (event) => {
	    const target = event.target;
	    var value = target.value;
	    const name = target.name;

		var newResource = this.state.newResource;
		

		if (name == "title") {
			newResource["path_name"] = value.toLowerCase();
		} 
		else if (name == "path_name") {
			var vals = value.split("/")
			if (vals.length > 1) {
				value = value.split("/")[1];
			}
		}

		newResource[name] = value;

		// slugify path name
		newResource["path_name"] = slugify(newResource["path_name"], {
										replacement: '-',
										remove: null,  
										lower: true
									})

	    this.setState({
	    	newResource: newResource
	    });
	}
	  
	onChangeProperty = (event, idx) => {
		const target = event.target;
		var value = target.value;
		const name = target.name;
		console.log("name : " + name);
		console.log("value : " + value);
		
		var newResource = this.state.newResource;
		newResource.properties[idx][name] = value;

		this.setState({
			newResource: newResource
		});
	}

	onDeleteProperty = (idx) => {
		console.log("delete " + idx);
		var newResource = this.state.newResource;
		console.log(newResource.properties);
		newResource.properties.splice(idx, 1);

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
		if (newResource.title == "") {
			errors.push("Resource title cannot be empty.");
		}
		if (newResource.path_name == "") {
			errors.push("Resource path cannot be empty.");
		}
		if (newResource.properties.length == 0) {
			errors.push("A resource must have at least one property.");
		}

		for (let index = 0; index < newResource.properties.length; index++) {
			const element = newResource.properties[index];
			if (element.key == "") {
				errors.push("Property key cannot be empty.")
			}
		}

		if (errors.length > 0) {
			console.log(errors);
			newResource.errors = errors;
			this.setState({
				newResource: newResource
			});
			return;
		}

		var payload = {
			"title": newResource.title,
			"path_name": newResource.path_name,
			"properties": {}
		};

		for (let index = 0; index < newResource.properties.length; index++) {
			const element = newResource.properties[index];
			payload.properties[element.key] = {type: element.type, description: element.description};
		}

		Machinable.resources().create(payload, this.saveSuccess, this.saveError)
	}

	componentDidMount = () => {		
		this.getResources();
	}

	render() {
		const typeOptions = [
			{value: "string", text:"string"}, 
			{value: "integer", text:"integer"}, 
			{value: "number", text:"number"}, 
			{value: "boolean", text:"boolean"},
			{value: "array", text:"array"},
			{value: "object", text:"object"} ];
		return (
			<div className="grid grid-1">
				<ReactJson collapsed={3} name={false} displayDataTypes={false} iconStyle="square" src={this.state.resources} />
				<Button classes="accent page-btn" onClick={this.openModal}>New Resource</Button>

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
										<div>
											<strong>Properties</strong>
											<div className="grid margin-top-more">
												<span className="col-2 text-muted">Key</span>
												<span className="col-4 text-muted">Type</span>
												<span className="col-5 text-muted">Description</span>
												<span></span>
												{this.state.newResource.properties.map(function(item, idx){
													return (
														<React.Fragment key={"new_property_" + idx}>
															<Input labelClasses="col-2" placeholder="key" name="key" value={this.state.newResource.properties[idx].key} onChange={(event) => this.onChangeProperty(event, idx)}/>
															<div className="col-4 flex">
																<Select labelClasses="flex-grow" placeholder="type" name="type" value={this.state.newResource.properties[idx].type} options={typeOptions} onChange={(event) => this.onChangeProperty(event, idx)}/>
																
																{/* {this.state.newResource.properties[idx].type == "string" && <Select labelClasses="flex-grow margin-left" placeholder="format" name="format"/>}
																{this.state.newResource.properties[idx].type == "array" && <Select labelClasses="flex-grow" placeholder="item type" name="item type"/>} */}

															</div>
															<Input labelClasses="col-5" placeholder="description" name="description" value={this.state.newResource.properties[idx].description}  onChange={(event) => this.onChangeProperty(event, idx)}/>
															<Button classes="text plain no-click" onClick={() => this.onDeleteProperty(idx)}>
																<FontAwesomeIcon icon={faTrash} fixedWidth/>
															</Button>	
														</React.Fragment>
													)
												}, this)}

											</div>
											<Button classes="btn-small margin-top vertical-align" onClick={this.addProperty}>
												<FontAwesomeIcon icon={faPlus} fixedWidth/>&nbsp;Add Property
											</Button>	
										</div>
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


export default Resources;