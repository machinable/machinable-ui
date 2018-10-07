import React, { Component } from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faUser from '@fortawesome/fontawesome-free-solid/faUserCircle';
import signOut from '@fortawesome/fontawesome-free-solid/faSignOutAlt';
import cog from '@fortawesome/fontawesome-free-solid/faCog';
import { Dropdown, List, ListItem } from 'turtle-ui';
import './Header.css';

class Header extends Component {

	constructor(props) {
	    super(props);
		this.state = {
          body: "",
          title: props.title
		}
	}

	componentDidMount = () => {		

	}

	render() {
		return (
			<div className={"header " + this.props.classes}>
                <div className="grid grid-2" style={{"height": "100%"}}>
                    <div className="vertical-align">
                        {this.state.title}
                    </div>
                    <div className="align-right vertical-align">
                        <Dropdown 
							type="text plain"
							width={200}
							buttonText={<FontAwesomeIcon style={{fontSize: "24px"}} icon={faUser} />}
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
		  );
	}
}


export default Header;