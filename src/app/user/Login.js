import React, { Component } from 'react';
import {Button, Card, Modal, Input} from 'turtle-ui';
import Logo from '../../components/Logo';


class Login extends Component {

	constructor(props) {
		super(props);
		this.state = {
		  email: "",
		  password: "",
		  errors: [],
		  loading: false
		}
  }

 	handleResponse = (response) => {
		// const history = this.props.history;
		// API.setData(response.data, function(){
		//   history.push('/sites');
		// });
	}

	handleError = (err) => {
	    // var error = '';
	    // if(err.status === 404) {
	    //   error = 'Invalid email or password';
	    // }
	    // else {
	    //   error = 'Issue logging in, please try again.'
	    // }
	    // this.setState({
	    //     loading: false,
	    //     errors: [error]
	    //   });
	}

  	onChange = (event) => {
	    // const target = event.target;
	    // const value = target.type === 'checkbox' ? target.checked : target.value;
	    // const name = target.name;

	    // this.setState({
	    // 	[name]: value
	    // });
  	}

  	onSubmit = (event) => {
    	// event.preventDefault();
    	// var errors = [];

	    // if(!this.state.email) {
	    //   errors.push('Email cannot be empty');
	    // }

	    // if(!this.state.password) {
	    //   errors.push('Password cannot be empty');
	    // }

	    // this.setState({
	    //   errors: errors
	    // });

	    // var arr = errors.map(function(k) { return k });

	    // if(arr.join('').length === 0) {

	    //   this.setState({
	    //     loading: true
	    //   });

	    //   API.login(
	    //     this.state.email, 
	    //     this.state.password)
	    //     .then(this.handleResponse)
	    //     .catch(this.handleError);
	    // }
  	}

  	Register = () => {
        this.props.history.push('/register');
  	}

  	componentDidMount = () => {

    }

	render() {

		return (
            <div className="grid grid-8">
                <div className="project-hover col-2-8">
                    <form onSubmit={this.onSubmit}>
                        <Card
                            classes="footer-plain"
                            footer={
                                <div className="grid grid-2">
                                    <div className="col-2 col-right">
                                        <Button classes="plain text" onClick={this.Register}>Register</Button>	
                                        <Button classes="brand margin-left" type="submit" loading={this.state.loading}>Login</Button>	
                                    </div>
                                </div>
                            }>
                            <br/>
                            <h2 className="text-center">Login</h2>

                            { this.state.errors.length > 0 &&
                                <Card
                                    classes="danger margin-bottom-more">
                                    <div className="text-danger">
                                        {this.state.errors.map(function(error){
                                            return (<div className="text-400">{error}</div>)
                                        })}
                                    </div>
                                </Card>
                            }

                            <div>
                                <Input placeholder="email address" label="Email" name="email" value={this.state.email} onChange={this.onChange}/>
                            </div>
                            
                            <div className="margin-top-more">
                                <Input placeholder="password" type="password" label="Password" name="password" value={this.state.password} onChange={this.onChange}/>
                            </div>

                        </Card>
                    </form>
                </div>
            </div>
		  );
	}
}

export default Login;