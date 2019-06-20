import React, { Component } from 'react';
import {Button, Card, Input} from 'turtle-ui';
import Machinable from '../../client';

const UserAPI = Machinable.user();


class Login extends Component {

	constructor(props) {
		super(props);
		this.state = {
		  username: "",
		  password: "",
		  errors: [],
		  loading: false
		}
  }

 	handleResponse = (response) => {
		UserAPI.saveTokens(
			response.data.access_token,
			response.data.refresh_token,
			response.data.session_id,
			response.data.user_id
		);
		this.props.history.push('/home');
	}

	handleError = (err) => {
	    var error = '';
	    if(err.status === 404) {
	      error = 'Invalid username or password';
	    }
	    else {
	      error = 'Issue logging in, please try again.'
	    }
	    this.setState({
	        loading: false,
	        errors: [error]
	      });
	}

  	onChange = (event) => {
	    const target = event.target;
	    const value = target.type === 'checkbox' ? target.checked : target.value;
	    const name = target.name;

	    this.setState({
	    	[name]: value
	    });
  	}

  	onSubmit = (event) => {
    	event.preventDefault();
    	var errors = [];

	    if(!this.state.username) {
	      errors.push('Username cannot be empty');
	    }

	    if(!this.state.password) {
	      errors.push('Password cannot be empty');
	    }

	    this.setState({
	      errors: errors
	    });

	    var arr = errors.map(function(k) { return k });

	    if(arr.join('').length === 0) {
			var un = this.state.username;
			var pw = this.state.password;
	     	this.setState({
				loading: true,
				password: ''
	      	});

	      	UserAPI.login(
					un, 
					pw)
					.then(this.handleResponse)
					.catch(this.handleError);
	    }
  	}

  	Register = () => {
        this.props.history.push('/register');
  	}

	render() {

		return (
            <div className="grid grid-10">
                <div className="login-card col-4-8">
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
								<div className="text-danger text-center margin-bottom-more">
									{this.state.errors.map(function(error){
										return (<div className="text-400 padding-bottom">{error}</div>)
									})}
								</div>
                            }

                            <div>
                                <Input placeholder="username" label="Username" name="username" value={this.state.username} onChange={this.onChange}/>
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