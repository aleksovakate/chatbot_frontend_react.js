/*
 * Import packages
 */
const express = require('express');
let response_data = require('./response_data.json');
const app = express();
const http = require('http');
const server = http.createServer(app);
var axios = require('axios');

const io = require('socket.io')(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

server.listen(5000, function () {
    console.log("server started at port 5000");
});

app.use(express.static('public'));

async function getPrediction (message) {
    var data = '{"kind":"Conversation","analysisInput":{"conversationItem":{"id":"1","text":"'+message+'","modality":"text","language":"en",' +
        '"participantId":"1"}},"parameters":{"projectName":"chatbotobiwanproject","verbose":true,"deploymentName":"obiwandeployment",' +
        '"stringIndexType":"TextElement_V8"}}';
    var config = {
        method: 'post',
        url: 'https://chatbotlanguageresource.cognitiveservices.azure.com/language/:analyze-conversations?api-version=2022-05-01',
        headers: {
            'Ocp-Apim-Subscription-Key': '511e1549e8164d47ab731fc64e900162',
            'Apim-Request-Id': '4ffcac1c-b2fc-48ba-bd6d-b69d9942995a',
            'Content-Type': 'application/json'
        },
        data: data
    };

    response = await axios(config).then(function (response) {
        return response.data
    })
        .catch(function (error) {
            console.log(error);
        });
    return response
}

io.on("connection", (socket) => {
    console.log(`connect ${socket.id}`);

    socket.on("disconnect", (reason) => {
        console.log(`disconnect ${socket.id} due to ${reason}`);
    });

    socket.on("question", (data) => {
        //console.log("recieved question: "+data)
        let lastmsg = data[0].body
        const remove_these = /[!?.,]/g;
        lastmsg = lastmsg.replace(remove_these,'').toLowerCase()
        let answer = String()
        console.log(lastmsg)
        getPrediction(lastmsg).then( entities => {
            entities = entities["result"]["prediction"]["entities"]
            let character = response_data["character"]
            let information = ""
            for (entity in entities){
                if (entities[entity]["category"] === "character"){
                    if (entities[entity]["text"][entities[entity]["text"].length -1] === "s"){
                        character = entities[entity]["text"].substr(0,entities[entity]["text"].length -1)
                    }
                    else{
                        character = entities[entity]["text"]
                    }

                    response_data["character"] = character
                }
                else if (entities[entity]["category"] === "information"){
                    if (entities[entity]["text"][entities[entity]["text"].length -1] === "s"){
                        information = entities[entity]["text"].substr(0,entities[entity]["text"].length -1)
                    }
                    else{
                        information = entities[entity]["text"]
                    }
                }
            }
            for (key in response_data["translator"]){
                if (information.includes(key)){
                    infomation.replace(key,response_data["translator"][key]);
                }
            }
            console.log(character+", "+information)
            if (character+", "+information in response_data){
                answer = response_data[character+", "+information]
            }
            else if (information in response_data){
                answer = response_data[information]
            }
            if (!answer){
                answer = response_data["fallback"];
                response_data["resetcounter"] = response_data["resetcounter"] +1 ;
                if (response_data["resetcounter"] >= response_data["resetlimit"]){
                    answer = response_data["restart"];
                }
            }
            else if (!(answer in response_data)){
                answer = answer.concat(" Was that helpful?")
            }
            if (answer === response_data["restart"]){
                response_data["resetcounter"] = 0;
            }
            socket.emit("answer", answer);
    })});
});
