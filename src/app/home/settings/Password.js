import React, { Component } from 'react';
import { Card, Button, Input } from 'turtle-ui';

class Password extends Component {

	render() {

		return (
			<div className="grid grid-3">
				<Card
					classes="footer-plain col-2"
					footer={
						<div className="grid grid-2">
					    	<div className="col-2">
								<Button type="submit">Update Password</Button>	
					    	</div>
						</div>
					}>
					<h2 className="">Change Password</h2>
					<div>
						<Input placeholder="old password" label="Old Password" name="old_password"/>
					</div>
					
					<div className="margin-top-more">
						<Input placeholder="new password" label="New Password" name="new_password"/>
					</div>

					<div className="margin-top-more">
						<Input placeholder="confirm new password" label="Confirm New Password" name="confirm_new_password"/>
					</div>
				</Card>
			</div>
		  );
	}
}

export default Password;