import React, { Component } from 'react';

import { Switch } from 'turtle-ui';

class ObjectProperty extends Component {
    render() {
        return (
            <div>
                <div className="grid grid-1 no-gap margin-bottom-less">
                    <strong>Additional Properties</strong>
                    <Switch 
                        name="additionalProperties" 
                        data-key={this.props.name} 
                        on={this.props.property.additionalProperties} 
                        onChange={this.props.onChange} 
                        />
                    <small className="text-muted">
                        Allow additional properties to be saved with payload.
                    </small>
                </div>
            </div>
        );
    }
}

export default ObjectProperty;
