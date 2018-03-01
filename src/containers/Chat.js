import React, { Component } from 'react'
import socketIOClient from 'socket.io-client'

let socket = null

class Chat extends Component {
	state = {
		input: null,
		messages: null
	}

	componentWillMount() {
		socket = socketIOClient(this.props.endpoint)
	}

	componentDidMount() {
		socket.on('all messages', messages => {
			this.setState({ messages })
		})
		socket.on('update message', message => {
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
		socket.emit('new message', this.state.input)
	}

	render() {
		console.log('render chat')
		const { messages } = this.state

		return (
			<div>
				Chat slack
				{messages &&
					messages.map((message, i) => {
						return <div key={i}>{message}</div>
					})}
				<form onSubmit={event => this.sendMessage(event)}>
					<input onChange={this.updateInput} />
				</form>
			</div>
		)
	}
}

export default Chat
