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
				<div className="align-right">&copy; 2018 - {new Date().getFullYear()} Machinable.io // {Statics.APP_VERSION}</div>
			</div>
		  );
	}
}


export default Footer;