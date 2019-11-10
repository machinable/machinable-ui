import React, { Component } from 'react';
import { Table, Button, Select, Dropdown } from 'turtle-ui';
import { connect } from 'react-redux';
import Machinable from '../../client';
import Loader from '../../components/Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import faSync from '@fortawesome/fontawesome-free-solid/faSync';
import moment from 'moment';

class Details extends Component {

	constructor(props) {
        super(props);
        
		this.state = {
			slug: props.slug,
            loading: true,
            rootKey: props.rootKey,
            rootKeyData: {},
		}
	}

	colError = (response) => {
		console.log(response);
		this.setState({loading: false, errors: ["error"]});
	}

	colSuccess = (response) => {
		this.setState({rootKeyData: response.data, loading: false});
	}

	getKey = () => {
		Machinable.rootKeys(this.state.slug).get(this.state.rootKey.key, this.colSuccess, this.colError);
    }
    
	componentDidMount = () => {		
        this.getKey();
	}

	render() {
		return (
			<>
				{this.state.loading && <Loader loading={this.state.loading} />}
				{!this.state.loading && <pre>{JSON.stringify(this.state.rootKeyData, undefined, 3)}</pre>}
			</>
		  );
	}
}

export default Details;
