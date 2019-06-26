import React, { Component } from 'react';

class NumberProperty extends Component {
    render() {
        return (
            <>
                <div className="default form-group">
                    <label for="default">Default</label>
                    <input type="number" className="form-control" name="default" data-key={this.props.name} value={this.props.property.default} onChange={this.props.onChange}/>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="minimum">Minimum</label>
                        <input type="number" className="form-control" name="minimum" data-key={this.props.name} value={this.props.property.minimum} onChange={this.props.onChange} id="minLength" placeholder="minimum character length"/>
                    </div>
                    <div class="form-group col-md-6">
                        <label for="maximum">Maximum</label>
                        <input type="number" className="form-control" name="maximum" data-key={this.props.name} value={this.props.property.maximum} onChange={this.props.onChange} id="maxLength" placeholder="maximum character length"/>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <div className="exclusiveMinimum form-check form-group">
                            <input id={"exclusiveMinimum_"+this.props.name} className="form-check-input" name="exclusiveMinimum" data-key={this.props.name} checked={this.props.property.exclusiveMinimum} onChange={this.props.onChange} type="checkbox"/>
                            <label for={"exclusiveMinimum_"+this.props.name} className="form-check-label">Exclusive Minimum</label>
                        </div>    
                    </div>
                    <div class="form-group col-md-6">
                        <div className="exclusiveMaximum form-check form-group">
                            <input id={"exclusiveMaximum_"+this.props.name} className="form-check-input" name="exclusiveMaximum" data-key={this.props.name} checked={this.props.property.exclusiveMaximum} onChange={this.props.onChange} type="checkbox"/>
                            <label for={"exclusiveMaximum_"+this.props.name} className="form-check-label">Exclusive Maximum</label>
                        </div>    
                    </div>
                </div>
            </>
        );
    }
}

export default NumberProperty;
