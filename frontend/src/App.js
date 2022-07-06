import React, {useEffect, useRef, useState} from "react";
import Landing from "./components/Landing";
import Interface from './components/Chatbotinterface'

import {io} from "socket.io-client";
const socket = io("ws://localhost:5000");

let response_data = require('./chatbot_resources/response_data.json');


function App() {
    function whenTyping(input){
        setTextToSubmit(input.target.value)
    }

    function WhenClicked(){
        if(textToSubmit !== ""){
            SetMessages(messages.concat([{"sender": "user", "body": textToSubmit}]))
            setTextToSubmit("")
        }
    }
    
    const [messages, SetMessages] = useState([{
        "sender": "bot",
        "body": response_data["restart"]
    }]);
    const fallback = response_data["fallback"]
    if (messages.length === 0){
        SetMessages([{
            "sender": "bot",
            "body": response_data["restart"]
        }]);
    }
    const [textToSubmit, setTextToSubmit] = useState("")
    const [showChatUi, setShowChatUi] = useState(false)
    const bottomOfMessages = useRef(null)

    useEffect(() => {
        let lastMessage = [messages[messages.length -1]]
        let lastBotMessage = {}
        console.log("inside")
        for (const m in messages){
            if (messages[m].sender === "bot" && messages[m].body !== fallback){
                lastBotMessage = messages[m]
            }
        }

        console.log(JSON.parse(JSON.stringify(lastMessage[0])));
        if (lastMessage[0].sender !== "bot") {
            socket.emit('question', lastMessage.concat(lastBotMessage));
        }
        socket.on("answer", (data) => {SetMessages(messages.concat([{"sender": "bot", "body": data}]))});
        if (bottomOfMessages.current !== null ){
            bottomOfMessages.current.scrollIntoView({behavior:"smooth"});
        }

    }, [messages]);


    if (!showChatUi) {
        return (
            <Landing showFunc={setShowChatUi}></Landing>
        );
    } else {
        return (
           <Interface msgs={messages} tts={textToSubmit} changeFunc={whenTyping} bottomRef={bottomOfMessages} clickFunc={WhenClicked}></Interface>
        );
    }
}

export default App;
