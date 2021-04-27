<
    var username = `user_${getRandomNumber()}`
        var apiKey = 'oCdCMcMPQpbvNjUIzqtvF1d2X2okWpDQj4AwARJuAgtjhzKxVEjQU6IdCjwm';
        var channelId = 1;
        var piesocket = new WebSocket(`wss://demo.websocket.me/v3/${channelId}?api_key=${apiKey}&notify_self`);

        var chatLog = document.getElementById('chatLoggg');
        var chatForm = document.getElementById('chatForm');
        chatForm.addEventListener("submit", sendMessage);

        piesocket.onopen = function () {
        console.log(`Websocket connected`);
            piesocket.send(JSON.stringify({
        event: 'new_joining',
                sender: username,
            }));
        }
        piesocket.onmessage = function (message) {
            var payload = JSON.parse(message.data);
            console.log(payload);

            if (payload.sender == username) {
        payload.sender = "You";

            }

            if (payload.event == "new_message") {

        // username1.insertAdjacentHTML('afterend', `<div> ${payload.sender} <div>`);
        chatLoggg.insertAdjacentHTML('afterend', `<div> ${payload.sender}: ${payload.text} <div>`);

                //Handle new message
                //


            } else if (payload.event == 'new_joining') {

        //Handle new joining
        chatLoggg.insertAdjacentHTML('afterend', `<div> ${payload.sender} joined the chat<div>`);

            }
        }

        function getRandomNumber() {
            return Math.floor(Math.random() * 1000);
        }

        function sendMessage(e) {
        e.preventDefault();

            var message = document.getElementById('chatMessage').value;

            piesocket.send(JSON.stringify({
        event: 'new_message',
                sender: username,
                text: message
            }));
        }
    