import React, { Component } from 'react';

class Examples extends Component {

	constructor(props) {
        super(props);
        
	}

	componentDidMount = () => {		

	}

	render() {
		return (
			<div>
                <a className="link text-400 text-information" target="_blank" rel="noopener" href={"https://github.com/search?q=topic%3Aexample+org%3Amachinable&type=Repositories"} title={"https://github.com/search?q=topic%3Aexample+org%3Amachinable&type=Repositories"}>Examples</a>
                <p className="text-muted">View the Machinable Github page to see example applications.</p>
            </div>
		  );
	}
}


export default Examples;