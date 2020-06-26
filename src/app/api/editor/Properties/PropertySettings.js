import React, { Component } from "react";
import Boolean from "./BooleanProperty";
import ObjectProperty from "./ObjectProperty";
import String from "./StringProperty";
import Number from "./NumberProperty";

import { Input, Select, TextArea, Switch } from "turtle-ui";

class PropertySettings extends Component {
  render() {
    var { onChange } = this.props;
    var property = this.props.property;

    if (property.type === "object" && !property.properties) {
      property["properties"] = {};
      property["required"] = [];
    }

    if (property.type === "array" && !property.items) {
      property["items"] = { type: "string" };
    }

    return (
      <>
        {!this.props.property.relation && (
          <>
            <h2>
              <span className="text-more-muted">Edit property - </span>{" "}
              {this.props.name}
            </h2>
            <div className="grid grid-2">
              {!this.props.arrayItems && (
                <Input
                  label="Property Name"
                  name="_key"
                  data-value={this.props.name}
                  value={this.props.name}
                  onChange={onChange}
                />
              )}

              <Select
                label="Type"
                id="type"
                value={this.props.property.type}
                data-key={this.props.name}
                name="type"
                options={[
                  { value: "string", text: "string" },
                  { value: "integer", text: "integer" },
                  { value: "number", text: "number" },
                  { value: "boolean", text: "boolean" },
                  { value: "array", text: "array" },
                  { value: "object", text: "object" },
                ]}
                onChange={onChange}
              />

              <div className="col-2">
                <div className="grid grid-1">
                  <TextArea
                    label="Description"
                    name="description"
                    placeholder="enter description"
                    data-key={this.props.name}
                    value={this.props.property.description}
                    onChange={onChange}
                  />
                </div>
              </div>

              {!this.props.arrayItems && (
                <div
                  className={
                    this.props.property.type === "object" ? "" : "col-2"
                  }
                >
                  <div className="grid grid-1 no-gap margin-bottom-less">
                    <strong>Required</strong>
                    <Switch
                      name="_required"
                      data-key={this.props.name}
                      on={this.props.required}
                      onChange={onChange}
                    />
                    <small className="text-muted">
                      Specify if this field's value is required when saving
                      data.
                    </small>
                  </div>
                </div>
              )}
              {this.props.property.type === "boolean" && (
                <Boolean
                  property={this.props.property}
                  name={this.props.name}
                  onChange={this.props.onChange}
                />
              )}
              {this.props.property.type === "object" && (
                <ObjectProperty
                  property={this.props.property}
                  name={this.props.name}
                  onChange={this.props.onChange}
                />
              )}
              {this.props.property.type === "string" && (
                <String
                  property={this.props.property}
                  name={this.props.name}
                  onChange={this.props.onChange}
                />
              )}
              {this.props.property.type === "integer" && (
                <Number
                  property={this.props.property}
                  name={this.props.name}
                  onChange={this.props.onChange}
                />
              )}
              {this.props.property.type === "number" && (
                <Number
                  property={this.props.property}
                  name={this.props.name}
                  onChange={this.props.onChange}
                />
              )}
            </div>
          </>
        )}
        {this.props.property.relation && (
          <>
            <h2>
              <span className="text-more-muted">Edit relation - </span>{" "}
              {this.props.name}
            </h2>
            <div className="grid grid-2">
              <Input
                label="Property Name"
                name="_key"
                data-value={this.props.name}
                value={this.props.name}
                onChange={onChange}
              />

              <div
                className={this.props.property.type === "object" ? "" : "col-2"}
              >
                <div className="grid grid-1 no-gap margin-bottom-less">
                  <strong>Required</strong>
                  <Switch
                    name="_required"
                    data-key={this.props.name}
                    on={this.props.required}
                    onChange={onChange}
                  />
                  <small className="text-muted">
                    Specify if this field's value is required when saving data.
                  </small>
                </div>
              </div>
            </div>
          </>
        )}
      </>
    );
  }
}

export default PropertySettings;
