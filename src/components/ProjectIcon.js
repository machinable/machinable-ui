// https://www.flaticon.com/packs/project-management-2
import React, { Component } from 'react';
import Analytics from '../images/project/analytics.svg';
import Box from '../images/project/box.svg';
import Brain from '../images/project/brain.svg';
import Chat from '../images/project/chat.svg';
import Checklist from '../images/project/checklist.svg';
import Diagram from '../images/project/diagram.svg';
import Filee from '../images/project/file.svg';
import Flask from '../images/project/flask.svg';
import Folder from '../images/project/folder.svg';
import Graph from '../images/project/graph.svg';
import Group from '../images/project/group.svg';
import Internet from '../images/project/internet.svg';
import Rocket from '../images/project/rocket.svg';
import Statse from '../images/project/stats.svg';
import Structures from '../images/project/structure.svg';

// TODO
const SOURCES = {
    "analytics": Analytics,
    "box": Box,
    "brain": Brain,
    "chat": Chat,
    "checklist": Checklist,
    "diagram": Diagram,
    "file": Filee,
    "flask": Flask,
    "folder": Folder,
    "graph": Graph,
    "group": Group,
    "internet": Internet,
    "rocket": Rocket,
    "stats": Statse,
    "structures": Structures
};

class Icon extends Component {

	constructor(props) {
        super(props);
        this.state = {
            sources: SOURCES
        }
	}

	componentDidMount = () => {		

	}

	render() {
        var src = this.props.source ? this.props.source : "brain"
        var imgSrc = this.state.sources[src];
        var width = this.props.width ? this.props.width : "32px";
        var height = this.props.height ? this.props.height : "32px";
		return (
			<img src={imgSrc} style={{width: width, height: height}}/>
		  );
	}
}


export default Icon;