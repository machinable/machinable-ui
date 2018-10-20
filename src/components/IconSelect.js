import React, { Component } from 'react';
import { Dropdown, List, ListItem } from 'turtle-ui';
import ProjectIcon from './ProjectIcon';

const iconList = [
    "brain",
    "flask",
    "rocket",
    "analytics",
    "box",
    "chat",
    "checklist",
    "structures"
];

class IconSelect extends Component {

	constructor(props) {
        super(props);
        
	}

	componentDidMount = () => {		

	}

	render() {
        var src = this.props.selected ? this.props.selected : "rocket";
		return (
            <Dropdown
                    type="brand"
                    buttonText={<ProjectIcon source={src}/>}
                    buttonClasses="text plain text-muted no-click no-padding-side vertical-align"
                    classes="dropdown-width-auto"
                    >
                <div className="grid grid-3 padding-top">
                    {iconList.map(function(icon, idx){
                        return (
                            <div className="hover align-center padding"><ProjectIcon source={icon} /></div>
                        )
                    })
                    }
                </div>
            </Dropdown>
		  );
	}
}


export default IconSelect;