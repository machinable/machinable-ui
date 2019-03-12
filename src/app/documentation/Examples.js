import React, { Component } from 'react';
import Statics from '../../Statics';

class Examples extends Component {
	render() {
		return (
			<div>
                <a className="link text-400 text-information" target="_blank" rel="noopener" href={Statics.DOCS.SAMPLE_PROJECTS}>Examples</a>
                <p className="text-muted">View the Machinable Github page to see example applications.</p>
            </div>
		  );
	}
}


export default Examples;