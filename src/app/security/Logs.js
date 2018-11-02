import React, { Component } from 'react';
import { Table, Button } from 'turtle-ui';
import { connect } from 'react-redux';
import Loader from '../../components/Loader';
import Machinable from '../../client';
import moment from 'moment';

class Logs extends Component {

	constructor(props) {
        super(props);
		this.state = {
			slug: props.slug,
			loading: true,
			logs: [],
            pageLogs: [],
			tableLimit: 8,
            tablePage: 0,
		}
	}

	nextPage = () => {
		var pages = this.state.logs.length / this.state.tableLimit;
		var page = this.state.tablePage + 1;

		if(page < pages) {
			this.updatePage(page);
		}
	}

	previousPage = () => {
		var page = this.state.tablePage - 1;

		if(page >= 0) {
			this.updatePage(page);
		}
	}
	
	updatePage = (p) => {
		var tableStart = p * this.state.tableLimit;
		var tableEnd = tableStart + this.state.tableLimit;

		var pageValues = this.state.logs.slice(tableStart, tableEnd);
		this.setState({pageLogs: pageValues, tablePage: p});
	}

	logError = (response) => {
		console.log(response);
	}

	logSuccess = (response) => {
		this.setState({logs: response.data.items, loading: false}, () => this.updatePage(0));
	}

	getLogs = () => {
		Machinable.logs(this.state.slug).list(this.logSuccess, this.logError);
	}

	componentDidMount = () => {		
		this.getLogs();
	}

	getTablePageButtons = () => {
		var buttons = [];
        buttons.push(<Button key={"table_btn_0"} classes="text plain btn-small" onClick={this.previousPage}>Previous</Button>)
		buttons.push(<Button key={"table_btn_1"} classes="text plain btn-small" onClick={this.nextPage}>Next</Button>)
		return buttons;
	}

	renderLogs = () => {
		var tableStart = (this.state.tablePage) * this.state.tableLimit + 1;
		var tableEnd = tableStart + this.state.tableLimit - 1;
		var pages = this.state.logs.length / this.state.tableLimit;
		if(tableEnd > this.state.logs.length - 1) tableEnd = this.state.logs.length;
        var buttons = this.getTablePageButtons(pages);

		var headers = ["Event", "Status", "Initiator", <div className="m-th text-right">Created</div>];
		var logValues = this.state.pageLogs.map(function(log, idx){
			return [
				<div className="text-small">
					<span className="text-400">{log.event}</span>
					<span className="text-muted"></span>
				</div>, 
				<span className={"text-400 tag tag-" + (log.status_code+"")[0]}>{log.status_code}</span>,
				<div className="text-small">{log.initiator}</div>, 
				<div className="text-small text-muted text-right">{moment(log.created).fromNow()}</div>
			]
		}, this)

		if (logValues.length === 0) {
			headers = [];
			logValues = [[<div className="text-center text-muted">No Activity</div>]];
		}

		return (
			<Table
					classes="hover m-table"
					headers={headers}
					values={logValues}
					footer={<div className="grid grid-2 vertical-align">
								<div className="text-small text-muted">
									showing {tableStart} to {tableEnd} of {this.state.logs.length} entries
									{this.state.searchText && " (filtered from "+this.state.logs.length+")"}
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
		var render = this.state.pageLogs.length > 0 ? this.renderLogs() : this.emptyState();

		return (
			<div className="grid grid-1">
				{render}
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
