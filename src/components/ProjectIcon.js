// https://www.flaticon.com/packs/project-management-2
import React, { Component } from 'react';
import Brain from '../images/project/brain.svg';
import Flask from '../images/project/flask.svg';
import Rocket from '../images/project/rocket.svg';
// import Analytics from '../images/project/analytics.svg';
// import Box from '../images/project/box.svg';
// import Chat from '../images/project/chat.svg';
// import Checklist from '../images/project/checklist.svg';
// import Structures from '../images/project/structure.svg';

// TODO
const SOURCES = {
    "brain": Brain,
    "flask": Flask,
    "rocket": Rocket
};

class Icon extends Component {

	constructor(props) {
        super(props);
        this.state = {
            sources: SOURCES,
            source: props.source ? props.source : "brain"
        }
	}

	componentDidMount = () => {		

	}

	render() {
        var imgSrc = this.state.sources[this.state.source];
        var width = "32px";
        var height = "32px";
		return (
			<img src={imgSrc} style={{width: width, height: height}}/>
		  );
	}
}


export default Icon;