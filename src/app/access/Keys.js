import React, { Component } from 'react';
import { Table, Button } from 'turtle-ui';
import { connect } from 'react-redux';
import Loader from '../../components/Loader';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faKey from '@fortawesome/fontawesome-free-solid/faKey';
import faEllipsis from '@fortawesome/fontawesome-free-solid/faEllipsisV';
import Empty from '../../images/safe.svg';
import Machinable from '../../client';
import moment from 'moment';

class Keys extends Component {

	constructor(props) {
        super(props);
		this.state = {
            loading: true,
            keys: [],
            showModal: false,
            slug: props.slug
		}
	}

    keyError = (response) => {
        console.log(response);
        this.setState({loading: false});
    }

    keySuccess = (response) => {
        this.setState({keys: response.data.items, loading: false});
    }

    getKeys = () => {
        Machinable.keys(this.state.slug).list(this.keySuccess, this.keyError);
    }

	componentDidMount = () => {		
		this.getKeys();
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
    
    emptyState = () => {
        return (
            <div className="grid grid-8">
                <div className="col-2-8 flex-col">
                    <h2 className="text-center">No API Keys</h2>
                    <img src={Empty} className="empty-state-sm"/>
                    <h3 className="text-center">Create API Keys with read/write access to your project's API Resources and Collections</h3>
                    <div className="align-center">
                        <Button classes="accent" onClick={this.openModal}>Generate API Token</Button>
                    </div>
                </div>
            </div>
        );
    }

    renderKeys = () => {
        var tableValues = this.state.keys.map(function(key, idx){
            var accessList = [];
            if(key.read) {
                accessList.push("read");
            }
            if(key.write) {
                accessList.push("write");
            }
            if(accessList.length == 0) {
                accessList.push("none");
            }
            return [
                <div className="vertical-align">
                    <FontAwesomeIcon className="margin-right text-muted" style={{"fontSize": "24px"}} icon={faKey} />
                    <div>
                        <h3 className="text-400 no-margin">{key.description}</h3>
                        <div className="text-muted">{moment(key.created).fromNow()}</div>
                    </div>
                </div>,
                <div>{accessList.join(" / ")}</div>,
                <div className=" align-right">
                    <Button classes="plain text no-click"><FontAwesomeIcon className="text-muted" icon={faEllipsis} /></Button>
                </div>
            ]
        });

        return (
            <React.Fragment>
                <Table
					classes="hover"
					values={tableValues}
				/>
				<Button classes="accent page-btn" onClick={this.openModal}>Generate API Token</Button>
            </React.Fragment>
        )
    }

	render() {

        var renderKeys = this.state.keys.length > 0 ? this.renderKeys() : this.emptyState();

		return (
			<div>
                <Loader loading={this.state.loading}/>
				{!this.state.loading && renderKeys}
			</div>
		  );
	}
}

// redux
function mapStateToProps(state) {
	return {
		slug: state.project_slug
	};
}
  
export default connect(mapStateToProps)(Keys);