import React, { Component } from 'react';

class Access extends Component {

	constructor(props) {
        super(props);
        
	}

	componentDidMount = () => {		

	}

	render() {
		return (
			<div>
				<div className="padding-side content-header">
					<h2 className="text-400 margin-bottom">Access</h2>
					<p className="text-muted padding-bottom no-margin">Manage users of this project</p>
				</div>

				<div className="project-content">
                    User list
				</div>
			</div>
		  );
	}
}


export default Access;