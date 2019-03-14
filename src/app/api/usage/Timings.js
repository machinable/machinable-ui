import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from '../../../components/Loader';
import Machinable from '../../../client';
import ReactJson from 'react-json-view';
import moment from 'moment';
import {Line} from 'react-chartjs-2';

// https://superdevresources.com/tools/color-shades#1c2463
const COLORS = ["#39cde0", "#1fb3c6", "#188c9a", "#11646e"];

class Timings extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			slug: props.slug,
			timings: undefined,
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
        var labels = [];
        var dataMap = {};
        var data = [];
        var responseTimes = this.state.timings.response_times;

        for (var time in responseTimes) {
            var times = responseTimes[time].response_times;
            var avg = 0;
            for(var i = 0; i < times.length; i++) {
                avg += times[i].response_time;
            }
            avg = avg / times.length;
            dataMap[responseTimes[time].timestamp] = avg
        }

        for(var i = 0; i < expectedTimes.length; i++) {
            var t = expectedTimes[i];
            var fs = moment(new Date(t*1000)).format('h:mm a');
            labels.push(fs);
            if (!dataMap.hasOwnProperty(t)) {
                data.push(null);
            } 
            else {
                data.push(dataMap[t].toFixed(2));
            }
        }

        var chartData = {
            label: "Avg Response Time (ms)", 
            data: data,
            borderWidth: 0,
            backgroundColor: COLORS[0],
            borderColor: COLORS[0], 
            pointBorderColor: "#FFF",
            pointBorderWidth: 2,
            pointRadius: 5,
            fill: false,
            borderWidth: 3,
            spanGaps: true
        };

        this.setState({
            chartData: {
                labels:labels, 
                datasets: [chartData]
            }
        });
    }

	timingsError = (response) => {
		console.log(response);
		this.setState({loading: false});
	}

	timingsSuccess = (response) => {
		this.setState({loading: false, timings: response.data}, this.formatData);
	}

	loadTimings = () => {
		Machinable.resources(this.state.slug).timings(this.timingsSuccess, this.timingsError)
    }
    
	componentDidMount = () => {
		this.loadTimings();
	}

    renderTimings = () => {
		return (
            // <div className="code"><ReactJson collapsed={2} name={false} iconStyle="square" src={this.state.timings} /></div>
            <div>
                <h4 className="text-muted text-400">Average Response Times <span className="text-muted text-small">(ms)</span></h4>
                <Line
                    data={this.state.chartData}
                    options={{
                        legend: false,
                        maintainAspectRatio: false,
                        scales:{
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
        var result = (this.state.timings && this.state.timings.response_times.length > 0) ? this.renderTimings() : this.renderTimings();
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
  
export default connect(mapStateToProps)(Timings);
