const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");
const connectButton = document.getElementById("connectButton");
const connectionStatus = document.getElementById("connectionStatus");

let youtubeConnected = false;

function connectYouTube() {
    if (youtubeConnected) {
        connectionStatus.textContent = "YouTube is already connected";
        return;
    }

    connectButton.disabled = true;
    connectButton.textContent = "Connecting...";
    connectionStatus.textContent = "Connecting to YouTube...";

    setTimeout(function() {
        connectionStatus.textContent = "✓ YouTube connected";
        connectButton.textContent = "Connected";
        youtubeConnected = true;
    }, 2500);
}

connectButton.addEventListener("click", connectYouTube);

function addMessage(sender, text) {
    const chat = document.querySelector(".chat");

    const message = document.createElement("div");
    message.className = "message";

    message.innerHTML =
        '<div class="message-sender">' + sender + '</div>' +
        '<div class="message-text">' + text + '</div>';

    chat.appendChild(message);
    message.scrollIntoView({ behavior: "smooth" });
}

function sendMessage() {
    const message = messageInput.value.trim();

    if (!message) {
        return;
    }

    addMessage("You", message);
    messageInput.value = "";

    setTimeout(function() {
        const lowerMessage = message.toLowerCase();

        if (
            lowerMessage.includes("connect") &&
            lowerMessage.includes("youtube")
        ) {
            addMessage(
                "My AI",
                "Sure! I'll connect to YouTube for you."
            );

            connectYouTube();

        } else if (lowerMessage.includes("hello")) {
            addMessage(
                "My AI",
                "Hello! 👋 What would you like to do?"
            );

        } else {
            addMessage(
                "My AI",
                "I'm still being built! 🤖 Try asking me to connect to YouTube."
            );
        }
    }, 700);
}

sendButton.addEventListener("click", sendMessage);

messageInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
});
