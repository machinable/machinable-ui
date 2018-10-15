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
				<span className="text-muted">&copy; {new Date().getFullYear()} Machinable.io </span>
				{/* <span className="align-right text-muted">Project Icons made by [author link] from www.flaticon.com</span> */}
			</div>
		  );
	}
}


export default Footer;