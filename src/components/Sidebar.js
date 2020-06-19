import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartNetwork,
  faBracketsCurly,
  faSlidersH as faSliders,
  faProjectDiagram as faProject,
  faBook,
  faLifeRing,
  faUserLock,
  faShieldAlt as faShield,
  faBookSpells,
} from "@fortawesome/pro-duotone-svg-icons";
import times from "@fortawesome/fontawesome-free-solid/faTimes";

import Logo from "./LogoTitle";
import "./Sidebar.css";
import { Button } from "turtle-ui";

class SideBar extends Component {
  defaultClick = () => {
    if (this.props.toggleSidebar) {
      this.props.toggleSidebar();
    }
  };
  render() {
    var slug = this.props.match.params.projectSlug;
    return (
      <div className={`sidebar ${this.props.sidebarClass}`}>
        <div className="sidebar-content">
          <div>
            <div className="title center">
              <NavLink
                onClick={this.defaultClick}
                className="full-height align-center vertical-align"
                to="/home"
              >
                <Logo color={"#FFF"} classes={"logo-title"} />
              </NavLink>
              <Button
                classes="plain text show-small"
                onClick={this.props.toggleSidebar}
              >
                <FontAwesomeIcon icon={times} />
              </Button>
            </div>
            <div className="links">
              <ul>
                <li>
                  <NavLink
                    onClick={this.defaultClick}
                    to={"/project/" + slug + "/api"}
                    style={{ display: "flex" }}
                  >
                    <FontAwesomeIcon
                      className="center-self nav-icon"
                      style={{ fontSize: "18px" }}
                      icon={faProject}
                      fixedWidth
                    />
                    <div className="margin-left-more">
                      <div className="vertical-align margin-right">
                        <span className="nav-title">API</span>
                        {/* <span className="tag background-accent margin-left" style={{"padding": "1px 5px"}}>beta</span> */}
                      </div>
                      <p className="navlink-description">
                        Manage defined API resources
                      </p>
                    </div>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    onClick={this.defaultClick}
                    to={"/project/" + slug + "/json"}
                    style={{ display: "flex" }}
                  >
                    <FontAwesomeIcon
                      className="center-self nav-icon"
                      style={{ fontSize: "18px" }}
                      icon={faBracketsCurly}
                      fixedWidth
                    />
                    <div className="margin-left-more">
                      <span className="nav-title">Key/Value</span>
                      <p className="navlink-description">
                        Access data as JSON trees
                      </p>
                    </div>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    onClick={this.defaultClick}
                    to={"/project/" + slug + "/access"}
                    style={{ display: "flex" }}
                  >
                    <FontAwesomeIcon
                      className="center-self nav-icon"
                      style={{ fontSize: "18px" }}
                      icon={faUserLock}
                      fixedWidth
                    />
                    <div className="margin-left-more">
                      <span className="nav-title">Access</span>
                      <p className="navlink-description">
                        Configure users and access
                      </p>
                    </div>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    onClick={this.defaultClick}
                    to={"/project/" + slug + "/webhooks"}
                    style={{ display: "flex" }}
                  >
                    <FontAwesomeIcon
                      className="center-self nav-icon"
                      style={{ fontSize: "18px" }}
                      icon={faChartNetwork}
                      fixedWidth
                    />
                    <div className="margin-left-more">
                      <span className="nav-title">Web Hooks</span>
                      <p className="navlink-description">
                        Trigger hooks on events
                      </p>
                    </div>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    onClick={this.defaultClick}
                    to={"/project/" + slug + "/security"}
                    style={{ display: "flex" }}
                  >
                    <FontAwesomeIcon
                      className="center-self nav-icon"
                      style={{ fontSize: "18px" }}
                      icon={faShield}
                      fixedWidth
                    />
                    <div className="margin-left-more">
                      <span className="nav-title">Security</span>
                      <p className="navlink-description">
                        View sessions and logs
                      </p>
                    </div>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    onClick={this.defaultClick}
                    to={"/project/" + slug + "/spec"}
                    style={{ display: "flex" }}
                  >
                    <FontAwesomeIcon
                      className="center-self nav-icon"
                      style={{ fontSize: "18px" }}
                      icon={faBookSpells}
                      fixedWidth
                    />
                    <div className="margin-left-more">
                      <span className="nav-title">Documentation</span>
                      <p className="navlink-description">
                        OpenAPI Spec and Docs
                      </p>
                    </div>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    onClick={this.defaultClick}
                    to={"/project/" + slug + "/settings"}
                    style={{ display: "flex" }}
                  >
                    <FontAwesomeIcon
                      className="center-self nav-icon"
                      style={{ fontSize: "18px" }}
                      icon={faSliders}
                      fixedWidth
                    />
                    <div className="margin-left-more">
                      <span className="nav-title">Settings</span>
                      <p className="navlink-description">
                        Project configuration
                      </p>
                    </div>
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
          <div className="sidebar-footer">
            <ul className="links">
              <li>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://machinable.github.io/documentation/"
                >
                  <FontAwesomeIcon
                    className="center-self"
                    icon={faBook}
                    fixedWidth
                  />{" "}
                  Documentation
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="/home/settings/support"
                >
                  <FontAwesomeIcon
                    className="center-self"
                    icon={faLifeRing}
                    fixedWidth
                  />{" "}
                  Support
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default SideBar;
