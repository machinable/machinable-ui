import React, { Component } from 'react';
import { Input, Switch} from 'turtle-ui';

class NumberProperty extends Component {
    render() {
        return (
            <>
                {/* <Input 
                    label="Default" 
                    type="number"
                    name="default" 
                    data-key={this.props.name}
                    value={this.props.property.default} 
                    onChange={this.props.onChange}/>

                <div></div> */}

                <Input 
                    label="Minimum" 
                    type="number"
                    name="minimum" 
                    data-key={this.props.name}
                    value={this.props.property.minLength} 
                    onChange={this.props.onChange}
                    placeholder="minimum value"/>

                <Input 
                    label="Maximum" 
                    type="number"
                    name="maximum" 
                    data-key={this.props.name}
                    value={this.props.property.maximum} 
                    onChange={this.props.onChange}
                    placeholder="maximum value"/>



                <div className="grid grid-1 no-gap margin-bottom-less">
                    <strong>Exclusive Minimum</strong>
                    <Switch 
                        name="exclusiveMinimum" 
                        data-key={this.props.name} 
                        on={this.props.property.exclusiveMinimum} 
                        onChange={this.props.onChange} 
                        />
                </div>

                <div className="grid grid-1 no-gap margin-bottom-less">
                    <strong>Exclusive Maximum</strong>
                    <Switch 
                        name="exclusiveMaximum" 
                        data-key={this.props.name} 
                        on={this.props.property.exclusiveMaximum} 
                        onChange={this.props.onChange} 
                        />
                </div>
               
            </>
        );
    }
}

export default NumberProperty;
