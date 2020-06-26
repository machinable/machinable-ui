import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Card, Input } from "turtle-ui";

import Machinable from "../../client";
import Statics from "../../Statics";
import slugify from "slugify";
import ObjectComponent from "./editor/Object";

class NewResource extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      slug: props.slug,
      navSelection: { text: "Form", render: this.renderForm },
      newResource: {
        errors: [],
        title: "",
        path_name: "",
        schema: {
          type: "object",
          properties: {},
          required: [],
        },
      },
    };
  }

  onPropertiesChange = (newValue, event) => {
    // var schema = this.state.c;
    // schema = newValue;
    // try{
    //     var temp = JSON.parse(value);
    //     temp = JSON.stringify(temp, undefined, 4);
    //     value = temp;
    // }catch(err){}
    // this.setState({
    // 	schema: schema
    // });
  };

  onChange = (event) => {
    const target = event.target;
    var value = target.value;
    const name = target.name;

    var newResource = this.state.newResource;

    if (name === "title") {
      newResource["path_name"] = value;
    } else if (name === "path_name") {
      var vals = value.split("/");
      if (vals.length > 1) {
        value = value.split("/")[1];
      }
    }

    newResource[name] = value;

    // slugify path name
    newResource["path_name"] = slugify(newResource["path_name"], {
      replacement: "-",
      remove: null,
      lower: false,
    });

    this.setState({
      newResource: newResource,
    });
  };

  saveError = (response) => {
    console.log(response);

    var newResource = this.state.newResource;
    var error =
      response.data && response.data.error
        ? response.data.error
        : "unknown error";
    newResource.errors.push(error);

    this.setState({
      newResource: newResource,
    });
  };

  saveSuccess = (response) => {
    this.setState({
      newResource: {
        errors: [],
        title: "",
        path_name: "",
        schema: {
          type: "object",
          properties: {},
          required: [],
        },
      },
    });
    this.props.onSuccess(response);
  };

  saveResource = () => {
    var errors = [];
    var newResource = this.state.newResource;
    newResource.errors = [];
    this.setState({
      newResource: newResource,
    });
    if (newResource.title === "") {
      errors.push("Resource title cannot be empty.");
    }
    if (newResource.path_name === "") {
      errors.push("Resource path cannot be empty.");
    }
    if (newResource.schema === undefined) {
      errors.push("A resource must have a defined schema.");
    }

    if (errors.length > 0) {
      newResource.errors = errors;
      this.setState({
        newResource: newResource,
      });
      return;
    }

    // remove _sort key for visual
    let scrubSchema = JSON.parse(JSON.stringify(this.state.newResource.schema));
    scrubSchema.properties = this.removeKey("_sort", scrubSchema.properties);
    var payload = {
      title: newResource.title,
      path_name: newResource.path_name,
      schema: scrubSchema,
    };

    Machinable.resources(this.state.slug).create(
      payload,
      this.saveSuccess,
      this.saveError
    );
  };

  onUpdate = (key, obj) => {
    let newResource = this.state.newResource;
    newResource.schema.properties = obj.properties;
    this.setState({
      newResource: newResource,
    });
  };

  toggleNav = (link) => {
    this.setState({ navSelection: link });
  };

  removeKey = (key, obj) => {
    for (var k in obj) {
      delete obj[k][key];
      if (obj[k].type === "object") {
        obj[k].properties = this.removeKey(key, obj[k].properties);
      }
    }
    return obj;
  };

  renderForm = () => {
    const usedRelations = (
      Object.keys(this.state.newResource.schema.properties) || []
    )
      .map((k) => this.state.newResource.schema.properties[k].relation)
      .filter(Boolean);

    const availableRelations = (this.props.relations || []).filter((r) => {
      return usedRelations.indexOf(r) === -1;
    });

    return (
      <ObjectComponent
        relations={this.props.relations || []}
        availableRelations={availableRelations}
        onUpdate={this.onUpdate}
        property={this.state.newResource.schema}
      />
    );
  };

  render() {
    return (
      <div className="full-height grid grid-5">
        <div className="col-3-5 grid-column-end-6">
          <div className="grid grid-1">
            <Card
              classes="footer-plain no-border"
              footer={
                <div className="grid grid-2">
                  <div className="col-2 col-right">
                    <Button classes="accent" onClick={this.saveResource}>
                      Save
                    </Button>
                    <Button classes="plain text" onClick={this.props.close}>
                      Cancel
                    </Button>
                  </div>
                </div>
              }
            >
              <div className="modal-header">
                <h2 className="text-400 margin-bottom no-margin-top">
                  Create a resource
                </h2>
                <p className="text-muted margin-top margin-bottom-even-more">
                  Configure an API Resource to store structured data
                </p>
              </div>
              <div className="grid grid-1">
                {this.state.newResource.errors.length > 0 && (
                  <div className="text-danger">
                    {this.state.newResource.errors.map(function (error, i) {
                      return <div key={i}>{error}</div>;
                    })}
                  </div>
                )}

                <Input
                  placeholder="descriptive title of the resource"
                  label="Title"
                  name="title"
                  value={this.state.newResource.title}
                  onChange={this.onChange}
                />
                <Input
                  placeholder="the url path of this resource"
                  label="Path"
                  name="path_name"
                  value={"/" + this.state.newResource.path_name}
                  onChange={this.onChange}
                />
                <strong>Schema</strong>
                <div className="margin-top-less text-medium text-muted">
                  Define your resource properties using{" "}
                  <a
                    className="link text-400 text-information"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://json-schema.org/"
                  >
                    JSON Schema
                  </a>
                  . Check out our{" "}
                  <a
                    className="link text-400 text-information"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={Statics.DOCS.JSON_SCHEMA_SAMPLES}
                  >
                    sample schemas
                  </a>{" "}
                  to get an idea of how to structure your data.
                </div>
                {this.renderForm()}
                {/* {relations && relations.length > 0 && (
                  <div className="flex">
                    <Button
                      classes="brand plain margin-top  btn-small"
                      onClick={() => this.onAdd("new_key", { type: "string" })}
                    >
                      Add Relation to&nbsp;<u>{"root"}</u>
                    </Button>
                  </div>
                )} */}
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

// redux
function mapStateToProps(state) {
  return {
    slug: state.project_slug,
  };
}

export default connect(mapStateToProps)(NewResource);
