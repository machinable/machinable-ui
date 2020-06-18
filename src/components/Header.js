import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import faUser from "@fortawesome/fontawesome-free-solid/faUserCircle";
import signOut from "@fortawesome/fontawesome-free-solid/faSignOutAlt";
import { Dropdown, List, ListItem, Button } from "turtle-ui";
import bars from "@fortawesome/fontawesome-free-solid/faBars";
import Machinable from "../client";
import "./Header.css";
import { NavLink } from "react-router-dom";
import Logo from "./Logo";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      body: "",
    };
  }

  componentDidMount = () => {};

  logout = () => {
    const history = this.props.history;
    Machinable.user().logout(
      function (response) {
        history.push("/login");
      },
      function (response) {}
    );
  };

  settings = () => {
    const history = this.props.history;
    history.push("/home/settings");
  };

  render() {
    return (
      <div className={"header " + this.props.classes}>
        <div className="grid grid-2" style={{ height: "100%" }}>
          <div className="align-items-center">
            <div className="show-small">
              <NavLink
                className="full-height align-center vertical-align"
                to="/home"
              >
                <Logo classes={"logo"} />
              </NavLink>
            </div>
            <div className="show-small">
              <Button
                type="plain"
                classes="text plain no-click"
                onClick={this.props.toggleSidebar}
              >
                <FontAwesomeIcon icon={bars} />
              </Button>
            </div>
            <div className="vertical-align">{this.props.title}</div>
          </div>
          <div className="align-right vertical-align">
            <Dropdown
              type="text plain"
              width={200}
              buttonText={
                <FontAwesomeIcon style={{ fontSize: "24px" }} icon={faUser} />
              }
              buttonClasses={"no-click"}
              buttonStyle={{ paddingRight: "0" }}
              classes="col-1 align-items-right"
            >
              <div className="grid grid-1">
                <List>
                  {/* <ListItem title="email@tld.io" onClick={this.settings}/> */}
                  <ListItem
                    icon={faUser}
                    title="account"
                    onClick={this.settings}
                  />
                  <ListItem
                    icon={signOut}
                    title="Logout"
                    onClick={this.logout}
                  />
                </List>
              </div>
            </Dropdown>
            {/* <input className="text-muted input" placeholder="search"/> */}
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
