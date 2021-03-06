import React, { Component } from 'react';
import { VERIFY_USER } from '../Events'

export default class LoginForm extends Component {
	constructor(props) {
	  super(props);
		
	  this.state = {
	  	nickname:localStorage.getItem('nickname'),
	  	error:""
	  };
	}

	login() {
		this.props.auth.login();
	  }

	setUser = ({user, isUser})=>{

		if(isUser){
			this.setError("User name taken")
		}else{
			this.setError("")
			this.props.setUser(user)
		}
	}
	verifyUserIsNotLoggedIn = () => {
		const { socket } = this.props
		const { nickname } = this.state		
		socket.emit(VERIFY_USER, nickname, this.setUser)
	}
	
	handleSubmit = (e)=>{
		e.preventDefault()
		this.verifyUserIsNotLoggedIn()
	}

	handleChange = (e)=>{
		this.setState({nickname:e.target.value})
	}

	setError = (error)=>{
		this.setState({error})
	}

	render() {	
		const { nickname, error } = this.state
		
		return (
			<div className="login">
				<form onSubmit={this.handleSubmit} className="login-form" >

					<label htmlFor="nickname">
						<h2>What's your handle?</h2>
					</label>
					<input
						ref={(input)=>{ this.textInput = input }} 
						type="text"
						id="nickname"
						value={nickname}
						onChange={this.handleChange}
						placeholder={'...'}
						/>
						<div className="error">{error ? error:null}</div>

				</form>
				
			</div>
		);
	}
}
