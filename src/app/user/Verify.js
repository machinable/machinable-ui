import React, { Component } from 'react';
import { Button, Card } from 'turtle-ui';
import Machinable from '../../client';
import Loader from '../../components/Loader';

const UserAPI = Machinable.user();

class Verify extends Component {

    constructor(props) {
        super(props);
        this.state = {
            errors: [],
            code: props.match.params.code,
            message: "Verifying Code",
            loading: true
        }
    }

    handleResponse = (response) => {
        UserAPI.saveTokens(
            response.data.access_token,
            response.data.refresh_token,
            response.data.session_id
        );
        this.setState({
                message: "Successfully verified email, logging in..."
            },
            () => setTimeout(() => this.props.history.push('/home'), 3000)
        );
    }

    handleError = (err) => {
        console.log(err);
        var error = err.data.error;
        if (error === '') {
            if (err.status === 404) {
                error = 'Invalid username or password';
            }
            else {
                error = 'Issue logging in, please try again.'
            }
        }
        this.setState({
            loading: false,
            errors: [error],
            message: ""
        });
    }

    login = () => {
        this.props.history.push('/login');
  	}

    componentDidMount() {
        UserAPI.verify(this.state.code, this.handleResponse, this.handleError)
    }

    render() {

        return (
            <div className="grid grid-10">
                <div className="login-card col-4-8">
                    <Card
                        classes="footer-plain"
                        footer={
                            <Button classes="plain text full-width" onClick={this.login}>Login</Button>	
                        }>
                        <br />
                        <h2 className="text-center">Email Verification</h2>

                        {this.state.errors.length > 0 &&
                            <div className="text-danger text-center margin-bottom-more">
                                {this.state.errors.map(function (error) {
                                    return (<div className="text-400 padding-bottom">{error}</div>)
                                })}
                            </div>
                        }
                        <Loader loading={this.state.loading} />
                        <h3 className="text-center">{this.state.message}</h3>
                    </Card>
                </div>
            </div>
        );
    }
}

export default Verify;
