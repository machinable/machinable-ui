import React, { Component } from 'react';
import { Table, Button } from 'turtle-ui';

import Loader from '../../../components/Loader';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faMobile from '@fortawesome/fontawesome-free-solid/faMobileAlt';
import faComputer from '@fortawesome/fontawesome-free-solid/faDesktop';

import moment from 'moment';

class Security extends Component {

	constructor(props) {
		super(props);
		this.state = {
			sessions: [],
			activity: [],
			current_session: -1,
			loading: true
		}
	}

	// sessionsError = (error) => {
	// 	console.log(error);
	// 	this.setState({loading: false});
	// }

	// receivedSessions = (response) => {
	// 	var current_session = API.getSession();
	// 	this.setState({sessions: response.data.sessions, current_session: current_session, loading: false});
	// }

	// getSessions = () => {
	// 	API.sessions().get(this.receivedSessions, this.sessionsError);
	// }

	// deleteSession = (session) => {
	// 	API.sessions().remove(session.id, this.getSessions, this.sessionsError);
	// }

	componentDidMount = () => {
		this.setState({loading: false});
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
					headers={headers}
					values={values}
				/>
		);
	}

	emptySessions = () => {
		return (
			<h3>No Sessions</h3>
		)
	}

	render() {
		// var headers = [<h3 className="no-margin text-400 text-muted">Sessions</h3>, ""];
		// var values = [
		// 	[<div><FontAwesomeIcon className="fa-lg fa-fw text-muted" icon={faComputer} style={{"marginRight": "15px", "float": "left"}} /><div className="text-400">Salem 24.62.73.43<br/><span className="text-muted text-small">last accessed on Mar 20, 2018</span></div></div>, <Button style={{"float":"right"}} classes="btn-small">Revoke</Button>],
		// 	[<div><FontAwesomeIcon className="fa-lg text-muted" icon={faComputer} style={{"marginRight": "15px", "float": "left"}} /><span className="text-400">Salem 24.62.73.43<br/><span className="text-muted text-small">last accessed on Mar 20, 2018</span></span></div>, <Button style={{"float":"right"}} classes="btn-small">Revoke</Button>],
		// 	[<div><FontAwesomeIcon className="fa-lg text-muted" icon={faMobile} style={{"marginRight": "15px", "float": "left", "width": "23.98px"}} /><span className="text-400">Manchester 216.146.45.246<br/><span className="text-muted text-small">last accessed on Mar 20, 2018</span></span></div>, <Button style={{"float":"right"}} classes="btn-small">Revoke</Button>]
		// ];

		var logHeaders = [<h3 className="no-margin text-400 text-muted">Activity Log</h3>, ""];
		var logValues = [
			[<div className="text-small"><span className="text-400">login</span><span className="text-muted"> - originated from 208.54.90.139</span></div>, <div className="text-small text-muted text-right">12 days ago</div>],
			[<div className="text-small"><span className="text-400">site.created</span><span className="text-muted"></span></div>, <div className="text-small text-muted text-right">12 days ago</div>],
			[<div className="text-small"><span className="text-400">site.created</span><span className="text-muted"></span></div>, <div className="text-small text-muted text-right">12 days ago</div>],
			[<div className="text-small"><span className="text-400">lighthouse.created</span><span className="text-muted"></span></div>, <div className="text-small text-muted text-right">12 days ago</div>],
			[<div className="text-small"><span className="text-400">lighthouse.deleted</span><span className="text-muted"></span></div>, <div className="text-small text-muted text-right">12 days ago</div>],
			[<div className="text-small"><span className="text-400">site.deleted</span><span className="text-muted"></span></div>, <div className="text-small text-muted text-right">12 days ago</div>],
		];

		//var loading = this.state.loading;
		var sessions = this.state.sessions.length > 0 ? this.renderSessions() : this.emptySessions();

		return (
			<div className="grid grid-1">
				<Loader loading={this.state.loading} />
				{sessions}

				<Table
					classes="hover"
					headers={logHeaders}
					values={logValues}
				/>
			</div>
		  );
	}
}

export default Security;