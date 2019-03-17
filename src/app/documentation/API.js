import React, { Component } from 'react';
import Statics from '../../Statics';

class API extends Component {
	render() {
		return (
			<div>
                <a className="link text-400 text-information" target="_blank" rel="noopener noreferrer" href={Statics.DOCS.QUERYING}>API</a>
                <p className="text-muted">Machinable RESTful API Documentation</p>
            </div>
		  );
	}
}


export default API;