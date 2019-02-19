import React, { Component } from 'react';
import { Button, Switch } from 'turtle-ui';
import { connect } from 'react-redux';
import Statics from '../../Statics';
import Machinable from '../../client';
import {setProjectObject} from '../../store/projects/actionCreators';

class Settings extends Component {

	constructor(props) {
		super(props);
        this.state = {
			project: props.project
		}
	}

	updateResponse = (response) => {
		console.log(response);
		if(response.status == 200) {
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

	copyText = (id) => {
		var copyText = document.getElementById(id);
		copyText.select();
		document.execCommand("Copy");
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
							<Button classes="btn-small margin-left" onClick={() => this.copyText("projectName")}>Copy</Button><span>{this.state.project.name}</span>
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
							<Button classes="btn-small margin-left" onClick={() => this.copyText("projectHost")}>Copy</Button><span>{hostName}</span>
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
							<Button classes="danger plain">Delete Project</Button>
						</div>
					</div>
					<hr/>
				</div>
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
