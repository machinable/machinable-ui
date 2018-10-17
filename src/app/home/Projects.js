import React, { Component } from 'react';
import { Table, Button, Card } from 'turtle-ui';
import Loader from '../../components/Loader';
import ProjectIcon from '../../components/ProjectIcon';
import Empty from '../../images/outer_space.svg'

class Projects extends Component {

	constructor(props) {
        super(props);
		this.state = {
            loading: true,
            projects: [
                // {"icon": "rocket", "name": "Sample Blog", "description": "A sample blog that uses Machinable."},
                // {"icon": "brain", "name": "Mobile", "description": "A mobile app that stores blah blah on Machinable."},
                // {"icon": "flask", "name": "Todo App", "description": "A good ol' todo app.."}
            ]
		}
    }

    emptyState = () => {
        return (
            <div className="grid grid-8">
                <Card classes="project-hover col-2-8">
                    <h2 className="text-center">You don't have any projects yet</h2>
                    <img src={Empty} className="empty-state"/>
                    <br/>
                    <h3 className="text-center">Define API resources, store data, and manage users for your project!</h3>
                    <br/>
                    <div className="align-center">
                        <Button classes="accent">Create A Project</Button>
                    </div>
                </Card>
            </div>
        )
    }
    
    renderProjects = () => {
        return (
            <div className="grid grid-1">
                <div className="grid grid-3">
                    {this.state.projects.map(function(project, idx){
                        return(
                            <Card classes="project-hover" to={"/projects"}>
                                <h3 className="text-400 vertical-align no-margin"><ProjectIcon source={project.icon}/>&nbsp;&nbsp;{project.name}</h3>
                                <p>{project.description}</p>
                            </Card>
                        )
                    })}
                </div>
                <br/>
                <div className="grid grid-3">
                    <div></div>
                    <Button>New Project</Button>
                    {/* <Card classes="project-hover center-contents" state="alert">
                        <h4 className="text-400 center no-margin text-muted">New Project</h4>
                    </Card> */}
                </div>
            </div>
        )
    }

	componentDidMount = () => {		
		this.setState({loading: false});
	}

	render() {
        var render = this.state.projects.length > 0 ? this.renderProjects() : this.emptyState();

		return (
			<React.Fragment>
                {render}
            </React.Fragment>
		  );
	}
}


export default Projects;