import React, { Component } from 'react';
import './Logo.css';

class Logo extends Component {

	render() {
		
		const classes = (this.props.classes || "" ) + (this.props.animate ? " logo animate" : " logo ");
		
		var color = "#233237";
		if(this.props.color) {
			color = this.props.color;
		}


		return (
			<svg version="1.1" xmlns="http://www.w3.org/2000/svg" className={classes} viewBox="0 0 46 33">
				<g className="asd" strokeWidth="2" stroke={color} fill="none" fillRule="evenodd">
					<path d="M45,22.7331459 C45,19.1499462 42.7950446,16.079593 39.6628004,14.7835315 C39.6774469,14.5246474 39.7003932,14.2674038 39.7003932,14.0035978 C39.7003932,6.82243304 33.8412885,1 26.611593,1 C21.3985635,1 16.9102123,4.03409627 14.8051788,8.41527616 C13.7828502,7.62878013 12.503719,7.15547161 11.1134367,7.15547161 C7.77825654,7.15547161 5.07450503,9.84159999 5.07450503,13.1544315 C5.07450503,13.7760488 5.16938207,14.3779791 5.3477444,14.9418479 C2.74863428,16.4787471 1,19.2867709 1,22.5105187 C1,27.3287502 4.89630545,31.2367856 9.72803666,31.31094 L36.3341301,31.3109406 C41.1201312,31.3406346 45,27.4870665 45,22.7331459 L45,22.7331459 Z" id="Shape-path" strokeLinejoin="round"></path>
				</g>
				<circle className="logo-circle" cx="14" cy="20" r="3" fill={color}></circle>
				<circle className="logo-circle" cx="23" cy="20" r="3" fill={color}></circle>
				<circle className="logo-circle" cx="32" cy="20" r="3" fill={color}></circle>
			</svg>
		  );
	}
}

export default Logo;