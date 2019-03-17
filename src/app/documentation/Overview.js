import React, { Component } from 'react';
import Statics from '../../Statics';

class Overview extends Component {
	render() {
		return (
			<div>
                <a className="link text-400 text-information" target="_blank" rel="noopener noreferrer" href={Statics.DOCS.OVERVIEW}>Overview</a>
                <p className="text-muted">Machinable user documentation. Create and manage your projects.</p>
            </div>
		  );
	}
}


export default Overview;