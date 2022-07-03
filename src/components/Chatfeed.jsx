import React from 'react'
import UserIcon from '../chatbot_resources/user-icon.png'
import BotIcon from '../chatbot_resources/chatbot-icon-v2.png'
import Chatbubble from "./Chatbubble";

class Chatfeed extends React.Component {
    render() {
        return (
            <ul className="chat-feed">
                {/* eslint-disable-next-line array-callback-return */}
                {this.props.msgs.map((message, i) => {
                    if (message.sender === 'bot') {
                        return <Chatbubble id={i} cls="msg-bot" msg={message} icon={BotIcon} who="Paimon"/>
                    } else {
                        return <Chatbubble id={i} cls="msg-user" msg={message} icon={UserIcon} who="Traveler"/>
                    }
                })}
            </ul>
        );
    }
}

export default Chatfeed;
