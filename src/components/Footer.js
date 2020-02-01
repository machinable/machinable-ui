import React, { Component } from 'react';
import './Footer.css';

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

				<span>&copy; 2018 - {new Date().getFullYear()} Machinable.io</span>
			</div>
		  );
	}
}


export default Footer;