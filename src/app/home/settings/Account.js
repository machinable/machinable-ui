import React, { Component } from 'react';
import { Card, Button, Input } from 'turtle-ui';

class Account extends Component {

	render() {

		return (
			<div className="grid grid-3">
				<Card
					classes="footer-plain col-2"
					footer={
						<div className="grid grid-2">
					    	<div className="col-2">
								<Button type="submit">Update Info</Button>	
					    	</div>
						</div>
					}>
					<h2>Contact Information</h2>
					<div >
						<Input placeholder="name" label="Name" name="name"/>
					</div>
					
					<div className="margin-top-more">
						<Input placeholder="email" label="Email" name="email"/>
					</div>
				</Card>
			</div>
		  );
	}
}

export default Account;