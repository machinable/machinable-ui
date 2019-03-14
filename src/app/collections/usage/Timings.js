import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from '../../../components/Loader';
import Machinable from '../../../client';
import ReactJson from 'react-json-view';

class Timings extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			slug: props.slug,
			timings: undefined
		}
	}

	timingsError = (response) => {
		console.log(response);
		this.setState({loading: false});
	}

	timingsSuccess = (response) => {
		this.setState({loading: false, timings: response.data});
	}

	loadTimings = () => {
		Machinable.collections(this.state.slug).timings(this.timingsSuccess, this.timingsError)
    }
    
	componentDidMount = () => {
		this.loadTimings();
	}

    renderTimings = () => {
		return (
            <div className="code"><ReactJson collapsed={2} name={false} iconStyle="square" src={this.state.timings} /></div>
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
