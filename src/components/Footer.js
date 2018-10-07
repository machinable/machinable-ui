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
			<div className="footer">
				&copy; {new Date().getFullYear()} Machinable.io
			</div>
		  );
	}
}


export default Footer;