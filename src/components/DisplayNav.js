import React, { Component } from 'react';
import './DisplayNav.css';


class DisplayNav extends Component {

	constructor(props) {
	    super(props);
		this.state = {
		  classes: props.classes ? props.classes : "",
          links: props.links ? props.links : []
		}
	}

	render() {
		const classes = ["display-nav", this.props.classes].join(" ");
		const onClickCallback = this.props.onClickCallback !== undefined ? this.props.onClickCallback : function(){console.log("display nav clicked")};
		return (
			<ul className={classes}>
				{this.state.links.map(function(link){
					return (
						<li className={this.props.selected == link.text ? "active" : ""} key={link.text} onClick={() => onClickCallback(link)}>{link.text}</li>
					)
				}, this)}
			</ul>
	  	);
	}
}


export default DisplayNav;