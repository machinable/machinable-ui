import React, { Component } from 'react';
import ObjectComponent from './Object';
import ArrayComponent from './Array';
import Modal from './Modal';
import PropertySettings from './Properties/PropertySettings';
import { Button, Input, Select } from 'turtle-ui';

class Property extends Component {
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
                <Modal show={this.state.show} onClose={this.close}>
                    <div className="modal-wrapper">
                        <div className="backdrop-modal" onClick={this.close}></div>
                        <div className="x-modal">
                            <div className="wrapper">
                                <Button type="button" classes="text plain" onClick={this.close}><i className="fa fa-times">x</i></Button>

                                <div className="content">
                                    <PropertySettings  
                                        name={this.props.name} 
                                        property={this.props.property} 
                                        required={this.props.required} 
                                        onChange={this.props.onChange} />
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>

                <div className="property-wrapper">
                    <div className="property flex">
                        <div className="name margin-right-less">
                            <Input className="form-control" name="_key" data-value={this.props.name} value={this.props.name} onChange={onChange}/>
                        </div>
                        <div className="type margin-right-less input-group">
                            {/* <div className="input-group-prepend">
                                <div className="input-group-text">Type</div>
                            </div> */}
                            <Select 
                                className="form-control" 
                                value={this.props.property.type} 
                                options={[
                                    {value: "string", text: "string"},
                                    {value: "integer", text: "integer"},
                                    {value: "number", text: "number"},
                                    {value: "boolean", text: "boolean"},
                                    {value: "array", text: "array"},
                                    {value: "object", text: "object"},
                                ]} 
                                data-key={this.props.name} name="type" 
                                onChange={onChange} />
                        </div>

                        <Button type="button" classes="text plain" onClick={this.open}><i className="fa fa-cog">e</i></Button>

                        <Button type="button" classes="text plain" onClick={() => this.props.onDeleteKey(this.props.name)}><i className="fa fa-times">x</i></Button>
                    </div>
                    {this.props.property.type === "array" && 
                        <ArrayComponent name={this.props.name} property={this.props.property} required={this.props.required} onUpdate={this.props.onUpdate}/>
                        
                    }
                    {this.props.property.type === "object" && 
                        <ObjectComponent name={this.props.name} property={this.props.property} onUpdate={this.props.onUpdate}/>
                    }
                </div>
            </>
        );
    }
}

export default Property;
