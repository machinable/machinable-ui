import React, { Component } from 'react';
import { Button, Modal, Card, Input, Select } from 'turtle-ui';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faPlus from '@fortawesome/fontawesome-free-solid/faPlusCircle';
import Machinable from '../../client';
import ReactJson from 'react-json-view';

class Resources extends Component {

	constructor(props) {
		super(props);
		this.state = {
			resources: {},
			showModal: false,
			newResource: {
				title: "",
				path_name: "",
				properties: [{title: "", type: "", description: ""}]
			}
		}
	}

	resError = (response) => {
		console.log(response)
	}

	resSuccess = (response) => {
		this.setState({resources: response.data});
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
			properties: [{title: "", type: "", description: ""}]
		}});
	}

	openModal = () => {
		var html = document.getElementsByTagName('html')[0];
        html.style.cssText = "--root-overflow: hidden";
		this.setState({showModal: true});
	}

	addProperty = () => {
		var newResource = this.state.newResource;
		newResource.properties.push({title: "", type: "", description: ""})

		this.setState({newResource: newResource});
	}

	componentDidMount = () => {		
		this.getResources();
	}

	render() {
		const typeOptions = [
			{value: "string", text:"string"}, 
			{value: "integer", text:"integer"}, 
			{value: "number", text:"number"}, 
			{value: "boolean", text:"boolean"}];
		return (
			<div className="grid grid-1">
				<ReactJson collapsed={3} name={false} displayDataTypes={false} iconStyle="square" src={this.state.resources} />
				<Button classes="accent page-btn" onClick={this.openModal}>New Resource</Button>

				<Modal
					classes="from-right"
					close={this.closeModal}
					isOpen={this.state.showModal}>

					<div className="full-height grid grid-4">
						<div className="col-2-5">
							<div className="grid grid-1">
								<Card 
									classes="footer-plain no-border"
									footer={
										<div className="grid grid-2">
											<div className="col-2 col-right">
												<Button classes="accent" onClick={this.closeModal}>Save</Button>	
												<Button classes="plain text" onClick={this.closeModal}>Cancel</Button>	
											</div>
										</div>
									}>
									<div className="modal-header">
										<h2 className="text-400 margin-bottom no-margin-top">Create a resource</h2>
										<p className="text-muted margin-top margin-bottom-even-more">Configure an API Resource to store structured data</p>
									</div>
									<div className="grid grid-1">
										<Input placeholder="descriptive title of the resource" label="Title" name="title"/>
										<Input placeholder="the url path of this resource" label="Path" name="path"/>
										<div>
											<strong>Properties</strong>
											<div className="grid grid-3 margin-top-more">
												<span className="text-muted">Key</span><span className="text-muted">Type</span><span className="text-muted">Description</span>
												{this.state.newResource.properties.map(function(item, idx){
													return (
														<React.Fragment>
															<Input placeholder="key" name="key"/>
															<Select placeholder="type" options={typeOptions} />
															<Input placeholder="description" name="path"/>
														</React.Fragment>
													)
												})}

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