import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dropdown, List, ListItem } from 'turtle-ui';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import ProjectIcon from '../components/ProjectIcon';
import API from '../app/api/API';
import Access from '../app/access/Access';
import Security from '../app/security/Security';
import Collections from '../app/collections/Collections';
import Settings from '../app/settings/Settings';

import {setCurrentProject, setProjectObject} from '../store/projects/actionCreators';

import './Project.css';

import { Route, Switch, Redirect } from 'react-router-dom';
import Machinable from '../client';


class Project extends Component {

	constructor(props) {
	    super(props);
		this.state = {
			body: "",
			projectSlug: props.match.params.projectSlug,
			sidebar: false,
			modal: false,
			projects: []
		}
	}

	handleError = (response) => {
        console.log(response);
        if(response.data && response.data.error) {
            var errors = [response.data.error];
            this.setState({errors: errors, loading: false});
        }
    }

    handleProjects = (response) => {
		for (let index = 0; index < response.data.items.length; index++) {
			const element = response.data.items[index];
			if (element.slug === this.state.projectSlug) {
				this.props.dispatch(setProjectObject(element));
			}
		}

        this.setState({
            projects: response.data.items
        });
    }

    getProjects = () => {
        Machinable.projects().list(this.handleProjects, this.handleError);
    }

	componentDidUpdate = (prevProps) => {
		var newSlug = this.props.match.params.projectSlug;
		var oldSlug = prevProps.match.params.projectSlug;
		
		if (newSlug !== oldSlug) {
			this.setState({
				projectSlug: newSlug
			})
			this.props.dispatch(setCurrentProject(newSlug));
			this.getProjects();
		}
	}

  	componentWillMount = () => {
		this.props.dispatch(setCurrentProject(this.state.projectSlug));
		this.getProjects();
  	}

	toggleSidebar = () => {
		var body = !this.state.sidebar ? "modal-open" : "";
		this.setState({sidebar: !this.state.sidebar, body: body});
	}

	navToProject = (slug) => {
		this.props.history.push("/project/"+slug);
	}

	render() {

		var currentProjectRender = <div>...</div>;
		var projectItems = this.state.projects.map(function(project, idx){
			var el = <div className="vertical-align"><ProjectIcon source={project.icon}/> <span className="margin-left-less margin-right-less">{project.name}</span></div>
			if (this.state.projectSlug === project.slug) {
				currentProjectRender = el;
			}
			return (
				<ListItem 
					key={"project-listitem-"+idx}
					onClick={() => this.navToProject(project.slug)}
					title={el}
					description={project.description} />
			)
		}, this);

        var projectList = <div className="grid grid-3"><div><Dropdown 
                        showIcon={true}
                        type="brand"
                        width={250}
                        buttonText={currentProjectRender}
                        buttonClasses="text plain text-muted no-click no-padding-side vertical-align"
                        classes="pull-left">
                        <div className="grid grid-1">
                            <List>
								{projectItems}
                            </List>
                        </div>
                    </Dropdown></div></div>


        var prefix = this.props.match.url;
		return (
			<div className={"root container container-project " + this.state.body}>
				<Sidebar {...this.props}/>

				<Header {...this.props} title={projectList} classes="no-shadow"/>				

				<div className="content">
                    <Switch>
						<Route 
							path={prefix+"/api"} 
							render={(props) => <API {...props} />} 
						/>
							
						<Route 
							path={prefix+"/collections"} 
							render={(props) => <Collections {...props} />}
						/>

						<Route 
							path={prefix+"/access"} 
							render={(props) => <Access {...props} />} 
						/>

						<Route 
							path={prefix+"/security"} 
							render={(props) => <Security {...props} />} 
						/>

						<Route 
							path={prefix+"/settings"} 
							render={(props) => <Settings {...props} />} 
						/>

                        <Redirect from="/" to={prefix+"/api"} />

                    </Switch>
				</div>

				<Footer />
			</div>
		  );
	}
}

export default connect()(Project);
