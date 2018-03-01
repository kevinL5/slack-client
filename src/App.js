import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Welcome from './containers/Welcome'
import Chat from './containers/Chat'

class App extends Component {
	state = {
		user: null
	}

	updateUser = user => {
		console.log('updateUser', user)
		this.setState({ user })
	}

	render() {
		return (
			<Router>
				<div>
					<Route
						exact
						path="/"
						render={props => (
							<Welcome {...props} updateUser={this.updateUser} />
						)}
					/>
					<Route
						path="/chat/:room"
						render={props => <Chat {...props} user={this.state.user} />}
					/>
				</div>
			</Router>
		)
	}
}

export default App
