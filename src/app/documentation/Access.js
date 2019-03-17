import React, { Component } from 'react';
import Statics from '../../Statics';

class Access extends Component {
	render() {
		return (
			<div>
                <a className="link text-400 text-information" target="_blank" rel="noopener noreferrer" href={Statics.DOCS.ACCESS}>Access</a>
                <p className="text-muted">Read more about Users, API keys, and authenticating requests</p>
            </div>
		  );
	}
}


export default Access;