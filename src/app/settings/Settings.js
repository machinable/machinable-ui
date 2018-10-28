import React, { Component } from 'react';
import { Button, Switch } from 'turtle-ui';
import { connect } from 'react-redux';
import Statics from '../../Statics';

class Settings extends Component {

	constructor(props) {
		super(props);
		console.log(props);
        this.state = {
			project: props.project
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

	render() {
		return (
			<div>
				<div className="padding-side content-header">
					<h2 className="text-400 margin-bottom">Settings</h2>
					<p className="text-muted padding-bottom no-margin">Project configuration and settings</p>
				</div>

				<div className="project-content">
					<div className="grid grid-2">
						<div>
							<h3 className="margin-bottom">Name</h3>
							<p className="text-muted padding-bottom no-margin">The name of this project.</p>
						</div>
						<h3 className="vertical-align align-right text-muted">
							<Button classes="btn-small margin-left">Copy</Button>{this.state.project.name}
						</h3>
					</div>
					<hr/>
					<div className="grid grid-2">
						<div>
							<h3 className="margin-bottom">Hostname</h3>
							<p className="text-muted padding-bottom no-margin">The project hostname used for API access.</p>
						</div>
						<h3 className="vertical-align align-right text-muted">
							<Button classes="btn-small margin-left">Copy</Button>{Statics.GenerateAPIHost(this.state.project.slug)}
						</h3>
					</div>
					<hr/>
					<div className="grid grid-2">
						<div>
							<h3 className="margin-bottom">Authentication Required</h3>
							<p className="text-muted padding-bottom no-margin">
								{"Requests to collections and resources will require authentication"}
								{/* {"Collections and resources are accessible to anyone with your project URL"} */}
							</p>
						</div>
						<div className="vertical-align align-right">
							<Switch on={this.state.project.authn}/>
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
