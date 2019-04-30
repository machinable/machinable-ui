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

				<span>&copy; {new Date().getFullYear()} Machinable.io </span>
			</div>
		  );
	}
}


export default Footer;