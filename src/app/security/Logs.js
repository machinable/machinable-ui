import React, { Component } from 'react';
import { Table, Button, Select, Dropdown } from 'turtle-ui';
import { connect } from 'react-redux';
import Machinable from '../../client';
import Loader from '../../components/Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import faSync from '@fortawesome/fontawesome-free-solid/faSync';
import moment from 'moment';

class Logs extends Component {

	constructor(props) {
        super(props);
		this.state = {
			slug: props.slug,
			loading: true,
			logs: [],
			count: 0,
			links: {},
			tableLimit: 10,
			page: -1,
			currentLink: "",
			filters: {
				status_code: "all",
				initiator_type: "all"
			}
		}
	}

	nextPage = () => {
		if (this.state.links && this.state.links["next"]) {
			this.getLogs(this.state.links.next, 1);
		}
	}

	previousPage = () => {
		if (this.state.links && this.state.links["prev"]) {
			this.getLogs(this.state.links.prev, -1);
		}
	}

	logError = (response) => {
		this.setState({loading: false});
	}

	logSuccess = (response, pageDirection, link) => {
		this.setState({
			page: this.state.page + pageDirection, 
			logs: response.data.items, 
			links: response.data.links, 
			count: response.data.count, 
			loading: false,
			currentLink: (link === "" ? this.state.currentLink : link)});
	}

	refresh = () => {
		this.setState({page: 0});
		this.getLogs(this.state.currentLink, 0)
	}

	getLogs = (link, direction) => {
		var initiatorTypeFilter = this.state.filters.initiator_type;
		initiatorTypeFilter = (initiatorTypeFilter === "all" ? "" : initiatorTypeFilter);
		var statusCodeFilter = this.state.filters.status_code;
		statusCodeFilter = (statusCodeFilter === "all" ? "" : statusCodeFilter);

		this.setState({loading: true});
		if (link) {
			Machinable.logs(this.state.slug).listLink(link, (response, link) => this.logSuccess(response, direction, ""), this.logError);
		} else {
			Machinable.logs(this.state.slug).list([initiatorTypeFilter, statusCodeFilter], (response, link) => this.logSuccess(response, direction, link), this.logError);
		}
	}

	componentDidMount = () => {		
		this.getLogs(null, 1);
	}

	getTablePageButtons = () => {
		var buttons = [];
        buttons.push(<Button key={"table_btn_0"} classes={"text plain btn-small " + (this.state.links && this.state.links["prev"] ? "" : "disabled")} onClick={this.previousPage}>Previous</Button>)
		buttons.push(<Button key={"table_btn_1"} classes={"text plain btn-small " + (this.state.links && this.state.links["next"] ? "" : "disabled")} onClick={this.nextPage}>Next</Button>)
		return buttons;
	}

	onChange = (event) => {
        const target = event.target;
	    const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
		
		var filters = this.state.filters;
		filters[name] = value;
		
		this.setState({
			filters: filters
		});
    }

	renderLogs = () => {
        var buttons = this.getTablePageButtons();

		var headers = ["Event", <div className="m-th text-center">Status</div>, <div className="m-th text-right">Response Time</div>, <div className="m-th text-center">Initiator</div>, <div className="m-th text-right">Created</div>];
		var logValues = this.state.logs.map(function(log, idx){
			return [
				<div className="text-small">
					<span className="text-400">{log.verb + " " + log.path}</span>
					<span className="text-muted"></span>
				</div>, 
				<div className="align-center"><span className={"text-400 text-center tag tag-" + (log.status_code+"")[0]}>{log.status_code}</span></div>,
				<div className="text-small text-right">{log.response_time} ms</div>, 
				<div className="text-small text-center">{log.initiator}</div>, 
				<div className="text-small text-right">{moment.utc(new Date(log.created * 1000)).format()}</div>
			]
		}, this);

		if (logValues.length === 0) {
			headers = [];
			logValues = [[<div className="text-center text-muted">No Activity</div>]];
		}


		var tableStart = (this.state.page) * this.state.tableLimit + 1;
		var tableEnd = tableStart + this.state.tableLimit - 1;
		if (tableEnd > this.state.count) tableEnd = this.state.count;

		var initatorTypes = [
			{value: "all", text: "All"},
			{value: "initiator_type=user", text: "Authenticated Users"},
			{value: "initiator_type=apikey", text: "Authenticated API Keys"},
			{value: "initiator_type=anonymous", text: "Anonymous Requests"}
		];
		var statusCodes = [
			{value: "all", text: "All"},
			{value: "status_code=200", text: "200 OK"},
			{value: "status_code=201", text: "201 Created"},
			{value: "status_code=204", text: "204 No Content"},
			{value: "status_code=400", text: "400 Bad Request"},
			{value: "status_code=401", text: "401 Unauthorized"},
			{value: "status_code=403", text: "403 Forbidden"},
			{value: "status_code=404", text: "404 Not Found"},
			{value: "status_code=500", text: "500 Internal Server Error"},
		];
		
		return (
			<React.Fragment>
				<div className="log-filters align-right">
					<Button onClick={this.refresh} classes="plain btn-small"><FontAwesomeIcon icon={faSync} /></Button>

					<Dropdown 
						width={300}
						showIcon={true}
						buttonText="Filters"
						classes="col-1 align-items-right margin-right"
						disableClickClose={true}
						buttonClasses="plain btn-small">
						<div className="padding">
							<Select 
								onChange={this.onChange} 
								value={this.state.filters.initiator_type} 
								name="initiator_type" 
								classes="margin-bottom" 
								label="Initiator Type" 
								options={initatorTypes}/>
							<Select 
								onChange={this.onChange} 
								value={this.state.filters.status_code} 
								name="status_code" 
								label="Status Code" 
								options={statusCodes}/>
						</div>
					</Dropdown>
				</div>
				
				<Table
						classes="hover m-table"
						headers={headers}
						values={logValues}
						footer={<div className="grid grid-2">
									<div className="text-small text-muted vertical-align">
										showing {tableStart} to {tableEnd} of {this.state.count} entries
									</div>
									<div className="pull-right">
										{buttons.map(function(btn, index){
											return (
												btn
											)
										})}
									</div>
								</div>}
					/>
			</React.Fragment>
		)
	}

	emptyState = () => {
        return (
            <div className="grid grid-8">
                <div className="col-2-8 flex-col">
                    <h2 className="text-center">No Activity Logs for the last 24 hours</h2>
                    <h3 className="text-center">Requests to your project resources and logs will appear here</h3>
                </div>
            </div>
        );
    }

	render() {
		var render = this.renderLogs()

		return (
			<div className="grid grid-1">
				{this.state.loading && <Loader loading={this.state.loading} />}
				{!this.state.loading && render}
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
  
export default connect(mapStateToProps)(Logs);
