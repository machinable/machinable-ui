import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Button } from 'turtle-ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import faLink from '@fortawesome/fontawesome-free-solid/faLink';
import Examples from '../documentation/Examples';
import ReactJson from 'react-json-view';
import Machinable from '../../client';
import { SOURCES } from '../../components/ProjectIcon'; 

class Spec extends Component {

   constructor(props) {
      super(props);
      this.state = {
         spec: {},
         projectSlug: props.slug,
         loading: true,
      }
   }

   specError = (response) => {
      this.setState({ loading: false, errors: [response.data && response.data.error] });
   }

   specSuccess = (response) => {
      var spec = response.data.spec;
      var icon = spec['info']['x-logo']['url'];
      spec['info']['x-logo']['url'] = SOURCES[icon];
      this.setState({ spec: spec, loading: false });
   }

   getSpec = () => {
      Machinable.spec(this.state.projectSlug).get(this.specSuccess, this.specError);
   }

   openDocs = () => {
      window.open(`/docs/${this.state.projectSlug}`, '_blank');
   }

   componentDidMount = () => {
      this.getSpec();
   }

   render() {
      return (
         <>
            <div className="padding-side content-header">
               <h3 className="text-400 text-muted margin-top">API Reference Documentation</h3>
            </div>

            <div className="project-content page">
               <div className="page-content">

                  <Card
                     classes="m-card"
                  >
                     <div className="">
                        <div className="grid grid-2">
                           <h3>OpenAPI Specification</h3>
                           <div className="align-right">

                              <Button classes="text-information text plain" onClick={this.openDocs}>
                                 <FontAwesomeIcon icon={faLink} />
                                 &nbsp;View with ReDoc
                              </Button>
                           </div>
                        </div>

                        {!this.state.loading &&
                           <ReactJson
                              displayObjectSize={false}
                              displayDataTypes={false}
                              collapsed={2}
                              name={false}
                              iconStyle="square"
                              src={this.state.spec} />
                        }
                     </div>
                  </Card>
               </div>

               {/* DOCUMENTATION */}
               <div className="page-docs">
                  <h4 className="text-more-muted text-600">DOCUMENTATION</h4>
                  <div className="grid grid-3">
                     <Examples />
                  </div>
               </div>
            </div>
         </>
      );
   }
}

// redux
function mapStateToProps(state) {
   return {
      slug: state.project_slug
   };
}

export default connect(mapStateToProps)(Spec);
