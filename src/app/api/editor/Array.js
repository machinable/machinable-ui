import React, { Component } from 'react';
import ObjectComponent from './Object';
import PropertySettings from './Properties/PropertySettings';
import { Button, Input, Select, Modal, Card } from 'turtle-ui';
import Dismiss from '../../../components/DismissModalButton';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faCog from '@fortawesome/fontawesome-free-solid/faCog';

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
                <Modal 
                    isOpen={this.state.show} 
                    close={this.close}>

                    <div className="align-center grid grid-3">
                        <div className="col-3-2">
                            <div className=" grid grid-1">
                                <Card
                                    classes="footer-plain no-border"
                                    footer={
                                        <div className="grid grid-2">
                                            <div className="col-2 col-right">
                                                <Button classes="plain text" onClick={this.close}>Done</Button>	
                                            </div>
                                        </div>
                                    }>
                                    <Dismiss onClick={this.close} />

                                    <PropertySettings  
                                        name={this.props.name + " items"} 
                                        property={this.props.property.items} 
                                        required={this.props.required} 
                                        onChange={this.onChange}
                                        arrayItems={true} />
                                </Card>
                            </div>
                        </div>
                    </div>
                </Modal>

                <div className="property flex">
                    <div className="items margin-right-less">
                        <Input type="text" disabled classes="items-input" value="Items" />
                    </div>
                    <div className="type margin-right-less">
                        <Select 
                            value={this.props.property.items.type} 
                            name="type" 
                            onChange={this.onChange}
                            options={[
                                {value: "string", text: "string"},
                                {value: "integer", text: "integer"},
                                {value: "number", text: "number"},
                                {value: "boolean", text: "boolean"},
                                {value: "array", text: "array"},
                                {value: "object", text: "object"},
                            ]} />
                    </div>
                    <Button type="button" classes="text plain" onClick={this.open}>
                        <FontAwesomeIcon className="text-muted" icon={faCog} />
                    </Button>
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
