import React, { Component } from 'react';
import { Card, Button, Input } from 'turtle-ui';

class Account extends Component {

	render() {

		return (
			<div className="grid grid-1">
				<h4 className="text-400 text-muted">Account Information</h4>
				<Card
					classes="footer-plain">

					<div className="grid grid-1">

						<div className="grid grid-3">
							<h3 className="vertical-align">Email</h3>
							<Input labelClasses="col-2" placeholder="email" name="email"/>
						</div>
						{/* <div className="grid grid-1">
							<div className="align-right">
								<Button type="submit">Update Info</Button>	
							</div>
						</div> */}
					</div>

				</Card>

				<h4 className="text-400 text-muted">Change Password</h4>
				<Card
					classes="footer-plain">
					
					<div className="grid grid-1">

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

					</div>

					<br/>
				</Card>
			</div>
		  );
	}
}

export default Account;