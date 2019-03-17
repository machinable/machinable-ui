import React, { Component } from 'react';
import Statics from '../../Statics';

class Resources extends Component {
	render() {
		return (
			<div>
                <a className="link text-400 text-information" target="_blank" rel="noopener noreferrer" href={Statics.DOCS.RESOURCES}>API Resources</a>
                <p className="text-muted">Understand what API Resources are and how to manage them.</p>
            </div>
		  );
	}
}


export default Resources;