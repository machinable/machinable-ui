import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
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

import './Project.css';

import { Route, Switch, Redirect } from 'react-router-dom';


class Project extends Component {

	constructor(props) {
	    super(props);
		this.state = {
		  body: "",
		  sidebar: false,
		  modal: false
		}
  	}

  	componentWillMount = () => {
  		// if(!API.loggedIn()) {
  		// 	const history = this.props.history;
  		// 	API.logout(function(){
	    //         history.push('/login');
	    //       });
  		// }
  	}

	toggleSidebar = () => {
		var body = !this.state.sidebar ? "modal-open" : "";
		this.setState({sidebar: !this.state.sidebar, body: body});
	}

	logout = () => {
		// const history = this.props.history;
		// API.logout(function(){
		// 	history.push('/login');
		// });
	}

	render() {

        var projectList = <div className="grid grid-3"><div><Dropdown 
                        showIcon={true}
                        type="brand"
                        width={250}
                        buttonText={<div className="vertical-align"><ProjectIcon source="rocket"/> <span className="margin-left-less margin-right-less">Sample Blog</span></div>}
                        buttonClasses="text plain text-muted no-click no-padding-side vertical-align"
                        classes="pull-left">
                        <div className="grid grid-1">
                            <List>
                                <ListItem 
                                    imageClasses="" 
                                    title={<div className="vertical-align"><ProjectIcon source="rocket"/> <span className="margin-left-less margin-right-less">Sample Blog</span></div>}
                                    description="A sample blog site that uses Machinable for content and user authentication" />
                                <ListItem 
                                    imageClasses="" 
                                    title={<div className="vertical-align"><ProjectIcon source="brain"/> <span className="margin-left-less margin-right-less">Mobile App</span></div>}
                                    description="A mobile app that stores blah blah on Machinable" />
                                <ListItem 
                                    imageClasses="" 
                                    title={<div className="vertical-align"><ProjectIcon source="flask"/> <span className="margin-left-less margin-right-less">TODO WebApp</span></div>}
                                    description="A good ol' todo app, demonstrating how Machinable can be used as a backend" />
                            </List>
                        </div>
                    </Dropdown></div></div>


        var prefix = this.props.match.url;
		return (
			<div className={"root container container-project " + this.state.body}>
				<Sidebar />

				<Header title={projectList} classes="no-shadow"/>				

				<div className="content">
                    <Switch>
                        <Route path={prefix+"/api"} component={API} />
                        <Route path={prefix+"/collections"} component={Collections} />
                        <Route path={prefix+"/access"} component={Access} />
                        <Route path={prefix+"/security"} component={Security} />
                        <Route path={prefix+"/settings"} component={Settings} />

                        <Redirect from="/" to={prefix+"/api"} />

                    </Switch>
				</div>

				<Footer />
			</div>
		  );
	}
}

// Add this function:
function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(Project);