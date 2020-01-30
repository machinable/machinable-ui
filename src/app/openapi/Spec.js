import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card } from 'turtle-ui';
import Robot from '../../images/project/robot.svg';
import Examples from '../documentation/Examples';
import ReactJson from 'react-json-view';
import Machinable from '../../client';

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
				<div className="padding-side content-header">
					<h3 className="text-400 text-muted margin-top">OpenAPI Specification</h3>
				</div>

				<div className="project-content page">
					<div className="page-content">

                  <Card
                     classes="m-card m-item-selection"
                  >
                     {!this.state.loading && 
                        <ReactJson
                           collapsed={5} 
                           name={false} 
                           iconStyle="square" 
                           src={this.state.spec} />
                     }
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
