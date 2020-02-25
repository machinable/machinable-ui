import React, { Component } from 'react';
import './Footer.css';
import Statics from '../Statics';

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
			<div className="footer footer-dark">
				<div>
					&copy; 2018 - {new Date().getFullYear()} Machinable.io 
					// <a className="text-muted" href="https://github.com/machinable">{Statics.APP_VERSION}</a>	
				</div>
			</div>
		  );
	}
}


export default Footer;