import React, { Component } from 'react';
import { Dropdown } from 'turtle-ui';
import ProjectIcon from './ProjectIcon';

const iconList = [
    "analytics",
    "box",
    "brain",
    //"chat",
    //"checklist",
    "diagram",
    "file",
    "flask",
    //"folder",
    "graph",
    "group",
    "internet",
    "rocket",
    "stats",
    "structures"
];

class IconSelect extends Component {
	render() {
        var src = this.props.selected ? this.props.selected : "rocket";
        var icon = <ProjectIcon width="48px" height="48px" source={src}/>
        var onSelect = this.props.onSelect ? this.props.onSelect : function(){};
		return (
            <Dropdown
                    type="brand"
                    buttonText={icon}
                    buttonClasses="text plain text-muted no-click no-padding-side vertical-align"
                    classes="dropdown-width-auto"
                    >
                <div className="grid grid-3 padding-top">
                    {iconList.map(function(icon, idx){
                        return (
                            <div key={"icon-" + idx} className="tile-hover align-center padding" onClick={() => onSelect(icon)}><ProjectIcon source={icon} /></div>
                        )
                    })
                    }
                </div>
            </Dropdown>
		  );
	}
}


export default IconSelect;