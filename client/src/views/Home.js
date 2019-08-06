import React from 'react';
import PropTypes from 'prop-types';
import io from "socket.io-client";

const socketUrl = "http://localhost:5000"

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
	  	socket: null,
	  	user: null      
    }
  }

	componentWillMount() {
		// this.initSocket()
	}  

	// initSocket = () => {
	// 	const socket = io(socketUrl)

	// 	socket.on('connect', () => {
	// 		console.log("Connected");
  //   })
    
  //   socket.emit('my other event', { id: 1, text: "Hello World" });
		
	// 	this.setState({socket})
	// }  

  render() {
    return (
      <div>test</div>
    )

  }
}

export default Home;