import React, { Component } from 'react';
import { connect } from 'react-redux';
import Footer from '../components/Footer';
import Logo from '../components/Logo';
import Login from '../app/user/Login';
import Register from '../app/user/Register';
import { Route, Switch } from 'react-router-dom';


class User extends Component {

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
		return (
			<React.Fragment>
				<div className="back-drop"></div>
				<div className={"root container container-home" + this.state.body}>
					
					<div className="home-header">
						<div className="grid grid-1" style={{"height": "100%"}}>
							<div className="vertical-align">
								<h3 className="vertical-align align-center text-400 text-white">
									<Logo color={"#FFF"} classes="logo-large"/>
									{/* <span className="margin-left">Machinable</span> */}
								</h3>
							</div>
						</div>
					</div>				

					<div className="content page">
						<div className="page-content home-content">
							<Switch>
                                <Route path="/login" component={Login} />
                                <Route path="/register" component={Register} />
							</Switch>
						</div>

						{/* DOCUMENTATION */}
						<div className="page-docs">
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

export default connect(mapStateToProps)(User);