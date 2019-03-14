import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from '../../../components/Loader';
import Machinable from '../../../client';
import ReactJson from 'react-json-view';
import moment from 'moment';
import {Bar} from 'react-chartjs-2';

// https://cdn-images-1.medium.com/max/800/1*B29h3NSglI42HGhWZA-5Mg.png
const COLORS = ["#1C2463", "#5BB8D0", "#2A4B91", "#B6DECA", "#3C83B5"];

class Codes extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			slug: props.slug,
            codes: undefined,
            chartData: []
		}
    }

    lastHourTimes = () => {
        var interval = 300; // seconds
        var aligned = this.alignNow(); // get current aligned time in unix timestamp
        var startTime = aligned - (300 * 12) // get start time, 1 hour ago

        var times = [];

        for(var i = startTime; i <= aligned; i+=interval){
            times.push(i);
        }

        console.log(times);

        return times;
    }

    alignNow = () => {
        var n = new Date();
        var offsetMins = n.getMinutes() % 5;
        var alignMins = n.getMinutes() - offsetMins;
        var truncMins = new Date(n.getFullYear(), n.getMonth(), n.getDate(), n.getHours(), alignMins);
        return truncMins.getTime() / 1000;
    }
    
    formatData = () => {
        var expectedTimes = this.lastHourTimes();
        var dataMap = {};
        var codes = this.state.codes.status_codes;
        for(var i = 0; i < codes.length; i++) {
            var ts = codes[i];
            for (var code in ts["codes"]) {
                if (!dataMap.hasOwnProperty(code)) {
                    dataMap[code] = {};
                }
                dataMap[code][ts["timestamp"]] = ts["codes"][code];
            }
        }

        var chartData = [];
        var colorIndex = 0;
        for (var code in dataMap) {
            var data = [];
            var codeData = dataMap[code];
            for(var i = 0; i < expectedTimes.length; i++) {
                var t = expectedTimes[i];
                var fs = moment(new Date(t*1000)).format('h:mm a');
                if (!codeData.hasOwnProperty(t)) {
                    data.push(0);
                } 
                else {
                    data.push(codeData[t]);
                }
            }
            chartData.push({
                label: code, 
                data: data,
                borderWidth: 0,
                backgroundColor: COLORS[colorIndex]
            });
            colorIndex++;
        }

        var labels = [];
        for(var i = 0; i < expectedTimes.length; i++) {
            var t = expectedTimes[i];
            var fs = moment(new Date(t*1000)).format('h:mm a');
            labels.push(fs);
        }

        console.log(chartData);
        this.setState({
            chartData: {
                labels:labels, 
                datasets: chartData
            }
        });
    }

	codesError = (response) => {
		console.log(response);
		this.setState({loading: false});
	}

	codesSuccess = (response) => {
		this.setState({loading: false, codes: response.data}, this.formatData);
	}

	loadCodes = () => {
		Machinable.collections(this.state.slug).codes(this.codesSuccess, this.codesError)
	}

	componentDidMount = () => {
		this.loadCodes();
	}

    renderCodes = () => {
		return (
            // <div className="code"><ReactJson collapsed={2} name={false} iconStyle="square" src={this.state.codes} /></div>
            <div>
                <h4 className="text-muted text-400">Status Codes</h4>
                <Bar
                    data={this.state.chartData}
                    options={{
                        maintainAspectRatio: false,
                        scales:{
                            yAxes:[{
                                type: 'linear',
                                ticks:{
                                    stepSize: 1
                                }
                            }],
                            xAxes:[{
                                stacked:false
                            }]
                        }
                    }}
                    />
            </div>
		  );
    }
    
	render() {
        var result = (this.state.codes && this.state.codes.status_codes.length > 0) ? this.renderCodes() : this.renderCodes();
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
  
export default connect(mapStateToProps)(Codes);
