import React, { Component } from 'react';

class ObjectProperty extends Component {
    render() {
        return (
            <>
                <div className="additionalProperties form-check form-group">
                    <input id={"additionalProperties_"+this.props.name} className="form-check-input" name="additionalProperties" data-key={this.props.name} checked={this.props.property.additionalProperties} onChange={this.props.onChange} type="checkbox"/>
                    <label for={"additionalProperties_"+this.props.name} className="form-check-label">Additional Properties</label>
                    <small className="form-text text-muted">
                        Allow additional properties.
                    </small>
                </div>
            </>
        );
    }
}

export default ObjectProperty;
