import React, { Component } from 'react';
import { connect } from 'react-redux';
import Footer from '../components/Footer';
import Logo from '../components/Logo';
import API from '../app/documentation/API';
import Examples from '../app/documentation/Examples';
import Overview from '../app/documentation/Overview';
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
				<div className="login-back-drop"></div>
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
									<Overview />
									<API />
									<Examples />
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