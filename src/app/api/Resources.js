import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Button,
  Modal,
  Card,
  Dropdown,
  List,
  ListItem,
  Table,
  Input,
} from "turtle-ui";
import Loader from "../../components/Loader";
import Dismiss from "../../components/DismissModalButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import faEllipsis from "@fortawesome/fontawesome-free-solid/faEllipsisV";
import Empty from "../../images/empty_board.svg";
import Machinable from "../../client";
import Statics from "../../Statics";
import Details from "./Details";
import moment from "moment";
import NewResource from "./NewResource";

class Resources extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      resources: { items: [] },
      showModal: false,
      showExtraModal: false,
      showDeleteModal: false,
      slug: props.slug,
      extraElement: <div>nothing selected</div>,
      deleteResource: {},
    };
  }

  editorDidMount = (editor, monaco) => {};

  resError = (response) => {
    console.log(response);
    this.setState({ loading: false, errors: [response.data.error] });
  };

  resSuccess = (response) => {
    this.setState(
      { resources: response.data, loading: false },
      this.closeModal
    );
  };

  getResources = () => {
    Machinable.resources(this.state.slug).list(this.resSuccess, this.resError);
  };

  closeModal = () => {
    var html = document.getElementsByTagName("html")[0];
    html.style.cssText = "--root-overflow: auto";
    this.setState({ showModal: false, showDeleteModal: false });
  };

  openModal = () => {
    var html = document.getElementsByTagName("html")[0];
    html.style.cssText = "--root-overflow: hidden";
    this.setState({ showModal: true });
  };

  closeExtraModal = () => {
    var html = document.getElementsByTagName("html")[0];
    html.style.cssText = "--root-overflow: auto";
    this.setState({
      showExtraModal: false,
      showDeleteModal: false,
      extraElement: <div></div>,
    });
  };

  openExtraModal = (element) => {
    var html = document.getElementsByTagName("html")[0];
    html.style.cssText = "--root-overflow: hidden";
    this.setState({ showExtraModal: true, extraElement: element });
  };

  openDeleteModal = (resource) => {
    var html = document.getElementsByTagName("html")[0];
    html.style.cssText = "--root-overflow: hidden";
    this.setState({ showDeleteModal: true, deleteResource: resource });
  };

  deleteResource = () => {
    this.setState({ loading: true });
    Machinable.resources(this.state.slug).delete(
      this.state.deleteResource.id,
      this.getResources,
      this.resError
    );
  };

  componentDidMount = () => {
    this.getResources();
  };

  getTablePageButtons = () => {
    var buttons = [];
    buttons.push(
      <Button key={"table_btn_0"} classes={"text plain btn-small disabled"}>
        Previous
      </Button>
    );
    buttons.push(
      <Button key={"table_btn_1"} classes={"text plain btn-small disabled"}>
        Next
      </Button>
    );
    return buttons;
  };

  getResourceTable = () => {
    const { items } = this.state.resources;
    const pathNames = items.map((def) => def.path_name);
    var resourceValues = items.map(function (def, idx) {
      const relations = pathNames.filter((p) => p !== def.path_name);
      var fullURL =
        Statics.GenerateAPIHost(this.state.slug) + "/api/" + def.path_name;
      var definitionTitle = (
        <div>
          <h4 className="text-400 no-margin margin-bottom-less">{def.title}</h4>
          <div className="text-small text-information">
            <a
              className="anchor"
              target="_blank"
              rel="noopener noreferrer"
              href={fullURL}
              title={fullURL}
            >
              {fullURL}
            </a>
          </div>
        </div>
      );
      return [
        definitionTitle,
        <div>{moment(def.created).fromNow()}</div>,
        <div className="align-right vertical-align">
          <Dropdown
            showIcon={false}
            width={150}
            buttonText={
              <FontAwesomeIcon className="text-muted" icon={faEllipsis} />
            }
            buttonClasses="text plain vertical-align"
            classes="align-items-right"
          >
            <div className="grid grid-1">
              <List>
                <ListItem
                  title={<div className="text-center text-400">More</div>}
                  onClick={() =>
                    this.openExtraModal(
                      <Details
                        title={definitionTitle}
                        definition={def}
                        relations={relations}
                        slug={this.state.slug}
                        path={def.path_name}
                      />
                    )
                  }
                />
                <hr className="no-margin no-padding" />
                <ListItem
                  title={
                    <div className="text-center text-danger text-400">
                      Delete
                    </div>
                  }
                  onClick={() => this.openDeleteModal(def)}
                />
              </List>
            </div>
          </Dropdown>
        </div>,
      ];
    }, this);

    const buttons = this.getTablePageButtons();

    return (
      <React.Fragment>
        <Table
          title={
            <div className="grid grid-2">
              <div className="vertical-align">
                <Input
                  labelClasses="flex-1"
                  classes="search"
                  placeholder="Search resources..."
                />
              </div>
              <div className="align-right">
                <Button classes="brand plain page-btn" onClick={this.openModal}>
                  New Resource
                </Button>
              </div>
            </div>
          }
          classes="m-table"
          headers={["Name", "Created", ""]}
          values={resourceValues}
          footer={
            <div className="grid grid-2">
              <div className="text-small text-muted vertical-align">
                showing 1 to {items.length} of {items.length} entries
              </div>
              <div className="pull-right">
                {buttons.map(function (btn, index) {
                  return btn;
                })}
              </div>
            </div>
          }
        />
      </React.Fragment>
    );
  };

  emptyState = () => {
    return (
      <div className="grid grid-1">
        <div className="align-center flex-col">
          <h2 className="text-center">Get started with a new API Resource</h2>
          <img src={Empty} alt="" className="empty-state-sm" />
          <h3 className="text-center">
            Define an API Resource that will validate user submitted data
          </h3>
          <div className="align-center">
            <Button classes="accent" onClick={this.openModal}>
              Create A Resource
            </Button>
          </div>
        </div>
      </div>
    );
  };

  render() {
    var renderResources =
      Object.keys(this.state.resources.items).length > 0
        ? this.getResourceTable()
        : this.emptyState();
    const { items } = this.state.resources;
    const pathNames = items.map((def) => def.path_name);
    return (
      <div>
        <Loader loading={this.state.loading} />
        {!this.state.loading && renderResources}

        <Modal
          classes="from-right"
          close={this.closeExtraModal}
          isOpen={this.state.showExtraModal}
        >
          <div className="full-height grid grid-4">
            <div className="col-2-5">
              <div className="grid grid-1">
                <Card
                  classes="footer-plain no-border"
                  footer={
                    <div className="grid grid-2">
                      <div className="col-2 col-right">
                        <Button
                          classes="plain text"
                          onClick={this.closeExtraModal}
                        >
                          Close
                        </Button>
                      </div>
                    </div>
                  }
                >
                  {this.state.extraElement}
                </Card>
              </div>
            </div>
          </div>
        </Modal>

        <Modal close={this.closeExtraModal} isOpen={this.state.showDeleteModal}>
          <div className="align-center grid grid-3">
            <div className="col-3-2">
              <div className=" grid grid-1">
                <Card
                  classes="footer-plain no-border"
                  footer={
                    <div className="grid grid-2">
                      <div className="col-2 col-right">
                        <Button
                          classes="plain text"
                          onClick={this.closeExtraModal}
                        >
                          Cancel
                        </Button>
                        <Button
                          classes="danger margin-left"
                          type="submit"
                          loading={this.state.loading}
                          onClick={this.deleteResource}
                        >
                          Yes, I'm sure
                        </Button>
                      </div>
                    </div>
                  }
                >
                  <Dismiss onClick={this.closeExtraModal} />
                  <h2 className="text-center">Delete Resource</h2>
                  <h3 className="text-center">
                    Are you sure you want to delete{" "}
                    <strong>{this.state.deleteResource.title}</strong>?
                  </h3>
                  <p className="text-center">
                    This will delete the definition and remove all data stored
                    for this resource. This cannot be undone.
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </Modal>

        <Modal
          classes="from-right"
          close={this.closeModal}
          isOpen={this.state.showModal}
        >
          <NewResource
            relations={pathNames}
            onSuccess={this.getResources}
            close={this.closeModal}
          />
        </Modal>
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

export default connect(mapStateToProps)(Resources);
