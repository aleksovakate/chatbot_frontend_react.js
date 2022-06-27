import React, {useState} from "react";

import BackgroundVideo from "./chatbot_resources/background-video.mp4";
import Paimon from "./chatbot_resources/paimon.webp"
import BackgroundImage from './chatbot_resources/background.jpeg'
import LogoGenshin from './chatbot_resources/genshin-board.png'
import UserIcon from './chatbot_resources/user-icon.png'
import BotIcon from './chatbot_resources/chatbot-icon-v2.png'


function App() {
    const [showChatUi, setShowChatUi] = useState(false)
    const [messages, setMessages] = useState([
        {
            "sender": "bot",
            "body": "hello there"
        },
        {
            "sender": "kate",
            "body": "test"
        },
        {
            "sender": "bot",
            "body": "test2"
        },
        {
            "sender": "kate",
            "body": "test2"
        },
        {
            "sender": "bot",
            "body": "test2"
        },
        {
            "sender": "kate",
            "body": "test2"
        },
        {
            "sender": "bot",
            "body": "test2 jlkasdljfjlksadfjlasdflöjld ösla ljjlösdflkjdsfa l sfd alkösdf lkj dsf al sfdöl dsfaöl sfadölk sdfl dsfaöl dsfl dsaflkö sadld sald sföld sf"
        },
        {
            "sender": "kate",
            "body": "test2"
        },
    ])

    if (!showChatUi) {
        return (
            <div className="wrapper">
                <video src={BackgroundVideo} autoPlay loop muted/>
                <div className="content-landing">
                    <div className="centerPaimon">
                        <img onClick={() => setShowChatUi(true)} src={Paimon} alt="Paimon" className="paimon"/>
                        <h3>CLICK ON PAIMON TO START</h3>
                    </div>
                </div>
                <div className="disclaimer">
                    THIS IS A FAN-MADE SITE FOR A SCHOOL PROJECT. NO INTENDED CLAIMS TO ANY RIGHTS BELONGING TO THE
                    ORIGINAL ARTIST OF THE ARTWORKS.
                </div>
            </div>

        );
    } else {
        return (
            <div className="wrapper">
                <img className="backgroundImage" src={BackgroundImage} alt={"background"}/>
                <div className="content-chat">
                    <header>
                        <img src={LogoGenshin} alt="header"/>
                    </header>
                    <div className="chat-wrapper">
                        <ul className="chat-feed">
                            {messages.map(message => {
                                if (message.sender === 'bot') {
                                    return (
                                        <li key={message.id} className="msg-bot">
                                            <img className="chat-username" alt="user-icon" src={BotIcon}/>
                                            <div className="chat-msg">
                                                Paimon:<br/>
                                                <hr/>
                                                {message.body}
                                            </div>
                                        </li>
                                    )
                                } else {
                                    return (
                                        <li key={message.id} className="msg-user">
                                            <img className="chat-username" alt="user-icon" src={UserIcon}/>
                                            <div className="chat-msg">
                                                Traveler:<br/>
                                                <hr/>
                                                {message.body}
                                            </div>
                                        </li>
                                    )
                                }
                            })}
                        </ul>
                    </div>
                    <footer>
                        <input type="text" placeholder="Write a message..." className="input-msg"/>
                        <button className="send-msg">Send</button>
                    </footer>
                </div>
            </div>
        );
    }
}

export default App;
