import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import Footer from '../components/Footer';
import Header from '../components/Header';

import './Home.css';

import { Route, Switch } from 'react-router-dom';


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
		return (
			<div className={"root container container-home" + this.state.body}>
				
				<Header title={<h3 className="vertical-align text-400 text-muted">Machinable</h3>}/>				

				<div className="content">
					
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

export default connect(mapStateToProps)(Home);