import React, { Component } from 'react';
import { Card } from 'turtle-ui';

import Meeting from '../../../images/meeting.svg';
import Creation from '../../../images/creation.svg';

class Support extends Component {

	render() {

		return (
			<div className="grid grid-1">
				<Card className="align-center full-width">
					<div>
						<div className="align-center">
							<img style={{width: "200px", height: "200px"}} title="new site" alt="creating things" src={Creation} />
							<img style={{width: "200px", height: "200px", "marginTop": "40px", "marginLeft": "-40px"}} title="new site" alt="meeting new people" src={Meeting} />
						</div>
						<h3 className="align-center">Questions, Comments, or Issues?</h3>
						
						<h3 className="align-center">Send us an email at&nbsp;<a className="text-400 text-information" href="mailto:support@keeplight.io">support@machinable.io</a></h3>
					</div>
				</Card>
			</div>
		  );
	}
}

export default Support;