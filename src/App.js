import React, { Component } from 'react'
import Chat from './containers/Chat'

class App extends Component {
	state = {
		endpoint: 'http://localhost:3001'
	}

	render() {
		return (
			<div>
				<Chat endpoint={this.state.endpoint} />
			</div>
		)
	}
}

export default App
