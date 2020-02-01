import React, { Component } from 'react';
import { RedocStandalone } from 'redoc';
import Machinable from '../../client';
import { SOURCES } from '../../components/ProjectIcon'; 

class Documentation extends Component {

	constructor(props) {
      super(props);
      this.state = {
       spec: {},
       projectSlug: props.match.params.projectSlug,
       loading: true,
    }
 }

	specError = (response) => {
		this.setState({loading: false, errors: [response.data && response.data.error]});
	}

	specSuccess = (response) => {
      var spec = response.data.spec;
      var icon = spec['info']['x-logo']['url'];
      spec['info']['x-logo']['url'] = SOURCES[icon];
		this.setState({spec: spec, loading: false});
	}

	getSpec = () => {
		Machinable.spec(this.state.projectSlug).get(this.specSuccess, this.specError);
	}

   componentDidMount = () => {
      this.getSpec();
   }

   render() {
      return (
         <>
            {!this.state.loading && <RedocStandalone
               spec={this.state.spec}
            />}
         </>
      );
   }
}

export default Documentation;
