import React, { Component } from 'react';
import Boolean from './BooleanProperty';
import ObjectProperty from './ObjectProperty';
import String from './StringProperty';
import Number from './NumberProperty';

import { Button, Input, Select, TextArea, Modal, Card} from 'turtle-ui';

class PropertySettings extends Component {
    render() {
        var {onChange} = this.props;
        var property = this.props.property;

        if(property.type === "object" && !property.properties) {
            property["properties"] = {};
            property["required"] = [];
        }

        if(property.type === "array" && !property.items) {
            property["items"] = {"type": "string"};
        }

        return (
            <>
                <h3>{this.props.name}</h3>
                <div className="grid grid-2">
                    {!this.props.arrayItems && 
                    <Input label="Property Name" labelClasses="col-2" name="_key" data-value={this.props.name} value={this.props.name} onChange={onChange}/>}
                    
                    <Select 
                        label="Type"
                        labelClasses="col-2"
                        id="type" 
                        value={this.props.property.type}
                        data-key={this.props.name} 
                        name="type" 
                        options={[
                            {value: "string", text: "string"},
                            {value: "integer", text: "integer"},
                            {value: "number", text: "number"},
                            {value: "boolean", text: "boolean"},
                            {value: "array", text: "array"},
                            {value: "object", text: "object"},
                        ]} 
                        onChange={onChange} />

                    <div className="col-2">
                        <TextArea 
                            label="Description"
                            name="description" 
                            placeholder="enter description" 
                            data-key={this.props.name} 
                            value={this.props.property.description} 
                            onChange={onChange}/>
                    </div>
                    {!this.props.arrayItems && 
                    <div className="required form-check form-group">
                        <input id={"required_"+this.props.name} className="form-check-input" name="_required" data-key={this.props.name} checked={this.props.required} onChange={onChange} type="checkbox"/>
                        <label for={"required_"+this.props.name} className="form-check-label">Required</label>
                        <small className="form-text text-muted">
                            Specify if this field's value is required when saving data.
                        </small>
                    </div>}
                    {this.props.property.type === "boolean" && <Boolean property={this.props.property} name={this.props.name} onChange={this.props.onChange}/>}
                    {this.props.property.type === "object" && <ObjectProperty property={this.props.property} name={this.props.name} onChange={this.props.onChange}/>}
                    {this.props.property.type === "string" && <String property={this.props.property} name={this.props.name} onChange={this.props.onChange}/>}
                    {this.props.property.type === "integer" && <Number property={this.props.property} name={this.props.name} onChange={this.props.onChange}/>}
                    {this.props.property.type === "number" && <Number property={this.props.property} name={this.props.name} onChange={this.props.onChange}/>}
                </div>
            </>
        );
    }
}

export default PropertySettings;
