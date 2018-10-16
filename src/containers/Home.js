import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faUser from '@fortawesome/fontawesome-free-solid/faUserCircle';
import signOut from '@fortawesome/fontawesome-free-solid/faSignOutAlt';
import cog from '@fortawesome/fontawesome-free-solid/faCog';
import { Dropdown, List, ListItem } from 'turtle-ui';
import Footer from '../components/Footer';
import Logo from '../components/Logo';
import Projects from '../app/home/Projects';
import './Home.css';
import { Route, Switch, Redirect } from 'react-router-dom';


class Home extends Component {

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
        var prefix = this.props.match.url;
		return (
			<React.Fragment>
				<div className="back-drop"></div>
				<div className={"root container container-home" + this.state.body}>
					
					<div className="home-header">
						<div className="grid grid-2" style={{"height": "100%"}}>
							<div className="vertical-align">
								<h3 className="vertical-align text-400 text-white">
									<Logo color={"#FFF"}/>
									<span className="margin-left">Machinable</span>
								</h3>
							</div>
							<div className="align-right vertical-align">
								<Dropdown 
									type="text plain"
									width={200}
									buttonText={<FontAwesomeIcon className="text-white" style={{fontSize: "24px"}} icon={faUser} />}
									buttonClasses={"no-click"}
									buttonStyle={{"paddingRight": "0"}}
									classes="col-1 align-items-right">
									<div className="grid grid-1">
										<List>
											<ListItem title="email@tld.io"/>
											<ListItem icon={cog} title="Settings"/>
											<ListItem icon={signOut} title="Logout"/>
										</List>
									</div>
								</Dropdown>
								<input className="text-muted input" placeholder="search"/>
							</div>
						</div>
					</div>				

					<div className="content home-content">
						<div className="home-content-wrap">
							<Switch>
								<Route path={prefix+"/projects"} component={Projects} />

								<Redirect from="/" to={prefix+"/projects"} />
							</Switch>
						</div>

						{/* DOCUMENTATION */}
						<div className="docs">
							<div>
								<h4 className="text-more-muted text-600"><br/>DOCUMENTATION</h4>
								<div className="grid grid-3">
									<div>
										<a className="link text-400 text-information">Overview</a>
										<p className="text-muted">Machinable user documentation. Create and manage your projects.</p>
									</div>
									<div>
										<a className="link text-400 text-information">API</a>
										<p className="text-muted">Machinable RESTful API documentation.</p>
									</div>
									<div>
										<a className="link text-400 text-information">Samples</a>
										<p className="text-muted">View the Machinable Github page for sample applications.</p>
									</div>
								</div>
							</div>
						</div>
					</div>

					<Footer />
				</div>
			</React.Fragment>
		  );
	}
}

// Add this function:
function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(Home);