import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faBracketsCurly, 
    faCodeBranch, 
    faSlidersH as faSliders,
    faProjectDiagram as faProject,
    faBook,
    faLifeRing,
    faUserLock,
    faShieldAlt as faShield,
} from '@fortawesome/pro-duotone-svg-icons';

import Statics from '../Statics';
import Logo from './LogoTitle';
import './Sidebar.css';

class SideBar extends Component {

	render() {
        var slug = this.props.match.params.projectSlug;
		return (
			<div className="sidebar">
                <div className="sidebar-content">
                    <div>
                        <div className="title center">
                            <NavLink className="full-height align-center vertical-align" to="/home"><Logo color={"#FFF"} classes={"logo-title"}/></NavLink>
                        </div>
                        <div className="links">
                            <ul>
                                <li>
                                    <NavLink to={"/project/"+slug+"/api"} style={{display: "flex"}}>
                                        <FontAwesomeIcon className="center-self nav-icon" style={{fontSize: "18px"}} icon={faProject} fixedWidth/>
                                        <div className="margin-left-more">
                                            <div className="vertical-align margin-right">
                                                <span className="nav-title">API</span>
                                                {/* <span className="tag background-accent margin-left" style={{"padding": "1px 5px"}}>beta</span> */}
                                            </div>
                                            <p className="navlink-description">Manage defined API resources</p>
                                        </div>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={"/project/"+slug+"/json"} style={{display: "flex"}}>
                                        <FontAwesomeIcon className="center-self nav-icon" style={{fontSize: "18px"}} icon={faBracketsCurly} fixedWidth/>
                                        <div className="margin-left-more">
                                            <span className="nav-title">Key/Value</span>                                    
                                            <p className="navlink-description">Access data as JSON trees</p>
                                        </div>
                                    </NavLink>
                                </li>
                                {/* <li>
                                    <NavLink to={"/project/"+slug+"/webhooks"} style={{display: "flex"}}>
                                        <FontAwesomeIcon className="center-self nav-icon" style={{fontSize: "18px"}} icon={faCodeBranch} fixedWidth/>
                                        <div className="margin-left-more">
                                            <span className="nav-title">Web Hooks</span>                                    
                                            <p className="navlink-description">Trigger hooks on events</p>
                                        </div>
                                    </NavLink>
                                </li> */}
                                <li>
                                    <NavLink to={"/project/"+slug+"/access"} style={{display: "flex"}}>
                                        <FontAwesomeIcon className="center-self nav-icon" style={{fontSize: "18px"}} icon={faUserLock} fixedWidth/>
                                        <div className="margin-left-more">
                                            <span className="nav-title">Access</span>                                    
                                            <p className="navlink-description">Configure users and access</p>
                                        </div>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={"/project/"+slug+"/security"} style={{display: "flex"}}>
                                        <FontAwesomeIcon className="center-self nav-icon" style={{fontSize: "18px"}} icon={faShield} fixedWidth/>
                                        <div className="margin-left-more">
                                            <span className="nav-title">Security</span>                                   
                                            <p className="navlink-description">View sessions and logs</p>
                                        </div>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={"/project/"+slug+"/settings"} style={{display: "flex"}}>
                                        <FontAwesomeIcon className="center-self nav-icon" style={{fontSize: "18px"}} icon={faSliders} fixedWidth/>
                                        <div className="margin-left-more">
                                            <span className="nav-title">Settings</span>
                                            <p className="navlink-description">Project configuration</p>
                                        </div>
                                    </NavLink>
                                </li>
                            </ul>                        
                        </div>
                    </div>
                    <div className="sidebar-footer">
                        <ul className="links">
                            <li><a target="_blank" rel="noopener noreferrer" href="https://machinable.github.io/documentation/"><FontAwesomeIcon className="center-self" icon={faBook} fixedWidth/> Documentation</a></li>
                            <li><a target="_blank" rel="noopener noreferrer" href="/home/settings/support"><FontAwesomeIcon className="center-self" icon={faLifeRing} fixedWidth/> Support</a></li>
                            <li><a target="_blank" rel="noopener noreferrer" href="https://www.machinable.io/documentation/release_notes/#100alpha"><span className="text-small text-muted">{Statics.APP_VERSION}</span></a></li>
                        </ul>
                    </div>
                </div>
			</div>
		  );
	}
}

export default SideBar;