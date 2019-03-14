import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from '../../../components/Loader';
import Machinable from '../../../client';
import ReactJson from 'react-json-view';

class Codes extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: true,
			slug: props.slug,
			codes: undefined
		}
	}

	codesError = (response) => {
		console.log(response);
		this.setState({loading: false});
	}

	codesSuccess = (response) => {
		this.setState({loading: false, codes: response.data});
	}

	loadCodes = () => {
		Machinable.collections(this.state.slug).codes(this.codesSuccess, this.codesError)
	}

	componentDidMount = () => {
		this.loadCodes();
	}

    renderCodes = () => {
		return (
            <div className="code"><ReactJson collapsed={2} name={false} iconStyle="square" src={this.state.codes} /></div>
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
