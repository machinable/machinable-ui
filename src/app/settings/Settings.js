import React, { Component } from 'react';
import { Button, Input, Switch } from 'turtle-ui';

class Settings extends Component {

	constructor(props) {
        super(props);
        
	}

	componentDidMount = () => {		

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
						<Input labelClasses="vertical-align" value="Project Zero" />
					</div>
					<hr/>
					<div className="grid grid-2">
						<div>
							<h3 className="margin-bottom">Hostname</h3>
							<p className="text-muted padding-bottom no-margin">The project hostname used for API access.</p>
						</div>
						<Input labelClasses="vertical-align" value="project-zero.mchbl.com" />
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
							<Switch on={true}/>
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


export default Settings;