import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from '../../../components/Loader';
import Machinable from '../../../client';

class Requests extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: false,
			slug: props.slug,
			requests: undefined,
		}
	}
    
    renderStats = () => {
        return (
            <div>
                <h4 className="text-muted text-400">Requests</h4>
                <div className="code"></div>
            </div>
        );
    }

	render() {
        var result = this.renderStats();
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
  
export default connect(mapStateToProps)(Requests);
