import React, { Component } from 'react';
import { Button, Input } from 'turtle-ui';
import moment from 'moment';

import API from '../../../client/';

class Account extends Component {

	constructor(props) {
		super(props);
		this.state = {
			user: {},
			loading: true
		}
	}

	userError = (error) => {
		console.log(error);
		this.setState({loading: false});
	}

	receivedUser = (response) => {
		this.setState({user: response.data.user, loading: false});
	}

	getUser = () => {
		API.user().get(this.receivedUser, this.userError);
	}

	componentDidMount = () => {
		this.getUser();
	}

	render() {

		return (
			<div className="grid grid-1">
				<h4 className="text-muted border-bottom">Account Information</h4>

					<div className="grid grid-1 padding-top">
						<div className="grid grid-3">
							<h3 className="vertical-align margin">Username</h3>
							<div className="col-2 background-content padding-less vertical-align">
								<span>{this.state.user ? this.state.user.username : "" }</span>
							</div>
						</div>
						<div className="grid grid-3">
							<h3 className="vertical-align margin">Email</h3>
							<div className="col-2 background-content padding-less vertical-align">
								<span></span>
							</div>
						</div>
						<div className="grid grid-3">
							<h3 className="vertical-align margin">Created</h3>
							<div className="col-2 background-content padding-less vertical-align">
								<span>{this.state.user ? moment(this.state.user.created).format('MMMM Do YYYY, h:mm a') : "" }</span>
							</div>
						</div>
					</div>

					{/* <br/>
					<h4 className="text-muted border-bottom">Change Password</h4>
					
					<div className="grid grid-1 padding-top">

						<div className="grid grid-1">
							<Input label="Old Password" labelClasses="text-muted" placeholder="old password" name="old_password"/>
							<Input label="New Password" labelClasses="text-muted" placeholder="new password" name="new_password"/>
							<Input label="Confirm New Password" labelClasses="text-muted" placeholder="confirm new password" name="confirm_new_password"/>
						</div>

						<div className="grid grid-1">
							<div className="align-right">
								<Button type="submit">Update Password</Button>	
							</div>
						</div>

					</div> */}

					<br/>
			</div>
		  );
	}
}

export default Account;