import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from '../Loader';
import moment from 'moment';
import {Bar} from 'react-chartjs-2';

// https://superdevresources.com/tools/color-shades#06d6a0
const GOOD_COLORS = ["#06dfa7", "#05ae82", "#037c5d"];
// https://superdevresources.com/tools/color-shades#1b9aaa
const NOTGOOD_COLORS = ["#39cde0", "#1fb3c6", "#188c9a", "#11646e"];
// 
const BAD_COLORS = ["#f15b7e", "#5d5d5d"];

const CODEZ = {
    "200": {label: "200 OK", color: GOOD_COLORS[0]},
    "201": {label: "201 Created", color: GOOD_COLORS[1]},
    "204": {label: "204 No Content", color: GOOD_COLORS[2]},
    "400": {label: "400 Bad Request", color: NOTGOOD_COLORS[0]},
    "401": {label: "401 Unauthorized", color: NOTGOOD_COLORS[1]},
    "403": {label: "403 Forbidden", color: NOTGOOD_COLORS[2]},
    "404": {label: "404 Not Found", color: NOTGOOD_COLORS[3]},
    "500": {label: "500 Internal Server Error", color: BAD_COLORS[0]},
    "unknown": {label: "Unknown", color: BAD_COLORS[1]}
};

class Codes extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			slug: props.slug,
            codes: props.codes,
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
        var requests = this.state.codes;
        //inside out man
        for (var timestamp in requests) {
            var data = requests[timestamp];
            for (var code in data["status_codes"]) {
                if (!dataMap.hasOwnProperty(code)) {
                    dataMap[code] = {};
                }
                dataMap[code][timestamp] = data["status_codes"][code];
            }
        }

        var chartData = [];
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

            var label = "";
            var color = "";
            if (!CODEZ.hasOwnProperty(code)) {
                label = CODEZ["unknown"].label;
                color = CODEZ["unknown"].color;
            }
            else {
                label = CODEZ[code].label;
                color = CODEZ[code].color;
            }
            chartData.push({
                label: label, 
                data: data,
                borderWidth: 0,
                backgroundColor: color
            });
        }

        var labels = [];
        for(var i = 0; i < expectedTimes.length; i++) {
            var t = expectedTimes[i];
            var fs = moment(new Date(t*1000)).format('h:mm a');
            labels.push(fs);
        }

        this.setState({
            chartData: {
                labels:labels, 
                datasets: chartData
            },
            loading: false
        });
    }

	componentDidMount = () => {
        if(this.state.codes) {
            this.formatData();
        } else {
            this.setState({
                loading: false
            });
        }
	}

    renderCodes = () => {
		return (
            <div>
                <h4 className="text-muted text-400">
                    Status Codes<br/>
                    <span className="text-muted text-small">HTTP Status codes returned over the last 1 hour</span>
                </h4>
                <Bar
                    data={this.state.chartData}
                    options={{
                        maintainAspectRatio: false,
                        legend: {
                            position: "bottom"
                        },
                        scales:{
                            yAxes:[{
                                type: 'linear'
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
        var result = (this.state.codes) ? this.renderCodes() : this.renderCodes();
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
