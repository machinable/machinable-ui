import React, { Component } from 'react';
import { RedocStandalone } from 'redoc';
import Robot from '../../images/project/robot.svg';
import Header from '../../components/HomeHeader';
import Machinable from '../../client';

class Spec extends Component {

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
      spec['info']['x-logo']['url'] = Robot;
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

export default Spec;
