import React, { Component } from "react";
import Property from "./Property";
import { Button } from "turtle-ui";

class ObjectComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name || "root",
      rootClass: !this.props.name ? "__m-root" : "",
    };
  }

  onUpdate = (key, obj) => {
    var name = this.props.name || "root";
    var property = this.props.property;
    var pr = this.props.property.properties;
    pr[key] = obj;
    property.properties = pr;
    this.props.onUpdate(name, property);
  };

  onDeleteKey = (key) => {
    var name = this.props.name || "root";
    var property = this.props.property;
    var pr = this.props.property.properties;
    delete pr[key];
    property.properties = pr;
    this.props.onUpdate(name, property);
  };

  onAdd = (key, obj) => {
    var name = this.props.name || "root";
    var property = this.props.property;
    var pr = this.props.property.properties;
    var count = 0;
    for (var k in pr) if (pr.hasOwnProperty(k)) ++count;
    obj["_sort"] = count;
    pr[key] = obj;
    property.properties = pr;
    this.props.onUpdate(name, property);
  };

  onChange = (event) => {
    var name = this.props.name || "root";
    var property = this.props.property;
    var pr = this.props.property.properties;

    let k = event.target.getAttribute("data-key");
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;

    if (event.target.name === "_key") {
      // update old key to new key, then delete old key
      var oldv = event.target.getAttribute("data-value");
      var obj = pr[oldv];
      delete pr[oldv];
      pr[event.target.value] = obj;

      // update required
      let i = property.required.indexOf(oldv);
      if (i > -1) {
        property.required.splice(i, 1);
        property.required.push(event.target.value);
      }
    } else if (event.target.name === "_required") {
      if (event.target.checked) {
        // add
        property.required.push(k);
      } else {
        // remove
        let i = property.required.indexOf(k);
        if (i > -1) {
          property.required.splice(i, 1);
        }
      }
    } else if (event.target.name === "_additionalProperties") {
      property.additionalProperties = event.target.checked;
    } else if (event.target.name === "enum") {
      if (value === "") {
        delete pr[k]["enum"];
      } else {
        pr[k]["enum"] = value.split(/\r?\n/);
      }
    } else if (
      event.target.name === "minLength" ||
      event.target.name === "maxLength"
    ) {
      pr[k][event.target.name] = parseInt(value);
    } else if (
      event.target.name === "minimum" ||
      event.target.name === "maximum"
    ) {
      pr[k][event.target.name] = parseFloat(value);
    } else if (event.target.name === "relation") {
      let oldv = k;
      let obj = pr[oldv];
      delete pr[oldv];
      const newName = value + "_id";
      pr[newName] = obj;

      // update required
      let i = property.required.indexOf(oldv);
      if (i > -1) {
        property.required.splice(i, 1);
        property.required.push(newName);
      }
      pr[newName].relation = value;
    } else {
      pr[k][event.target.name] = value;

      // cleanup object and array specific keys
      if (event.target.name === "type") {
        if (event.target.value !== "object") {
          delete pr[k]["properties"];
          delete pr[k]["required"];
          delete pr[k]["additionalProperties"];
        }

        if (event.target.value !== "array") {
          delete pr[k]["items"];
        }

        if (event.target.value === "object") {
          pr[k]["properties"] = {};
          pr[k]["required"] = [];
          // pr[k]["additionalProperties"] = false;
        } else if (event.target.value === "array") {
          pr[k]["items"] = { type: "string" };
        }
      }
    }

    property.properties = pr;
    this.props.onUpdate(name, property);
  };

  render() {
    var { properties } = this.props.property;

    var sortable = [];
    for (var key in properties) {
      sortable.push([key, properties[key]]);
    }

    sortable.sort(function (a, b) {
      return a[1]["_sort"] - b[1]["_sort"];
    });

    return (
      <div className={"objectWrapper " + this.state.rootClass}>
        {sortable.map(function (el, i) {
          return (
            <Property
              key={this.props.name + "_" + i}
              name={el[0]}
              property={el[1]}
              required={this.props.property.required.indexOf(el[0]) > -1}
              onChange={this.onChange}
              onUpdate={this.onUpdate}
              onDeleteKey={this.onDeleteKey}
              relations={this.props.relations}
              availableRelations={this.props.availableRelations}
            />
          );
        }, this)}
        <Button
          classes="brand plain margin-top  btn-small"
          onClick={() => this.onAdd("new_key", { type: "string" })}
        >
          Add Property to&nbsp;<u>{this.props.name || "root"}</u>
        </Button>
        {!this.props.name &&
          this.props.availableRelations &&
          this.props.availableRelations.length > 0 && (
            <div>
              <Button
                classes="brand plain margin-top  btn-small"
                onClick={() =>
                  this.onAdd(this.props.availableRelations[0] + "_id", {
                    type: "string",
                    relation: this.props.availableRelations[0],
                  })
                }
              >
                Add Relation to&nbsp;<u>{"root"}</u>
              </Button>
            </div>
          )}
      </div>
    );
  }
}

export default ObjectComponent;
