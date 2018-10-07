import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from './Logo';
import './Sidebar.css';

class Footer extends Component {

	constructor(props) {
	    super(props);
		this.state = {
		  body: ""
		}
	}

	componentDidMount = () => {		

	}

	render() {
		return (
			<div className="sidebar">
                <div className="sidebar-content">
                    <div className="title center">
                        {/* <h3 className="text-400">Machinable</h3> */}
                        <Logo color={"#CCC"}/>
                    </div>
                    <div className="links">
                        <ul>
                            <li><NavLink to="/project/api" activeClassName="active">API</NavLink></li>
                            <li><NavLink to="/project/collections">Collections</NavLink></li>
                            <li><NavLink to="/project/settings">Settings</NavLink></li>
                        </ul>
                    </div>
                </div>
			</div>
		  );
	}
}


export default Footer;