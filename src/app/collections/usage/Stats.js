import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from '../../../components/Loader';
import Machinable from '../../../client';
import ReactJson from 'react-json-view';

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
        return (
            <div>
                <h4 className="text-muted text-400">Storage</h4>
                <div className="code"><ReactJson collapsed={2} name={false} iconStyle="square" src={this.state.stats} /></div>
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
