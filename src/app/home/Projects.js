import React, { Component } from 'react';
import { Table, Button, Card } from 'turtle-ui';
import Loader from '../../components/Loader';
import ProjectIcon from '../../components/ProjectIcon';

class Projects extends Component {

	constructor(props) {
        super(props);
		this.state = {
			loading: true
		}
	}

	componentDidMount = () => {		
		this.setState({loading: false});
	}

	render() {

		return (
            <div className="grid grid-1">
                <div className="grid grid-3">
                <Card classes="project-hover" to={"/projects"}>
                        <h3 className="text-400 vertical-align no-margin"><ProjectIcon source="rocket"/>&nbsp;&nbsp;Sample Blog</h3>
                        <p>A sample blog that uses Machinable.</p>
                    </Card>
                    <Card classes="project-hover" to={"/projects"}>
                        <h3 className="text-400 vertical-align no-margin"><ProjectIcon source="brain"/>&nbsp;&nbsp;Mobile</h3>
                        <p>A mobile app that stores blah blah on Machinable.</p>
                    </Card>
                    <Card classes="project-hover" to={"/projects"}>
                        <h3 className="text-400 vertical-align no-margin"><ProjectIcon source="flask"/>&nbsp;&nbsp;Todo App</h3>
                        <p>A good ol' todo app..</p>
                    </Card>
                </div>
                <div className="grid grid-3">
                    <Card classes="project-hover center-contents" state="alert">
                        <h4 className="text-400 center no-margin text-muted">New Project</h4>
                    </Card>
                </div>
            </div>
		  );
	}
}


export default Projects;