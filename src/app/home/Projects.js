import React, { Component } from 'react';
import { TextArea, Modal, Input, Button, Card } from 'turtle-ui';
import Loader from '../../components/Loader';
import ProjectIcon from '../../components/ProjectIcon';
import IconSelect from '../../components/IconSelect';
import Empty from '../../images/outer_space.svg';
import slugify from 'slugify';

class Projects extends Component {

	constructor(props) {
        super(props);
		this.state = {
            loading: true,
            projects: [
                // {"icon": "rocket", "name": "Sample Blog", "description": "A sample blog that uses Machinable."},
                // {"icon": "brain", "name": "Mobile", "description": "A mobile app that stores blah blah on Machinable."},
                // {"icon": "flask", "name": "Todo App", "description": "A good ol' todo app.."}
            ],
            newProject: {
                "icon": "rocket",
                "name": "",
                "description": "",
                "slug": ""
            },
            errors: [],
            showModal: false
		}
    }

    projectReset = () => {
        return {
            "icon": "rocket",
            "name": "",
            "description": "",
            "slug": ""
        }
    }

	closeModal = () => {
		var html = document.getElementsByTagName('html')[0];
        html.style.cssText = "--root-overflow: auto";
		this.setState({showModal: false, newProject: this.projectReset()});
	}

	openModal = () => {
		var html = document.getElementsByTagName('html')[0];
        html.style.cssText = "--root-overflow: hidden";
		this.setState({showModal: true});
	}

    createProject = () => {

    }

    onChange = (event) => {
        const target = event.target;
	    const value = target.type === 'checkbox' ? target.checked : target.value;
	    const name = target.name;
        var np = this.state.newProject;

        if (name === "name") {
			np["slug"] = value;
		} 

		np[name] = value;

		// slugify project slug
		np["slug"] = slugify(np["slug"], {
                                replacement: '-',
                                remove: null,  
                                lower: true
                            })

        var np = this.state.newProject;
        np[name] = value
	    this.setState({
	    	newProject: np
	    });
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
                        <Button classes="accent" onClick={this.openModal}>Create A Project</Button>
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
                    <Button onClick={this.openModal}>New Project</Button>
                </div>
            </div>
        )
    }

	componentDidMount = () => {		
		this.setState({loading: false});
	}

	render() {
        var render = this.state.projects.length > 0 ? this.renderProjects() : this.emptyState();
        var sIcon = "";

		return (
			<React.Fragment>
                {render}
                <Modal 
					close={this.closeModal}
					isOpen={this.state.showModal}>
                    <div className="align-center grid grid-3">
                        <div className="col-3-2">
                            <div className=" grid grid-1">
                                <form onSubmit={this.onSubmit}>
                                    <Card
                                        classes="footer-plain no-border"
                                        footer={
                                            <div className="grid grid-2">
                                                <div className="col-2 col-right">
                                                    <Button classes="plain text" onClick={this.closeModal}>Cancel</Button>	
                                                    <Button classes="brand margin-left" type="submit" loading={this.state.loading} onClick={this.createProject}>Create</Button>	
                                                </div>
                                            </div>
                                        }>

                                        <h2 className="text-center">New Project</h2>

                                        { this.state.errors.length > 0 &&
                                            <Card
                                                classes="danger margin-bottom-more">
                                                <div className="text-danger">
                                                    {this.state.errors.map(function(error){
                                                        return (<div className="text-400">{error}</div>)
                                                    })}
                                                </div>
                                            </Card>
                                        }

                                        <div>
                                            <IconSelect selected={sIcon}/>
                                            <Input placeholder="project name" label="Name" name="name" value={this.state.newProject.name} onChange={this.onChange}/>
                                            <Input placeholder="unique slug" label="Slug" name="slug" value={this.state.newProject.slug} onChange={this.onChange}/>
                                            <TextArea placeholder="project description" label="Description" name="description" value={this.state.newProject.description} onChange={this.onChange}/>
                                        </div>
                                        
                                    </Card>
                                </form>
                            </div>
                        </div>
                    </div>
                </Modal>
            </React.Fragment>
		  );
	}
}


export default Projects;