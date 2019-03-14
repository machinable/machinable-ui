import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from '../../../components/Loader';
import Machinable from '../../../client';
import { Table } from 'turtle-ui';
import {Doughnut} from 'react-chartjs-2';

class Stats extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			slug: props.slug,
			stats: undefined,
		}
	}

	statsError = (response) => {
		console.log(response);
		this.setState({loading: false});
	}

	statsSuccess = (response) => {
		this.setState({loading: false, stats: response.data});
	}

	loadStats = () => {
		Machinable.collections(this.state.slug).stats(this.statsSuccess, this.statsError)
	}

	componentDidMount = () => {
		this.loadStats();
    }
    
    renderStats = () => {
        var rows = [];
        var totalSizeInMB = 0;
        if(this.state.stats) {
            totalSizeInMB = (this.state.stats.total.size / 1024 / 1024).toFixed(5);
            var collections = this.state.stats.collections;
            for(var col in collections) {
                rows.push([
                    col,
                    <div className="text-right">{(collections[col].size / 1024 / 1024).toFixed(5)} MB</div>
                ])
            }
        }

        var percentageUsed = (totalSizeInMB / 1024) * 100;
        var percentageLeft = percentageUsed - 100;

        const data = {
            labels: [
                'Used', 'Free'],
            datasets: [{
                data: [percentageUsed, percentageLeft],
                backgroundColor: [
                    '#06dfa7',
                    'transparent'
                ],
                borderColor: [
                    '#06dfa7',
                    '#EFEFEF'
                ],
                hoverBackgroundColor: [
                    '#06dfa7',
                    'transparent'
                ]
            }]
        };


        return (
            <div className="col-2">
                <div className="grid grid-1" style={{"gridGap": "0px"}}>
                    <h4 className="text-muted text-400">Storage</h4>
                    <div className="grid grid-2">
                        
                        <div className=" doughnut-wrapper">
                            <div className="text-wrapper">
                                <h4 className="text-muted text-center">
                                    <span className="text-400">{totalSizeInMB} MB</span>
                                    <br/>
                                    <span className="text-small text-muted">of 1 GB</span>
                                </h4>
                            </div>
                            <div><Doughnut data={data} options={{legend: false, cutoutPercentage: 70}}/></div>
                        </div>

                        <Table 
                            classes="hover m-table"
                            headers={["Collection Name", "Size"]}
                            values={rows}
                            />

                    </div>      
                </div>        
            </div>
        );
    }

	render() {
        var result = (this.state.stats && Object.keys(this.state.stats.collections).length > 0) ? this.renderStats() : this.renderStats();
        result = this.state.loading ? <Loader loading={this.state.loading} /> : result;
		return result;
	}
}

// redux
function mapStateToProps(state) {
	return {
		slug: state.project_slug
	};
}
  
export default connect(mapStateToProps)(Stats);
