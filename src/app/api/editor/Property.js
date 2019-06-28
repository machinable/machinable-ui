import React, { Component } from 'react';
import ObjectComponent from './Object';
import ArrayComponent from './Array';
import PropertySettings from './Properties/PropertySettings';
import { Button, Input, Select, Modal, Card} from 'turtle-ui';
import Dismiss from '../../../components/DismissModalButton';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faCog from '@fortawesome/fontawesome-free-solid/faCog';
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes';

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
                                        name={this.props.name} 
                                        property={this.props.property} 
                                        required={this.props.required} 
                                        onChange={this.props.onChange} />
                                </Card>
                            </div>
                        </div>
                    </div>
                </Modal>

                <div className="property-wrapper">
                    <div className="property flex">
                        <div className="name margin-right-less">
                            <Input className="form-control" name="_key" data-value={this.props.name} value={this.props.name} onChange={onChange}/>
                        </div>
                        <div className="type margin-right-less">
                            <Select 
                                value={this.props.property.type} 
                                options={[
                                    {value: "string", text: "string"},
                                    {value: "integer", text: "integer"},
                                    {value: "number", text: "number"},
                                    {value: "boolean", text: "boolean"},
                                    {value: "array", text: "array"},
                                    {value: "object", text: "object"},
                                ]} 
                                data-key={this.props.name} 
                                name="type" 
                                onChange={onChange} />
                        </div>

                        <Button type="button" classes="text plain btn-small" onClick={this.open}>
                            <FontAwesomeIcon className="text-muted" icon={faCog} />
                        </Button>

                        <Button type="button" classes="text plain btn-small" onClick={() => this.props.onDeleteKey(this.props.name)}>
                            <FontAwesomeIcon className="text-more-muted" icon={faTimes} />
                        </Button>
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
