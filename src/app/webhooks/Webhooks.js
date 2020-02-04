import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import Examples from '../documentation/Examples';
import List from './List';

class Webhooks extends Component {

   constructor(props) {
      super(props);
      this.state = {
         spec: {},
         projectSlug: props.slug,
         loading: true,
      }
   }

   render() {
      var prefix = this.props.match.url;
      
      return (
         <>
            <div className="padding-side content-header">
               <h3 className="text-400 text-muted margin-top">Webhooks</h3>
            </div>

            <div className="project-content page">
               <div className="page-content">

						<Switch>
							<Route path={`${prefix}/`} exact component={List} />
							<Route path={`${prefix}/:hookId`} component={List} />
						</Switch>

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

export default connect(mapStateToProps)(Webhooks);
