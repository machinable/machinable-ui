import React, { Component } from 'react';
import Boolean from './BooleanProperty';
import ObjectProperty from './ObjectProperty';
import String from './StringProperty';
import Number from './NumberProperty';

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
                <h4>{this.props.name}</h4>
                <hr/>
                <form className="form">
                    {!this.props.arrayItems && 
                    <div className="name form-group">
                        <label for="_key">Property Name</label>
                        <input className="form-control" name="_key" data-value={this.props.name} value={this.props.name} onChange={onChange}/>
                    </div>}
                    <div className="type form-group">
                        <label for="type">Type</label>
                        <select className="form-control" id="type" value={this.props.property.type} data-key={this.props.name} name="type" onChange={onChange}>
                            <option value="string">string</option>
                            <option value="integer">integer</option>
                            <option value="number">number</option>
                            <option value="boolean">boolean</option>
                            <option value="array">array</option>
                            <option value="object">object</option>
                        </select>
                    </div>
                    <div className="description form-group">
                        <label for="description">Description</label>
                        <textarea 
                            className="form-control" 
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
                </form>
            </>
        );
    }
}

export default PropertySettings;
