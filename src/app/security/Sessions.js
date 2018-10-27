import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Button, Card } from 'turtle-ui';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faMobile from '@fortawesome/fontawesome-free-solid/faMobileAlt';
import faComputer from '@fortawesome/fontawesome-free-solid/faDesktop';
import Machinable from '../../client';
import moment from 'moment';

class Sessions extends Component {

	constructor(props) {
        super(props);
        this.state = {
			sessions: [],
			slug: props.slug
		}
	}

	sessionsError = (response) => {
		console.log(response);
	}

	handleSessions = (response) => {
		this.setState({sessions: response.data.items});
	}

	getSessions = () => {
		Machinable.sessions(this.state.slug).list(this.handleSessions, this.sessionsError);
	}

	deleteSession = (id) => {
		Machinable.sessions(this.state.slug).delete(id, this.getSessions, this.sessionsError);
	}

	componentDidMount = () => {		
		this.getSessions();
	}

	render() {

		var currentSession = -1;
		var sessions = this.state.sessions.reverse();
		var values = sessions.map(function(session){
			var isCurrent = currentSession == session.id ? <span style={{"float":"right"}} className="background-information text-400 tag">Active Session</span> : <Button style={{"float":"right"}} classes="btn-small" onClick={() => this.deleteSession(session.id)}>Revoke</Button>;
			var icon = session.mobile ? faMobile : faComputer;
			return [
				<div>
					<FontAwesomeIcon className="fa-lg fa-fw text-muted" icon={icon} style={{"marginRight": "15px", "float": "left"}} />
					<div className="text-400">
						{session.location}&nbsp;{session.ip}<br/>
						<span className="text-muted text-small">last accessed {moment(session.last_accessed).fromNow()}</span>
					</div>
				</div>, 
				<div>
					{isCurrent}
				</div>
			]
		}, this);

		var rndr = values.length > 0 ? <Table values={values} /> : <h3 className="no-margin text-center text-muted">No Active Sessions</h3>

		return (
			<div className="grid grid-1">
				{rndr}
			</div>
		  );
	}
}

// redux
function mapStateToProps(state) {
	return {
		slug: state.project_slug
	};
}
  
export default connect(mapStateToProps)(Sessions);
