import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Button, Card, Modal, Input, Switch } from 'turtle-ui';
import Loader from '../../components/Loader';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faUser from '@fortawesome/fontawesome-free-solid/faUserCircle';
import faEllipsis from '@fortawesome/fontawesome-free-solid/faEllipsisV';
import Empty from '../../images/empty.svg';
import Machinable from '../../client';
import moment from 'moment';

class Users extends Component {

	constructor(props) {
        super(props);
		this.state = {
            loading: true,
            users: [],
            showModal: false,
            slug: props.slug,
            newUser: {
                username: "",
                password: "",
                read: true,
                write: false
            },
            errors: []
		}
    }
    
    userReset = () => {
        return {
            username: "",
            password: "",
            read: true,
            write: false
        };
    }

    usersError = (response) => {
        console.log(response);
        this.setState({errors: [response.data.error], loading: false});
    }

    usersSuccess = (response) => {
        this.setState({users: response.data.items, loading: false, showModal: false, newUser: this.userReset()});
    }

    getUsers = () => {
        Machinable.users(this.state.slug).list(this.usersSuccess, this.usersError);
    }

	componentDidMount = () => {		
		this.getUsers();
    }
    
    closeModal = () => {
		var html = document.getElementsByTagName('html')[0];
        html.style.cssText = "--root-overflow: auto";
		this.setState({showModal: false});
	}

	openModal = () => {
		var html = document.getElementsByTagName('html')[0];
        html.style.cssText = "--root-overflow: hidden";
		this.setState({showModal: true});
    }

    createUser = () => {
	    this.setState({
	      loading: true
        });

        var errors = [];

	    if(!this.state.newUser.username) {
	        errors.push('User name cannot be empty');
	    }

	    if(!this.state.newUser.password) {
            errors.push('User password cannot be empty');
        }

	    this.setState({
          errors: errors,
          loading: errors.length == 0
        });
        
        if(errors.length === 0) {
            Machinable.users(this.state.slug).create(
                this.state.newUser,
                this.getUsers, 
                this.usersError);
        }
    }
    
    onChange = (event) => {
        const target = event.target;
	    const value = target.type === 'checkbox' ? target.checked : target.value;
	    const name = target.name;
        var nu = this.state.newUser;
        nu[name] = value;
        
	    this.setState({
	    	newUser: nu
	    });
    }

    emptyState = () => {
        return (
            <div className="grid grid-8">
                <div className="col-2-8 flex-col">
                    <h2 className="text-center">It's a bit empty in here</h2>
                    <img src={Empty} className="empty-state"/>
                    <br/>
                    <h3 className="text-center">Add project users that have access to your project's API Resources and Collections</h3>
                    <br/>
                    <div className="align-center">
                        <Button classes="accent" onClick={this.openModal}>Add A User</Button>
                    </div>
                </div>
            </div>
        )
    }

	render() {

        var tableValues = this.state.users.map(function(user, idx){
            var accessList = [];
            if(user.read) {
                accessList.push("read");
            }
            if(user.write) {
                accessList.push("write");
            }
            return [
                <div className="vertical-align">
                    <FontAwesomeIcon className="margin-right text-muted" style={{"fontSize": "24px"}} icon={faUser} />
                    <div>
                        <h3 className="text-400 no-margin">{user.username}</h3>
                        <div className="text-muted text-small margin-top-less">{moment(user.created).fromNow()}</div>
                    </div>
                </div>,
                <div>{accessList.join(" / ")}</div>,
                <div className="align-right">
                    <span className="vertical-align">
                        {user.id} <Button classes="btn-small margin-left">Copy</Button>
                    </span>
                </div>,
                <div className=" align-right">
                    <Button classes="plain text no-click"><FontAwesomeIcon className="text-muted" icon={faEllipsis} /></Button>
                </div>
            ]
        });

		return (
			<div className="grid grid-1">
                {tableValues.length > 0 && 
                    <React.Fragment>
                        <Table
                            headers={["Username", "Access", <div className="align-center text-400">ID</div>, <div className="align-right text-400">Options</div>]}
                            values={tableValues}
                        />
                        <Button classes="accent page-btn" onClick={this.openModal}>Add User</Button>
                    </React.Fragment>
                }

                {!tableValues.length &&
                    this.emptyState()
                }

                <Modal 
					close={this.closeModal}
					isOpen={this.state.showModal}>
                    <div className="align-center grid grid-3">
                        <div className="col-3-2">
                            <div className=" grid grid-1">
                                <Card
                                    classes="footer-plain no-border"
                                    footer={
                                        <div className="grid grid-2">
                                            <div className="col-2 col-right">
                                                <Button classes="plain text" onClick={this.closeModal}>Cancel</Button>	
                                                <Button classes="brand margin-left" type="submit" loading={this.state.loading} onClick={this.createUser}>Create</Button>	
                                            </div>
                                        </div>
                                    }>

                                    <h2 className="text-center">New Project User</h2>

                                    { this.state.errors.length > 0 &&
                                        <div className="text-danger text-center margin-bottom-more">
                                            {this.state.errors.map(function(error){
                                                return (<div className="text-400 padding-bottom">{error}</div>)
                                            })}
                                        </div>
                                    }

                                    <div className="grid grid-1">
                                        <Input placeholder="username" label="Username" name="username" value={this.state.newUser.username} onChange={this.onChange}/>
                                        <Input placeholder="password" label="Password" type="password" name="password" value={this.state.newUser.password} onChange={this.onChange}/>
                                        <div className="grid grid-2">
                                            <div className="align-center vertical-align">
                                                <strong className="margin-right">Read</strong>
                                                <Switch name="read" on={this.state.newUser.read} onChange={this.onChange}/>
                                            </div>
                                            <div className="align-center vertical-align">
                                                <strong className="margin-right">Write</strong>
                                                <Switch name="write" on={this.state.newUser.write} onChange={this.onChange}/>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </Card>
                            </div>
                        </div>
                    </div>
                </Modal>
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
  
export default connect(mapStateToProps)(Users);