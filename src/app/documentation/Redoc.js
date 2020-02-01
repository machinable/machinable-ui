import React, { Component } from 'react';
import Statics from '../../Statics';

class Redoc extends Component {
	render() {
		return (
			<div>
                <a className="link text-400 text-information" target="_blank" rel="noopener noreferrer" href={Statics.DOCS.REDOC}>Redoc</a>
                <p className="text-muted">OpenAPI/Swagger-generated API Reference Documentation. Redoc is used to visulize the project API Spec.</p>
            </div>
		  );
	}
}


export default Redoc;