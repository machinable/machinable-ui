import React, { Component } from 'react';
import { Table, Button } from 'turtle-ui';
import { connect } from 'react-redux';
import Machinable from '../../client';
import Loader from '../../components/Loader';
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
		console.log(response);
		this.setState({loading: false});
	}

	logSuccess = (response, pageDirection) => {
		console.log(response.data);
		this.setState({
			page: this.state.page + pageDirection, 
			logs: response.data.items, 
			links: response.data.links, 
			count: response.data.count, 
			loading: false});
	}

	getLogs = (link, direction) => {
		if (link) {
			Machinable.logs(this.state.slug).listLink(link, (response) => this.logSuccess(response, direction), this.logError);
		} else {
			Machinable.logs(this.state.slug).list((response) => this.logSuccess(response, direction), this.logError);
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

	renderLogs = () => {
        var buttons = this.getTablePageButtons();

		var headers = ["Event", "Status", "Initiator", <div className="m-th text-right">Created</div>];
		var logValues = this.state.logs.map(function(log, idx){
			console.log(log.created);
			return [
				<div className="text-small">
					<span className="text-400">{log.event}</span>
					<span className="text-muted"></span>
				</div>, 
				<span className={"text-400 tag tag-" + (log.status_code+"")[0]}>{log.status_code}</span>,
				<div className="text-small">{log.initiator}</div>, 
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
		
		return (
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
		var render = this.state.logs.length > 0 ? this.renderLogs() : this.emptyState();

		return (
			<div className="grid grid-1">
				<Loader loading={this.state.loading} />
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
