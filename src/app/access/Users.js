import React, { Component } from 'react';
import { Table, Button } from 'turtle-ui';
import Loader from '../../components/Loader';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faUser from '@fortawesome/fontawesome-free-solid/faUserCircle';
import faEllipsis from '@fortawesome/fontawesome-free-solid/faEllipsisV';
import Machinable from '../../client';
import moment from 'moment';

class Users extends Component {

	constructor(props) {
        super(props);
		this.state = {
            loading: true,
            users: [],
            showModal: false
		}
	}

    usersError = (response) => {
        console.log(response);
    }

    usersSuccess = (response) => {
        this.setState({users: response.data.items, loading: false});
    }

    getUsers = () => {
        Machinable.users().list(this.usersSuccess, this.usersError);
    }

	componentDidMount = () => {		
		this.getUsers();
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

        var tableValues = this.state.users.map(function(user, idx){
            return [
                <div className="vertical-align">
                    <FontAwesomeIcon className="margin-right text-muted" style={{"fontSize": "24px"}} icon={faUser} />
                    <div>
                        <h3 className="text-400 no-margin">{user.username}</h3>
                        <div className="text-muted">{moment(user.created).fromNow()}</div>
                    </div>
                </div>,
                <div className="align-right">
                    <span className="vertical-align">
                        {user.id} <Button classes="btn-small margin-left">Copy</Button>
                    </span>
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
				<Button classes="accent page-btn" onClick={this.openModal}>Add User</Button>
			</div>
		  );
	}
}


export default Users;