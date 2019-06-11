import React, { Component } from 'react';
import { TextArea, Modal, Input, Button, Card, Switch } from 'turtle-ui';
import API from '../documentation/API';
import Examples from '../documentation/Examples';
import Overview from '../documentation/Overview';
import Loader from '../../components/Loader';
import ProjectIcon from '../../components/ProjectIcon';
import IconSelect from '../../components/IconSelect';
import Empty from '../../images/outer_space.svg';
import Machinable from '../../client';
import Statics from '../../Statics';
import slugify from 'slugify';

class Projects extends Component {

	constructor(props) {
        super(props);
		this.state = {
            loading: true,
            projects: [],
            newProject: {
                "icon": "rocket",
                "name": "",
                "description": "",
                "slug": "",
                "user_registration": true
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
            "slug": "",
            "user_registration": true
        }
    }

	closeModal = () => {
		var html = document.getElementsByTagName('html')[0];
        html.style.cssText = "--root-overflow: auto";
		this.setState({showModal: false, newProject: this.projectReset(), errors:[]});
	}

	openModal = () => {
		var html = document.getElementsByTagName('html')[0];
        html.style.cssText = "--root-overflow: hidden";
		this.setState({showModal: true});
    }
    
    handleError = (response) => {
        console.log(response);
        if(response.data && response.data.error) {
            var errors = [response.data.error];
            this.setState({errors: errors, loading: false});
        }
    }

    handleProjects = (response) => {
		var html = document.getElementsByTagName('html')[0];
        html.style.cssText = "--root-overflow: auto";
        this.setState({
            projects: response.data.items,
            loading: false,
            showModal: false,
            newProject: this.projectReset()
        });
    }

    getProjects = () => {
        Machinable.projects().list(this.handleProjects, this.handleError);
    }

    createProject = () => {
        var errors = [];

	    if(!this.state.newProject.name) {
	        errors.push('Project name cannot be empty');
	    }

	    if(!this.state.newProject.slug) {
            errors.push('Project slug cannot be empty');
        }

	    this.setState({
	      errors: errors
        });
        
        if(errors.length === 0) {
            Machinable.projects().create(
                this.state.newProject,
                this.getProjects, 
                this.handleError);
        }
    }

    selectIcon = (icon) => {
        console.log(icon);
        var np = this.state.newProject;
        np.icon = icon;
	    this.setState({
	    	newProject: np
	    });
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

	    this.setState({
	    	newProject: np
	    });
    }

    emptyState = () => {
        return (
            <div className="grid grid-8">
                <Card classes="col-8 no-border">
                    <h2 className="text-center">You don't have any projects yet</h2>
                    <img src={Empty} alt="" className="empty-state"/>
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
        var newCardStyles = {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "148px"
        };
        
        return (
            <div className="grid grid-1">
                <div className="grid grid-2 margin-bottom">
                    <h2 className="margin no-margin-left">Projects</h2>
                    <div className="align-right">
                    </div>
                </div>
                <div className="grid grid-3">
                    {this.state.projects.map(function(project, idx){
                        var fullURL = Statics.GenerateAPIHost(project.slug);
                        return(
                            <Card key={"project-"+idx} classes="project-hover no-border" to={"/project/"+project.slug}>
                                <h3 className="text-400 vertical-align no-margin-bottom" style={{"position": "relative"}}>
                                    <ProjectIcon source={project.icon}/>
                                    &nbsp;&nbsp;{project.name}
                                </h3>
                                <span className="margin-top text-information text-small" style={{"display": "block"}}>{fullURL}</span>
                                <p>{project.description}</p>
                            </Card>
                        )
                    })}
                    <div key="create-project" style={newCardStyles} className="no-padding new-project" onClick={this.openModal}>
                        <div className="text-400 text-more-muted no-margin-bottom">
                            Create New Project
                        </div>
                    </div>
                </div>
            </div>
        )
    }

	componentDidMount = () => {		
		this.getProjects();
	}

	render() {
        var render = this.state.projects.length > 0 ? this.renderProjects() : this.emptyState();

		return (
			<div className="page">
                <div className="page-content home-content">
                    <Loader loading={this.state.loading} />
                    {!this.state.loading && render}
                    <Modal 
                        close={this.closeModal}
                        isOpen={this.state.showModal}>
                        <div className="align-center grid grid-3">
                            <div className="col-3-2">
                                <div className=" grid grid-1">
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
                                            <div className="text-danger text-center margin-bottom-more">
                                                {this.state.errors.map(function(error){
                                                    return (<div className="text-400 padding-bottom">{error}</div>)
                                                })}
                                            </div>
                                        }

                                        <div className="grid grid-1">
                                            <IconSelect selected={this.state.newProject.icon} onSelect={this.selectIcon}/>
                                            <Input placeholder="project name" label="Name" name="name" value={this.state.newProject.name} onChange={this.onChange}/>
                                            <Input placeholder="unique slug" label="Slug" name="slug" value={this.state.newProject.slug} onChange={this.onChange}/>
                                            <TextArea placeholder="project description" label="Description" name="description" value={this.state.newProject.description} onChange={this.onChange}/>
                                            <div className="grid grid-1">
                                                <strong>User Registration</strong>
                                                <Switch name="user_registration" on={this.state.newProject.user_registration} onChange={this.onChange}/>
                                                {this.state.newProject.user_registration && 
                                                    <span className="text-small text-muted">Users can register to your project at the <a className="link text-400 text-information" target="_blank" rel="noopener noreferrer" href={Statics.DOCS.ACCESS}>/users/register endpoint</a>.</span>
                                                }
                                                {!this.state.newProject.user_registration && 
                                                    <span className="text-small text-muted">Users will not be able to openly register to your project.</span>
                                                }
                                            </div>
                                        </div>
                                        
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </Modal>
                </div>

                {/* DOCUMENTATION */}
                <div className="page-docs">
                    <div>
                        <h4 className="text-more-muted text-600">DOCUMENTATION</h4>
                        <div className="grid grid-3">
                            <Overview />
                            <API />
                            <Examples />
                        </div>
                    </div>
                </div>
            </div>
		  );
	}
}


export default Projects;