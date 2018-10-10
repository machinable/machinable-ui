import React, { Component } from 'react';
import { Table, Button, Card } from 'turtle-ui';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faMobile from '@fortawesome/fontawesome-free-solid/faMobileAlt';
import faComputer from '@fortawesome/fontawesome-free-solid/faDesktop';

class Sessions extends Component {

	constructor(props) {
        super(props);
        
	}

	componentDidMount = () => {		

	}

	render() {
		var values = [
			[<div><FontAwesomeIcon className="fa-lg fa-fw text-muted" icon={faComputer} style={{"marginRight": "15px", "float": "left"}} /><div className="text-400">Salem 24.62.73.43<br/><span className="text-muted text-small">last accessed on Mar 20, 2018</span></div></div>, <Button style={{"float":"right"}} classes="btn-small">Revoke</Button>],
			[<div><FontAwesomeIcon className="fa-lg text-muted" icon={faComputer} style={{"marginRight": "15px", "float": "left"}} /><span className="text-400">Salem 24.62.73.43<br/><span className="text-muted text-small">last accessed on Mar 20, 2018</span></span></div>, <Button style={{"float":"right"}} classes="btn-small">Revoke</Button>],
			[<div><FontAwesomeIcon className="fa-lg text-muted" icon={faMobile} style={{"marginRight": "15px", "float": "left", "width": "23.98px"}} /><span className="text-400">Manchester 216.146.45.246<br/><span className="text-muted text-small">last accessed on Mar 20, 2018</span></span></div>, <Button style={{"float":"right"}} classes="btn-small">Revoke</Button>],
			[<div><FontAwesomeIcon className="fa-lg text-muted" icon={faComputer} style={{"marginRight": "15px", "float": "left"}} /><span className="text-400">Salem 24.62.73.43<br/><span className="text-muted text-small">last accessed on Mar 20, 2018</span></span></div>, <Button style={{"float":"right"}} classes="btn-small">Revoke</Button>],
			[<div><FontAwesomeIcon className="fa-lg text-muted" icon={faMobile} style={{"marginRight": "15px", "float": "left", "width": "23.98px"}} /><span className="text-400">Manchester 216.146.45.246<br/><span className="text-muted text-small">last accessed on Mar 20, 2018</span></span></div>, <Button style={{"float":"right"}} classes="btn-small">Revoke</Button>]
		];

		return (
			<div className="grid grid-1">
				<Table
					values={values}
				/>
			</div>
		  );
	}
}


export default Sessions;