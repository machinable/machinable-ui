import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'turtle-ui';
import {Doughnut} from 'react-chartjs-2';

const LIMIT_MB = 1024; // this will eventually be enforced by the API;
const LIMIT_TEXT = "256 MB";

class Usage extends Component {
	constructor(props) {
		super(props);

	}
    
    renderStats = () => {
        var rows = [];
        var totalSizeInMB = 0;
        // if(this.state.stats) {
        //     totalSizeInMB = (this.state.stats.total.size / 1024 / 1024).toFixed(5);
        //     var collections = this.state.stats.resources;
        //     for(var col in collections) {
        //         rows.push([
        //             col,
        //             <div className="text-right">{(collections[col].size / 1024 / 1024).toFixed(5)} MB</div>
        //         ])
        //     }
        // }

        var percentageUsed = (totalSizeInMB / LIMIT_MB) * 100;
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
            <>
                <div>
                    <h4 className="text-muted text-400 no-margin-top">Requests</h4>
                    <div className="doughnut-wrapper" style={{"maxWidth": "275px"}}>
                        <div className="text-wrapper">
                            <h4 className="text-muted text-400 text-center">
                                0
                                <br/>
                                <span className="text-small text-muted">of 500 requests</span>
                            </h4>
                        </div>
                        <Doughnut data={data} options={{legend: false, cutoutPercentage: 70}}/>
                    </div>
                </div>
                <div>
                    <h4 className="text-muted text-400 no-margin-top">API Resources</h4>
                    <div className="doughnut-wrapper" style={{"maxWidth": "275px"}}>
                        <div className="text-wrapper">
                            <h4 className="text-muted text-400 text-center">
                                0
                                <br/>
                                <span className="text-small text-muted">of 6 Resources</span>
                            </h4>
                        </div>
                        <Doughnut data={data} options={{legend: false, cutoutPercentage: 70}}/>
                    </div>
                </div>
                <div>
                    <h4 className="text-muted text-400 no-margin-top">Storage</h4>
                    <div className="grid grid-2">
                        <div className=" doughnut-wrapper" style={{"maxWidth": "275px"}}>
                            <div className="text-wrapper">
                                <h4 className="text-muted text-center">
                                    <span className="text-400">{totalSizeInMB} MB</span>
                                    <br/>
                                    <span className="text-small text-muted">of {LIMIT_TEXT}</span>
                                </h4>
                            </div>
                            <div><Doughnut data={data} options={{legend: false, cutoutPercentage: 70}}/></div>
                        </div>

                    </div>      
                </div>        
            </>
        );
    }

	render() {
		return this.renderStats();
	}
}

// redux
function mapStateToProps(state) {
	return {
		slug: state.project_slug
	};
}
  
export default connect(mapStateToProps)(Usage);
