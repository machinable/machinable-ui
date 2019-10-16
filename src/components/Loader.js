import React, { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import faCircle from '@fortawesome/fontawesome-free-solid/faCircleNotch';

class Loader extends Component {
	render() {
		return (
            <div>
			    {this.props.loading && 
                    <div className="text-center text-more-muted page-loader">
                        <FontAwesomeIcon className="fa-spin" icon={faCircle} />
                    </div>
                }
            </div>
		);
	}
}


export default Loader;