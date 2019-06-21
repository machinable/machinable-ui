import React, { Component } from 'react';
import { Button, Input } from 'turtle-ui';
import moment from 'moment';

import API from '../../../client/';

class Account extends Component {

	constructor(props) {
		super(props);
		this.state = {
			user: {},
			loading: true,
			old_password: "",
			new_password: "",
			confirm_new_password: "",
			errors: []
		}
	}

	userError = (error) => {
		console.log(error);
		this.setState({loading: false, errors: [error.data.error]});
	}

	passwordSuccess = () => {
		this.setState({
			new_password: "",
			confirm_new_password: "",
			old_password: "",
			loading: false
		});
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

	updatePassword = () => {
		var {new_password, old_password, confirm_new_password} = this.state;
		var errors = [];

		if(new_password === "" || old_password === "") {
			errors.push("Password cannot be empty.")
		}
		if(new_password !== confirm_new_password) {
			errors.push("New password must match.");
		}

		if(errors.length === 0) {
			this.setState({
				errors: errors,
				loading: true
			});
			API.user().resetPassword(old_password, new_password, this.passwordSuccess, this.userError);
		} else {
			this.setState({
				errors: errors
			});
		}
	}

	passwordChange = (event) => {
		const target = event.target;
	    const value = target.type === 'checkbox' ? target.checked : target.value;
	    const name = target.name;

	    this.setState({
	    	[name]: value
	    });
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

					<br/>
					<h4 className="text-muted border-bottom">Change Password</h4>
					
					<div className="grid grid-1 padding-top">
						{ this.state.errors.length > 0 &&
						<div className="text-danger text-center margin-bottom-more">
							{this.state.errors.map(function(error){
								return (<div className="text-400 padding-bottom">{error}</div>)
							})}
						</div>}
						<div className="grid grid-1">
							<Input label="Old Password" type="password" labelClasses="text-muted" placeholder="old password" name="old_password" value={this.state.old_password} onChange={this.passwordChange}/>
							<Input label="New Password" type="password" labelClasses="text-muted" placeholder="new password" name="new_password" value={this.state.new_password} onChange={this.passwordChange}/>
							<Input label="Confirm New Password" type="password" labelClasses="text-muted" placeholder="confirm new password" name="confirm_new_password" value={this.state.confirm_new_password} onChange={this.passwordChange}/>
						</div>

						<div className="grid grid-1">
							<div className="align-right">
								<Button type="button" loading={this.state.loading} onClick={this.updatePassword}>Update Password</Button>	
							</div>
						</div>

					</div>

					<br/>
			</div>
		  );
	}
}

export default Account;