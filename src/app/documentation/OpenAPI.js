import React, { Component } from 'react';
import Statics from '../../Statics';

class OpenAPI extends Component {
	render() {
		return (
			<div>
                <a className="link text-400 text-information" target="_blank" rel="noopener noreferrer" href={Statics.DOCS.OPENAPI}>OpenAPI</a>
                <p className="text-muted">The OpenAPI Specification (OAS) defines a standard, programming language-agnostic interface description for REST APIs</p>
            </div>
		  );
	}
}


export default OpenAPI;