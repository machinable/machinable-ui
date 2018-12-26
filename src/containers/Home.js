import React, { Component } from 'react';
import { connect } from 'react-redux';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faUser from '@fortawesome/fontawesome-free-solid/faUserCircle';
import signOut from '@fortawesome/fontawesome-free-solid/faSignOutAlt';
import cog from '@fortawesome/fontawesome-free-solid/faCog';
import { Dropdown, List, ListItem } from 'turtle-ui';
import Footer from '../components/Footer';
import HomeHeader from '../components/HomeHeader';
import Projects from '../app/home/Projects';
import './Home.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import Machinable from '../client';


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

  	}

	toggleSidebar = () => {
		var body = !this.state.sidebar ? "modal-open" : "";
		this.setState({sidebar: !this.state.sidebar, body: body});
	}

	logout = () => {
		const history = this.props.history;
		Machinable.user().logout(function(response){
			history.push('/login');
		}, function(response) {});
	}

	render() {
        var prefix = this.props.match.url;
		return (
			<div className={"root container container-home" + this.state.body}>
				<div className="back-drop"></div>

				<HomeHeader {...this.props}/>		

				<div className="content">
					<Switch>
						<Route path={prefix+"/projects"} component={Projects} />

						<Redirect from="/" to={prefix+"/projects"} />
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

export default connect(mapStateToProps)(Home);