import React, { Component } from 'react';
import { Table, Button } from 'turtle-ui';

import Loader from '../../../components/Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import faMobile from '@fortawesome/fontawesome-free-solid/faMobileAlt';
import faComputer from '@fortawesome/fontawesome-free-solid/faDesktop';

import moment from 'moment';

import API from '../../../client/';

class Security extends Component {

	constructor(props) {
		super(props);
		this.state = {
			sessions: [],
			current_session: -1,
			loading: true
		}
	}

	sessionsError = (error) => {
		console.log(error);
		this.setState({loading: false});
	}

	receivedSessions = (response) => {
		var current_session = API.getSession();
		this.setState({sessions: response.data.sessions, current_session: current_session, loading: false});
	}

	getSessions = () => {
		API.userSessions().list(this.receivedSessions, this.sessionsError);
	}

	deleteSession = (session) => {
		API.userSessions().delete(session.id, this.getSessions, this.sessionsError);
	}

	componentDidMount = () => {
		this.getSessions();
	}

	renderSessions = () => {
		var currentSession = this.state.current_session;
		var headers = [<h3 className="no-margin text-400 text-muted">Sessions</h3>, ""];
		var sessions = this.state.sessions.reverse();
		var values = sessions.map(function(session){
			var isCurrent = currentSession === session.id ? <span style={{"float":"right"}} className="background-information text-400 tag">Active Session</span> : <Button style={{"float":"right"}} classes="btn-small" onClick={() => this.deleteSession(session)}>Revoke</Button>;
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

		return (
			<Table	
					values={values}
				/>
		);
	}

	emptySessions = () => {
		return (
			<h3 className="no-margin text-center">No Active Sessions</h3>
		)
	}

	render() {
		var sessions = this.state.sessions.length > 0 ? this.renderSessions() : this.emptySessions();

		return (
			<div className="grid grid-1">
				<h4 className="text-muted border-bottom">Sessions</h4>
				<Loader loading={this.state.loading} />
				<div className="">
				{sessions}
				</div>
				<br/>
			</div>
		  );
	}
}

export default Security;