import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Button, Card, Modal, Input, Switch, Dropdown, List, ListItem, Select } from 'turtle-ui';
import Loader from '../../components/Loader';
import Dismiss from '../../components/DismissModalButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import faUser from '@fortawesome/fontawesome-free-solid/faUserCircle';
import faEllipsis from '@fortawesome/fontawesome-free-solid/faEllipsisV';
import Empty from '../../images/empty.svg';
import Machinable from '../../client';
import moment from 'moment';

const roleOptions = [
    {value: "user", text: "User"},
    {value: "admin", text: "Administrator"}
];

class Users extends Component {

	constructor(props) {
        super(props);
		this.state = {
            loading: true,
            users: [],
            showModal: false,
            showDeleteModal: false,
            showUpdateModal: false,
            slug: props.slug,
            newUser: {
                username: "",
                password: "",
                read: true,
                write: false
            },
            updateUser: {},
            errors: [],
            deleteUser: {username:""},
            copied: {}
		}
    }
    
    userReset = () => {
        return {
            username: "",
            password: "",
            read: true,
            write: false,
            role: "user"
        };
    }

    usersError = (response) => {
        console.log(response);
        var errors = [];
        if(response.data && response.data.error) {
            errors.push(response.data.error);
        } else {
            errors.push("An unknown error occured trying to delete this user. Please try again later.")
            errors.push(response.status + " " + response.statusText);
        }
        this.setState({errors: errors, loading: false});
    }

    usersSuccess = (response) => {
        this.setState({
            users: response.data.items, 
            loading: false, 
            showModal: false, 
            showDeleteModal: false, 
            showUpdateModal: false, 
            newUser: this.userReset()
        });
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
		this.setState({showModal: false, showDeleteModal: false, showUpdateModal: false});
	}

	openModal = () => {
		var html = document.getElementsByTagName('html')[0];
        html.style.cssText = "--root-overflow: hidden";
		this.setState({showModal: true});
    }

    openDeleteModal = (user) => {
		var html = document.getElementsByTagName('html')[0];
        html.style.cssText = "--root-overflow: hidden";
		this.setState({showDeleteModal: true, deleteUser: user});
    }
    
    openUpdateModal = (user) => {
		var html = document.getElementsByTagName('html')[0];
        html.style.cssText = "--root-overflow: hidden";
		this.setState({showUpdateModal: true, updateUser: {read: user.read, write: user.write, role: user.role, id: user.id, username: user.username}});
	}

	deleteUser = () => {
		this.setState({loading: true});
		Machinable.users(this.state.slug).delete(this.state.deleteUser.id, this.getUsers, this.usersError);
    }
    
    updateUser = () => {
		this.setState({loading: true});
		Machinable.users(this.state.slug).update(this.state.updateUser, this.getUsers, this.usersError);
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
          loading: errors.length === 0
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
        
    onUpdateChange = (event) => {
        const target = event.target;
	    const value = target.type === 'checkbox' ? target.checked : target.value;
	    const name = target.name;
        var uu = this.state.updateUser;
        uu[name] = value;
        
	    this.setState({
	    	updateUser: uu
	    });
    }

	revertCopyText = (id) => {
		setTimeout(function(){
            var copied = this.state.copied;
			delete copied[id];
			this.setState({
				copied: copied
			});
		}.bind(this), 3000);
	}

	copyText = (id) => {
		var copyEl = document.getElementById(id);
		copyEl.select();
		document.execCommand("Copy");

		var copied = this.state.copied;
		copied[id] = "Copied";
		this.setState({
			copied: copied
		}, () => this.revertCopyText(id));
	}

    emptyState = () => {
        return (
            <div className="grid grid-8">
                <div className="col-2-8 flex-col">
                    <h2 className="text-center">There aren't any Users for this Project</h2>
                    <img src={Empty} alt="" className="empty-state-sm"/>
                    <h3 className="text-center">Create users with read/write access to your project's API Resources and Collections</h3>
                    <div className="align-center">
                        <Button classes="accent" onClick={this.openModal}>Create A User</Button>
					</div>
                </div>
            </div>
        )
    }

    renderTable = () => {
        var tableValues = this.state.users.map(function(user, idx){
            var accessList = [];
            var copyId = "userid-"+user.id;
            if(user.read) {
                accessList.push("read");
            }
            if(user.write) {
                accessList.push("write");
            }
            return [
                <div className="vertical-align">
                    <FontAwesomeIcon className="margin-right text-more-muted" style={{"fontSize": "24px"}} icon={faUser} />
                    <div>
                        <h4 className="text-400 no-margin">{user.username}</h4>
                        <div className="text-muted text-small margin-top-less">{moment(user.created).fromNow()}</div>
                    </div>
                </div>,
                <div>{user.role}</div>,
                <div>{accessList.join(" / ")}</div>,
                <div className="align-right">
                    <span className="vertical-align">
                        {user.id} <Button classes="btn-small margin-left" onClick={() => this.copyText(copyId)}>{this.state.copied[copyId] ? "Copied" : "Copy"}</Button>
                        <textarea cols="1000" className="copy-text"  id={copyId} value={user.id} readOnly/>
                    </span>
                </div>,
                <div className=" align-right">
                    <Dropdown 
                        showIcon={false}
                        width={150}
                        buttonText={<FontAwesomeIcon className="text-muted" icon={faEllipsis} />}
                        buttonClasses="text plain vertical-align"
                        classes="align-items-right">
                        <div className="grid grid-1">
                            <List>
                                <ListItem onClick={() => this.openUpdateModal(user)} title={<div className="text-center">Edit Access</div>}/>
                                <hr className="no-margin no-padding"/>
                                <ListItem onClick={() => this.openDeleteModal(user)} title={<div className="text-center text-danger text-400">Delete</div>}/>
                            </List>
                        </div>
                    </Dropdown>
                </div>
            ]
        }, this);
        return (
            <React.Fragment>
                <Table
                    classes="m-table"
                    headers={["Username", "Role", "Access", <div className="align-center m-th">ID</div>, <div className="align-right m-th">Options</div>]}
                    values={tableValues}
                />
                <Button classes="accent page-btn" onClick={this.openModal}>Add User</Button>
            </React.Fragment>
        )
    }

	render() {
        var render = this.state.users.length > 0 ? this.renderTable() : this.emptyState();

		return (
			<div>
                <Loader loading={this.state.loading} />
                {!this.state.loading && render}

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
                                    <Dismiss onClick={this.closeModal} />

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
                                        <Select label="Role & Access" placeholder="select role" name="role" value={this.state.newUser.role} options={roleOptions} onChange={this.onChange}/>
                                        <div className="text-small text-muted text-center">
                                            {this.state.newUser.role === "user" && <span><code>Users</code> will only have access to objects that they have created, depending on the collection/resource policy.</span>}
                                            {this.state.newUser.role === "admin" && <span><code>Administrators</code> will have access to all created objects.</span>}
                                        </div>
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

                <Modal 
					close={this.closeModal}
					isOpen={this.state.showUpdateModal}>
                    <div className="align-center grid grid-3">
                        <div className="col-3-2">
                            <div className=" grid grid-1">
                                <Card
                                    classes="footer-plain no-border"
                                    footer={
                                        <div className="grid grid-2">
                                            <div className="col-2 col-right">
                                                <Button classes="plain text" onClick={this.closeModal}>Cancel</Button>	
                                                <Button classes="brand margin-left" type="submit" loading={this.state.loading} onClick={this.updateUser}>Update</Button>	
                                            </div>
                                        </div>
                                    }>
                                    <Dismiss onClick={this.closeModal} />

                                    <h2 className="text-center">Update Project User</h2>

                                    { this.state.errors.length > 0 &&
                                        <div className="text-danger text-center margin-bottom-more">
                                            {this.state.errors.map(function(error){
                                                return (<div className="text-400 padding-bottom">{error}</div>)
                                            })}
                                        </div>
                                    }

                                    <div className="grid grid-1">
                                        <strong>Username</strong>
                                        <div className="background-content padding-bit-less vertical-align">
                                            <span>{this.state.updateUser.username}</span>
                                        </div>
                                        <Select label="Role & Access" placeholder="select role" name="role" value={this.state.updateUser.role} options={roleOptions} onChange={this.onUpdateChange}/>
                                        <div className="text-small text-muted text-center">
                                            {this.state.updateUser.role === "user" && <span><code>Users</code> will only have access to objects that they have created, depending on the collection/resource policy.</span>}
                                            {this.state.updateUser.role === "admin" && <span><code>Administrators</code> will have access to all created objects.</span>}
                                        </div>
                                        <div className="grid grid-2">
                                            <div className="align-center vertical-align">
                                                <strong className="margin-right">Read</strong>
                                                <Switch name="read" on={this.state.updateUser.read} onChange={this.onUpdateChange}/>
                                            </div>
                                            <div className="align-center vertical-align">
                                                <strong className="margin-right">Write</strong>
                                                <Switch name="write" on={this.state.updateUser.write} onChange={this.onUpdateChange}/>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </Card>
                            </div>
                        </div>
                    </div>
                </Modal>

                <Modal 
					close={this.closeModal}
					isOpen={this.state.showDeleteModal}>
                    <div className="align-center grid grid-3">
                        <div className="col-3-2">
                            <div className=" grid grid-1">
                                <Card
                                    classes="footer-plain no-border"
                                    footer={
                                        <div className="grid grid-2">
                                            <div className="col-2 col-right">
                                                <Button classes="plain text" onClick={this.closeModal}>Cancel</Button>	
                                                <Button classes="danger margin-left" type="submit" loading={this.state.loading} onClick={this.deleteUser}>Yes, I'm sure</Button>	
                                            </div>
                                        </div>
                                    }>
                                    <Dismiss onClick={this.closeModal} />

                                    <h2 className="text-center">Delete Project User</h2>
                                    { this.state.errors.length > 0 &&
                                        <div className="text-danger text-center margin-bottom-more">
                                            {this.state.errors.map(function(error){
                                                return (<div className="text-400 padding-bottom">{error}</div>)
                                            })}
                                        </div>
                                    }
									<h3 className="text-center">Are you sure you want to delete <strong>{this.state.deleteUser.username}</strong>?</h3>
									<p className="text-center">
										This will delete the user as well as any active sessions. This cannot be undone.
									</p>
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