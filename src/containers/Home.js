import React, { Component } from 'react';
import { connect } from 'react-redux';
import Footer from '../components/Footer';
import HomeHeader from '../components/HomeHeader';
import Projects from '../app/home/Projects';
import Settings from '../app/home/settings/Settings';
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
			<div style={{"backgroundColor": "#F9F9F9"}} className={"root container container-home" + this.state.body}>
				<div className="back-drop">
					<HomeHeader {...this.props}/>		
				</div>
				<div className="content">
					<Switch>
						<Route path={prefix+"/projects"} component={Projects} />
						<Route path={prefix+"/settings"} component={Settings} />

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