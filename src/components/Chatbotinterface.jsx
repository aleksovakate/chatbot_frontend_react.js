import React from 'react'
import BackgroundImage from '../chatbot_resources/background.jpeg'
import LogoGenshin from '../chatbot_resources/genshin-board.png'
import Chatfeed from './Chatfeed'

class Chatbotinterface extends React.Component {
    render() {
        return (
            <div className="wrapper">
                <img className="backgroundImage" src={BackgroundImage} alt={"background"}/>
                <div className="content-chat">
                    <header>
                        <img src={LogoGenshin} alt="header"/>
                    </header>
                    <div className="chat-wrapper">
                        <Chatfeed msgs={this.props.msgs}></Chatfeed>
                    </div>
                    <footer>
                        <input type="text" placeholder="Write a message..." className="input-msg"/>
                        <button className="send-msg">Send</button>
                    </footer>
                </div>
            </div>
        )
    }
}
export default Chatbotinterface;
