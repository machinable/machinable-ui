import React, { Component } from 'react';
import ObjectComponent from './Object';
import Modal from './Modal';
import PropertySettings from './Properties/PropertySettings';

class ArrayComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false
        };
    }

    open = () => {
        this.setState({show: true});
    }

    close = () => {
        this.setState({show: false});
    }

    onChange = (event) => {
        // This component will only ever update the `items` key of the array property.
        // So update the items and ride the update up the chain

        var property = this.props.property;
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        property.items[event.target.name] = value;
        
        // cleanup object and array specific keys
        if(event.target.name === "type") {
            if(event.target.value !== "object") {
                delete property.items["properties"];
                delete property.items["required"];
                delete property.items["additionalProperties"];
            }
            
            if(event.target.value !== "array") {
                delete property.items["items"];
            }
            
            if(event.target.value === "object") {
                property.items["properties"] = {};
                property.items["required"] = [];
                property.items["additionalProperties"] = false;
            } else if(event.target.value === "array") {
                property.items["items"] = {"type": "string"};
            }
        }

        if (event.target.name === "enum") {
            const value = event.target.value;
            if (value === "") {
                delete property.items["enum"];
            } else {
                property.items["enum"] = value.split(/\r?\n/);
            }
        }

        this.props.onUpdate(this.props.name, property);
    }

    onUpdate = (key, obj) => {
        var property = this.props.property;
        property.items = obj;
        this.props.onUpdate(this.props.name, property);
    }

    render() {
        return (
            <>
                <Modal show={this.state.show} onClose={this.close}>
                    <div className="modal-wrapper">
                        <div className="backdrop-modal" onClick={this.close}></div>
                        <div className="x-modal">
                            <div className="wrapper">
                                <button type="button" class="close-modal btn btn-light btn-sm" onClick={this.close}><i class="fa fa-times"></i></button>

                                <div className="content">
                                    <PropertySettings  
                                        name={this.props.name + " items"} 
                                        property={this.props.property.items} 
                                        required={this.props.required} 
                                        onChange={this.onChange}
                                        arrayItems={true} />
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>

                <div className="property form-inline">
                    <div className="items form-group mr-2">
                        <input type="text" disabled className="form-control items-input" value="Items" />
                    </div>
                    <div className="type form-group mr-2 input-group">
                        <div class="input-group-prepend">
                            <div class="input-group-text">Type</div>
                        </div>
                        <select className="form-control" value={this.props.property.items.type} name="type" onChange={this.onChange}>
                            <option value="string">string</option>
                            <option value="integer">integer</option>
                            <option value="number">number</option>
                            <option value="boolean">boolean</option>
                            <option value="array">array</option>
                            <option value="object">object</option>
                        </select>
                    </div>
                    <div className="name form-group ">
                        <button type="button" class="btn btn-light btn-sm" onClick={this.open}><i class="fa fa-cog"></i></button>
                    </div>
                </div>

                {this.props.property.items.type === "array" && 
                    <ArrayComponent name={this.props.name + " items"} property={this.props.property.items} onUpdate={this.onUpdate}/>
                }
                {this.props.property.items.type === "object" && 
                    <ObjectComponent name={this.props.name + " items"} property={this.props.property.items} onUpdate={this.onUpdate}/>
                }
            </>
        );
    }
}

export default ArrayComponent;
