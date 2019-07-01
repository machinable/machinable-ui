import React, { Component } from 'react';
import { Select } from 'turtle-ui';

class Boolean extends Component {
    render() {
        return (
            <Select 
                label="Default"
                value={this.props.property.default}
                data-key={this.props.name} 
                name="default" 
                options={[
                    {value: "", text: ""},
                    {value: true, text: "true"},
                    {value: false, text: "false"}
                ]} 
                onChange={this.props.onChange} />
        );
    }
}

export default Boolean;
