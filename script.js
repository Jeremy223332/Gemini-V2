```javascript
const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");

const connectButton = document.getElementById("connectButton");
const connectionStatus = document.getElementById("connectionStatus");

let youtubeConnected = false;


// -----------------------------
// YouTube connection
// -----------------------------

function connectYouTube() {

    if (youtubeConnected) {
        connectionStatus.textContent = "YouTube is already connected";
        return;
    }

    connectButton.disabled = true;
    connectButton.textContent = "Connecting...";

    connectionStatus.textContent = "Connecting to YouTube...";

    // Simulate connection time
    setTimeout(() => {

        connectionStatus.textContent = "✓ YouTube connected";

        connectButton.textContent = "Connected";

        youtubeConnected = true;

        connectButton.style.background = "#2ecc71";
        connectButton.style.color = "white";

    }, 2500);
}


// Connect button
connectButton.addEventListener("click", connectYouTube);


// -----------------------------
// AI message system
// -----------------------------

function sendMessage() {

    const message = messageInput.value.trim();

    if (!message) {
        return;
    }

    addMessage("You", message);

    messageInput.value = "";

    // Small delay so it feels like the AI is thinking
    setTimeout(() => {

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


// -----------------------------
// Add messages to chat
// ---------------------------
```
