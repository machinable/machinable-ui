import React, { Component } from 'react';
import { Table, Button } from 'turtle-ui';
import Loader from '../../components/Loader';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faKey from '@fortawesome/fontawesome-free-solid/faKey';
import faEllipsis from '@fortawesome/fontawesome-free-solid/faEllipsisV';
import Machinable from '../../client';
import moment from 'moment';

class Tokens extends Component {

	constructor(props) {
        super(props);
		this.state = {
            loading: true,
            tokens: [],
            showModal: false
		}
	}

    tokenError = (response) => {
        console.log(response);
    }

    tokenSuccess = (response) => {
        this.setState({tokens: response.data.items, loading: false});
    }

    getTokens = () => {
        Machinable.tokens().list(this.tokenSuccess, this.tokenError);
    }

	componentDidMount = () => {		
		this.getTokens();
    }
    
    closeModal = () => {
		var html = document.getElementsByTagName('html')[0];
        html.style.cssText = "--root-overflow: auto";
		this.setState({showModal: false});
	}

	openModal = () => {
		var html = document.getElementsByTagName('html')[0];
        html.style.cssText = "--root-overflow: hidden";
		this.setState({showModal: true});
	}

	render() {

        var tableValues = this.state.tokens.map(function(token, idx){
            return [
                <div className="vertical-align">
                    <FontAwesomeIcon className="margin-right text-muted" style={{"fontSize": "24px"}} icon={faKey} />
                    <div>
                        <h3 className="text-400 no-margin">{token.description}</h3>
                        <div className="text-muted">{moment(token.created).fromNow()}</div>
                    </div>
                </div>,
                <div className=" align-right">
                    <Button classes="plain text no-click"><FontAwesomeIcon className="text-muted" icon={faEllipsis} /></Button>
                </div>
            ]
        })

		return (
			<div className="grid grid-1">
				<Table
					classes="hover"
					values={tableValues}
				/>
				<Button classes="accent page-btn" onClick={this.openModal}>Generate API Token</Button>
			</div>
		  );
	}
}


export default Tokens;