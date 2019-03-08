import React, { Component } from 'react';
import { Button, Switch, Modal, Card } from 'turtle-ui';
import { connect } from 'react-redux';
import Statics from '../../Statics';
import Machinable from '../../client';
import {setProjectObject} from '../../store/projects/actionCreators';

class Settings extends Component {

	constructor(props) {
		super(props);
        this.state = {
			project: props.project,
			copyText: {
				projectName: "Copy",
				projectHost: "Copy"
			},
			loading: false,
			showDeleteModal: false
		}
	}

	updateResponse = (response) => {
		console.log(response);
		if(response.status === 200) {
			var updatedProject = response.data;
			this.props.dispatch(setProjectObject(updatedProject));
			this.setState({project: updatedProject});
		}
		else {
			console.log("error updating authn");
		}
	}

	componentDidMount = () => {		

	}

	componentDidUpdate = (prevProps) => {
		var newSlug = this.props.project.slug;
		var oldSlug = prevProps.project.slug;
		
		if (newSlug !== oldSlug) {
			this.setState({
				project: this.props.project
			})
		}
	}

	updateAuthn = () => {
		var proj = this.state.project;
		proj.authn = !proj.authn;
		Machinable.projects().update(proj, this.updateResponse, this.updateResponse);
	}

	revertCopyText = (id) => {
		setTimeout(function(){
			var copyText = this.state.copyText;
			copyText[id] = "Copy";
			this.setState({
				copyText: copyText
			});
		}.bind(this), 3000);
	}

	copyText = (id) => {
		var copyEl = document.getElementById(id);
		copyEl.select();
		document.execCommand("Copy");

		var copyText = this.state.copyText;
		copyText[id] = "Copied";
		this.setState({
			copyText: copyText
		}, () => this.revertCopyText(id));
	}

	closeDeleteModal = () => {
		this.setState({showDeleteModal: false});
	}

	openDeleteModal = () => {
		this.setState({showDeleteModal: true});
	}

	deleteProject = () => {
		this.setState({loading: true});
		Machinable.projects().delete(this.state.project.slug, this.viewProjects, this.deleteError);
	}
	
	deleteError = (response) => {
		console.log(response); 
		this.setState({loading: false});
	}

	viewProjects = () => {
		const history = this.props.history;
        history.push('/home/projects');
    }

	render() {
		var hostName = Statics.GenerateAPIHost(this.state.project.slug);
		return (
			<div>
				<div className="padding-side content-header">
					<h3 className="text-400 margin-bottom">Settings</h3>
					<p className="text-muted padding-bottom no-margin">Project configuration and settings</p>
				</div>

				<div className="project-content">
					<div className="grid grid-2">
						<div>
							<h3 className="margin-bottom">Name</h3>
							<p className="text-muted padding-bottom no-margin">The name of this project.</p>
						</div>
						<h3 className="vertical-align align-right text-muted">
							<Button classes="btn-small margin-left" onClick={() => this.copyText("projectName")}>{this.state.copyText.projectName}</Button><span>{this.state.project.name}</span>
							<textarea cols="1000" className="copy-text"  id="projectName" value={this.state.project.name} readOnly/>
						</h3>
					</div>
					<hr/>
					<div className="grid grid-2">
						<div>
							<h3 className="margin-bottom">Hostname</h3>
							<p className="text-muted padding-bottom no-margin">The project hostname used for API access.</p>
						</div>
						<h3 className="vertical-align align-right text-muted">
							<Button classes="btn-small margin-left" onClick={() => this.copyText("projectHost")}>{this.state.copyText.projectHost}</Button><span>{hostName}</span>
							<textarea cols="1000" className="copy-text"  id="projectHost" value={hostName} readOnly/>
						</h3>
					</div>
					<hr/>
					<div className="grid grid-2">
						<div>
							<h3 className="margin-bottom">Authentication Required</h3>
							<p className="text-muted padding-bottom no-margin">
								{this.state.project.authn && "Requests to collections and resources will require authentication"}
								{!this.state.project.authn && "Collections and resources are accessible to anyone with your project URL"}
							</p>
						</div>
						<div className="vertical-align align-right">
							<Switch on={this.state.project.authn} onChange={this.updateAuthn}/>
						</div>
					</div>
					<hr/>
					<div className="grid grid-2">
						<div>
							<h3 className="margin-bottom">Delete this Project</h3>
							<p className="text-muted padding-bottom no-margin">Once you delete a project, it cannot be undone. Please be certain.</p>
						</div>
						<div className="vertical-align align-right">
							<Button classes="danger plain" onClick={this.openDeleteModal}>Delete Project</Button>
						</div>
					</div>
					<hr/>
				</div>

				<Modal 
					close={this.closeDeleteModal}
					isOpen={this.state.showDeleteModal}>
                    <div className="align-center grid grid-3">
                        <div className="col-3-2">
                            <div className=" grid grid-1">
                                <Card
                                    classes="footer-plain no-border"
                                    footer={
                                        <div className="grid grid-2">
                                            <div className="col-2 col-right">
                                                <Button classes="plain text" onClick={this.closeDeleteModal}>Cancel</Button>	
                                                <Button classes="danger margin-left" type="submit" loading={this.state.loading} onClick={this.deleteProject}>Yes, I'm sure</Button>	
                                            </div>
                                        </div>
                                    }>

                                    <h2 className="text-center">Delete Project '{this.state.project.name}'</h2>
									<h3 className="text-center">Are you sure you want to delete <strong>{this.state.project.name}</strong>?</h3>
									<p className="text-center">
										This will delete all data stored in this project.
									</p>
									<p className="text-center">
										<strong>This cannot be undone, please be sure you want this project and all associated data to be permanently deleted.</strong>
									</p>
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
		project: state.project
	};
}
  
export default connect(mapStateToProps)(Settings);
