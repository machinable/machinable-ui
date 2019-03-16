import React, { Component } from 'react';
import { Card, Button, Input } from 'turtle-ui';

class Account extends Component {

	render() {

		return (
			<div className="grid grid-1">
				<Card
					classes="footer-plain">

					<div className="grid grid-1">
						<h2 className="text-center">Account Information</h2>

						<div className="grid grid-3">
							<h3 className="vertical-align">Email</h3>
							<Input labelClasses="col-2" placeholder="email" name="email"/>
						</div>
						<div className="grid grid-1">
							<div className="align-right">
								<Button type="submit">Update Info</Button>	
							</div>
						</div>
					</div>

					<br/>
					<hr />
					
					<div className="grid grid-1">
						<h2 className="text-center">Change Password</h2>

						<div className="grid grid-3">
							<h3 className="vertical-align">Old Password</h3>
							<Input labelClasses="col-2" placeholder="old password" name="old_password"/>
							
							<h3 className="vertical-align">New Password</h3>
							<Input labelClasses="col-2" placeholder="new password" name="new_password"/>

							<h3 className="vertical-align">Confirm New Password</h3>
							<Input labelClasses="col-2" placeholder="confirm new password" name="confirm_new_password"/>
						</div>

						<div className="grid grid-1">
							<div className="align-right">
								<Button type="submit">Update Password</Button>	
							</div>
						</div>

					</div>

					<br/>
				</Card>
			</div>
		  );
	}
}

export default Account;