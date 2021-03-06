import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card } from 'turtle-ui';
import Loader from '../Loader';
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
			timings: props.timings,
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
        var labels = [];
        var data = [];
        var responseTimes = this.state.timings;

        for(var i = 0; i < expectedTimes.length; i++) {
            var t = expectedTimes[i];
            var fs = moment(new Date(t*1000)).format('h:mm a');
            labels.push(fs);
            if (!responseTimes.hasOwnProperty(t)) {
                data.push(null);
            } 
            else {
                data.push(responseTimes[t].avg_response.toFixed(2));
            }
        }

        var chartData = {
            label: "Process Time (ms)", 
            data: data,
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
            },
            loading: false
        });
    }

	componentDidMount = () => {
        if(this.state.timings) {
            this.formatData();
        } else {
            this.setState({
                loading: false
            });
        }
    }

    renderTimings = () => {
		return (
            <Card classes="m-card">
                <h4 className="text-muted text-400">
                    Average Request Process Times <span className="text-muted text-small">(ms)</span><br/>
                    <span className="text-muted text-small">The amount of time for Machinable servers to process the request, does not include DNS, TLS/Connect time, or time to bytes.</span>
                </h4>
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
            </Card>
        );
    }
    
	render() {
        var result = (this.state.timings) ? this.renderTimings() : this.renderTimings();
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
