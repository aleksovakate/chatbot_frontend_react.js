import React, {useState} from "react";
import Landing from "./components/Landing";
import Interface from './components/Chatbotinterface'


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
            <Landing showFunc={setShowChatUi}></Landing>
        );
    } else {
        return (
           <Interface msgs={messages}></Interface>
        );
    }
}

export default App;
