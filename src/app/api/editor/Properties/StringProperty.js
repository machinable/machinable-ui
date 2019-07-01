import React, { Component } from 'react';

import { Input, Select, TextArea} from 'turtle-ui';

class String extends Component {
    render() {
        return (
            <>
                {/* <Input 
                    label="Default" 
                    labelClasses="col-2" 
                    name="default" 
                    data-key={this.props.name}
                    value={this.props.property.default} 
                    onChange={this.props.onChange}/> */}

                <Input 
                    label="Min. Length" 
                    type="number"
                    name="minLength" 
                    data-key={this.props.name}
                    value={this.props.property.minLength} 
                    onChange={this.props.onChange}
                    placeholder="minimum character length"/>

                <Input 
                    label="Max. Length" 
                    type="number"
                    name="maxLength" 
                    data-key={this.props.name}
                    value={this.props.property.maxLength} 
                    onChange={this.props.onChange}
                    placeholder="maximum character length"/>

                <div className="col-2">
                    <div className="grid grid-1 no-gap">
                        <Input 
                            label="Pattern" 
                            name="pattern" 
                            data-key={this.props.name}
                            value={this.props.property.pattern} 
                            onChange={this.props.onChange}/>
                        <small className="form-text text-muted">
                            Use a regular expression to express constraints on this string property.
                        </small>
                    </div>
                </div>

                <div className="col-2">
                    <div className="grid grid-1">
                        <TextArea 
                            label="Enum"
                            name="enum" 
                            placeholder="values delimited by newlines" 
                            data-key={this.props.name} 
                            value={this.props.property.enum ? this.props.property.enum.join("\r\n") : ""}
                            onChange={this.props.onChange}/>
                    </div>
                </div>

                <Select 
                    label="Format"
                    value={this.props.property.format}
                    data-key={this.props.name} 
                    name="format" 
                    options={[
                        {value: "", text: ""},
                        {value: "date-time", text: "date-time"},
                        {value: "email", text: "email"},
                        {value: "hostname", text: "hostname"},
                        {value: "ipv4", text: "ipv4"},
                        {value: "ipv6", text: "ipv6"},
                        {value: "uri", text: "uri"},
                    ]} 
                    onChange={this.props.onChange} />
            </>
        );
    }
}

export default String;
