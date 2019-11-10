import React, { Component } from 'react';
import { Table, Button, Select, Dropdown } from 'turtle-ui';
import { connect } from 'react-redux';
import Machinable from '../../client';
import Loader from '../../components/Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import faSync from '@fortawesome/fontawesome-free-solid/faSync';
import ReactJson from 'react-json-view';
import Statics from "../../Statics";

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

	componentWillReceiveProps = (newProps) => {
		if (newProps.rootKey !== this.state.rootKey) {
			this.setState({loading: true, rootKey: newProps.rootKey}, this.getKey);
		}
	}

	render() {
		const { rootKey, slug, loading, rootKeyData } = this.state
		const fullURL = Statics.GenerateAPIHost(slug) + "/json/" + rootKey.key + "/";

		return (
			<>
				<a className="anchor" target="_blank" rel="noopener noreferrer" href={fullURL} title={fullURL}>{fullURL}</a>
				{this.state.loading && <Loader loading={loading} />}
				{!this.state.loading &&
					<div className="margin-top padding">
						<ReactJson 
							onAdd={() => {}}
							onEdit={() => {}}
							onDelete={() => {}}
							collapsed={2} 
							name={rootKey.key} 
							iconStyle="square" 
							src={rootKeyData} />
					</div>
				}
			</>
		  );
	}
}

export default Details;
