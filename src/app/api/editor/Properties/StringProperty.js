import React, { Component } from 'react';

class String extends Component {
    render() {
        return (
            <>
                <div className="default form-group">
                    <label for="default">Default</label>
                    <input className="form-control" name="default" data-key={this.props.name} value={this.props.property.default} onChange={this.props.onChange}/>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-6">
                        <label for="minLength">Min. Length</label>
                        <input type="number" className="form-control" name="minLength" data-key={this.props.name} value={this.props.property.minLength} onChange={this.props.onChange} id="minLength" placeholder="minimum character length"/>
                    </div>
                    <div class="form-group col-md-6">
                        <label for="maxLength">Max. Length</label>
                        <input type="number" className="form-control" name="maxLength" data-key={this.props.name} value={this.props.property.maxLength} onChange={this.props.onChange} id="maxLength" placeholder="maximum character length"/>
                    </div>
                </div>
                <div className="pattern form-group">
                    <label for="pattern">Pattern</label>
                    <input className="form-control" name="pattern" data-key={this.props.name} value={this.props.property.pattern} onChange={this.props.onChange}/>
                    <small className="form-text text-muted">
                        Use a regular expression to express constraints on this string property.
                    </small>
                </div>
                <div className="enum form-group">
                    <label for="enum">Enum</label>
                    <textarea 
                        className="form-control" 
                        name="enum" 
                        placeholder="values delimited by newlines" 
                        data-key={this.props.name} 
                        value={this.props.property.enum ? this.props.property.enum.join("\r\n") : ""} 
                        onChange={this.props.onChange}/>
                </div>
                <div className="format form-group">
                    <label for="format">Format</label>
                    <select className="form-control" value={this.props.property.format} data-key={this.props.name} name="format" onChange={this.props.onChange}>
                        <option value=""></option>
                        <option value="date-time">date-time</option>
                        <option value="email">email</option>
                        <option value="hostname">hostname</option>
                        <option value="ipv4">ipv4</option>
                        <option value="ipv6">ipv6</option>
                        <option value="uri">uri</option>
                    </select>
                </div>
            </>
        );
    }
}

export default String;
