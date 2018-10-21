import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card } from 'turtle-ui';
import Footer from '../components/Footer';
import Logo from '../components/Logo';
import './Home.css';
import { Route, Switch } from 'react-router-dom';

class Error extends Component {
    errorMessage = (msg) => {
        return (
            <div className="grid grid-8">
                <Card classes="project-hover col-2-8">
                    <h2 className="text-center">{msg}</h2>
                    {/* <img src={Empty} className="empty-state"/> */}
                </Card>
            </div>
        )
    }

	render() {
        var prefix = this.props.match.url;
		return (
			<React.Fragment>
				<div className="back-drop"></div>
				<div className="root container container-home">
					
					<div className="home-header">
						<div className="grid grid-2" style={{"height": "100%"}}>
							<div className="vertical-align">
								<h3 className="vertical-align text-400 text-white">
									<Logo color={"#FFF"}/>
									<span className="margin-left">Machinable</span>
								</h3>
							</div>
						</div>
					</div>				

					<div className="content page">
						<div className="page-content home-content">
							<Switch>
								<Route path={prefix+"/404"} render={() => this.errorMessage("404 Not Found")} />
							</Switch>
						</div>

						{/* DOCUMENTATION */}
						<div className="page-docs">
							<div>
								<h4 className="text-more-muted text-600"><br/>DOCUMENTATION</h4>
								<div className="grid grid-3">
									<div>
										<a className="link text-400 text-information">Overview</a>
										<p className="text-muted">Machinable user documentation. Create and manage your projects.</p>
									</div>
									<div>
										<a className="link text-400 text-information">API</a>
										<p className="text-muted">Machinable RESTful API documentation.</p>
									</div>
									<div>
										<a className="link text-400 text-information">Samples</a>
										<p className="text-muted">View the Machinable Github page for sample applications.</p>
									</div>
								</div>
							</div>
						</div>
					</div>

					<Footer />
				</div>
			</React.Fragment>
		  );
	}
}

// Add this function:
function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(Error);