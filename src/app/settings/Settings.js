import React, { Component } from 'react';

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
					<p className="text-muted margin-top padding-bottom no-margin">Project settings</p>
				</div>

				<div className="project-content">
					Settings
				</div>
			</div>
		  );
	}
}


export default Settings;