import React, { Component } from 'react'

class Welcome extends Component {
	state = {
		redirect: false,
		input: null
	}

	updateInput = event => {
		this.setState({
			input: event.target.value
		})
	}

	loginUser = event => {
		event.preventDefault()
		console.log('btn click')
		this.props.updateUser(this.state.input)
		this.props.history.push('/chat/general')
	}

	render() {
		console.log('render welcome')
		return (
			<div>
				Welcome
				<form onSubmit={event => this.loginUser(event)}>
					<input
						onChange={event => this.updateInput(event)}
						placeholder="Votre nom"
					/>
				</form>
			</div>
		)
	}
}

export default Welcome
