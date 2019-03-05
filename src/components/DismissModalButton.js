import React, { Component } from 'react';
import { Button } from 'turtle-ui';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes';

class Dismiss extends Component {
	render() {
		return (
            <div className="align-right">
                <Button classes="text plain btn-small text-more-muted" onClick={this.props.onClick}>
                    <FontAwesomeIcon icon={faTimes} />
                </Button>
            </div>
		  );
	}
}


export default Dismiss;