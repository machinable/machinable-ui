import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import faUser from '@fortawesome/fontawesome-free-solid/faUserCircle';
import signOut from '@fortawesome/fontawesome-free-solid/faSignOutAlt';
import { Dropdown, List, ListItem } from 'turtle-ui';
import Machinable from '../client';
import './Header.css';

class Header extends Component {

	constructor(props) {
	    super(props);
		this.state = {
          body: ""
		}
	}

	componentDidMount = () => {		

	}

    logout = () => {
		const history = this.props.history;
		Machinable.user().logout(function(response){
			history.push('/login');
		}, function(response) {});
	}

	settings = () => {
		const history = this.props.history;
        history.push('/home/settings');
    }

	render() {
		return (
			<div className={"header " + this.props.classes}>
                <div className="grid grid-2" style={{"height": "100%"}}>
                    <div className="vertical-align">
                        {this.props.title}
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
									{/* <ListItem title="email@tld.io" onClick={this.settings}/> */}
									<ListItem icon={faUser} title="account" onClick={this.settings}/>
									<ListItem icon={signOut} title="Logout" onClick={this.logout}/>
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