import React, { Component } from 'react';
import { connect } from 'react-redux';
import Nav from '../../components/DisplayNav';
import Machinable from '../../client';
import ReactJson from 'react-json-view';

class CollectionData extends Component {
	constructor(props) {
		super(props);
		this.state = {
			slug: props.slug,
			path: props.path,
			items: {}
		}
	}

	dataError = (response) => {
		console.log(response)
	}

	dataSuccess = (response) => {
		this.setState({items: response.data});
	}

	getData = () => {
		Machinable.collections(this.state.slug).data().list(this.state.path, this.dataSuccess, this.dataError);
	}

	componentDidMount = () => {		
		this.getData();
	}

	render() {
		return (
			<div className="margin-top-more code">
				<ReactJson name={false} iconStyle="square" src={this.state.items} />
			</div>
		);
	}
}

class CollectionSettings extends Component {
    render() {
		return (
			<div className="margin-top-more code">
                <ReactJson name={false} iconStyle="square" src={this.props.collection} />
            </div>
		);
	}
}

class Datum extends Component {
	constructor(props) {
        super(props);

		this.state = {
			slug: props.slug,
			collection: props.collection,
            navSelection: {text: "Settings", render: this.renderSettings}
		}
	}

	renderData = () => {
		return(
			<CollectionData slug={this.state.slug} path={this.state.collection.name}/>
		)
	}

	renderSettings = () => {
		return(
			<CollectionSettings collection={this.state.collection}/>
		)
	}

	toggleNav = (link) => {
        console.log(link);
        this.setState({navSelection: link});
    }

	render() {
		return (
			<div>
				{this.props.title}
				<Nav
                    onClickCallback={this.toggleNav}
                    classes="horizontal link-underline underline margin-top-more" 
                    selected={this.state.navSelection.text}
                    links={[
                        {text: "Settings", render: this.renderSettings},
                        {text: "Data", render: this.renderData}
                    ]}
                />
				{this.state.navSelection.render()}
			</div>
		);
	}
}

// redux
function mapStateToProps(state) {
	return {
		slug: state.project_slug
	};
}
  
export default connect(mapStateToProps)(Datum);