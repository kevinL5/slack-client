import React, { Component } from 'react'
import socketIOClient from 'socket.io-client'

class Chat extends Component {
	state = {
		input: null,
		messages: null
	}

	componentWillMount() {
		this.socket = socketIOClient('http://localhost:3001')
	}

	componentDidMount() {
		if (!this.props.user) return this.props.history.push('/')

		this.socket.emit('request messages', this.props.match.params.room)

		this.socket.on('all messages', messages => {
			console.log('MESSAGES', messages)
			this.setState({ messages })
		})
		this.socket.on('update message', message => {
			console.log('Nouveau message reçu', message)
			this.updateMessages(message)
		})
	}

	updateMessages = message => {
		this.setState({
			messages: [...this.state.messages, message]
		})
	}

	updateInput = event => {
		this.setState({
			input: event.target.value
		})
	}

	sendMessage = event => {
		event.preventDefault()
		console.log('Nouveau message envoyé', this.state.input)
		this.socket.emit('new message', {
			user: this.props.user,
			text: this.state.input
		})
	}

	render() {
		console.log('render chat')
		const { messages } = this.state
		return (
			<div>
				Chat slack
				{messages &&
					messages.map((message, i) => {
						return <div key={i}>{`${message.user.name} : ${message.text}`}</div>
					})}
				<form onSubmit={event => this.sendMessage(event)}>
					<input onChange={this.updateInput} />
				</form>
			</div>
		)
	}
}

export default Chat
