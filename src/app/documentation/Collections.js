import React, { Component } from 'react';
import Statics from '../../Statics';

class Collections extends Component {
	render() {
		return (
			<div>
                <a className="link text-400 text-information" target="_blank" rel="noopener" href={Statics.DOCS.COLLECTIONS}>Collections</a>
                <p className="text-muted">Understand what Collections are and how to manage them.</p>
            </div>
		  );
	}
}


export default Collections;