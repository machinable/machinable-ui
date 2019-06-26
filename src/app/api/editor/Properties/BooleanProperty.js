import React, { Component } from 'react';

class Boolean extends Component {
    render() {
        return (
            <>
                <div className="default form-group">
                    <label for="default">Default</label>
                    <select className="form-control" value={this.props.property.default} data-key={this.props.name} name="default" onChange={this.props.onChange}>
                        <option value=""></option>
                        <option value={true}>true</option>
                        <option value={false}>false</option>
                    </select>
                </div>
            </>
        );
    }
}

export default Boolean;
