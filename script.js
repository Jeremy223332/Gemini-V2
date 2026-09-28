const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");

const services = {
    youtube: {
        name: "YouTube",
        status: "youtubeStatus",
        button: "youtubeButton"
    },

    drive: {
        name: "Google Drive",
        status: "driveStatus",
        button: "driveButton"
    }
};


// Connect a service
function connectService(serviceId) {

    const service = services[serviceId];

    if (!service) {
        return;
    }

    const status = document.getElementById(service.status);
    const button = document.getElementById(service.button);

    button.disabled = true;
    button.textContent = "Connecting...";
    status.textContent = "Connecting to " + service.name + "...";

    setTimeout(function() {

        status.textContent = "✓ " + service.name + " connected";

        button.textContent = "Connected";

        button.disabled = true;

    }, 2500);
}


// Add chat message
function addMessage(sender, text) {

    const chat = document.querySelector(".chat");

    const message = document.createElement("div");

    message.className = "message";

    message.innerHTML =
        '<div class="message-sender">' +
        sender +
        '</div>' +

        '<div class="message-text">' +
        text +
        '</div>';

    chat.appendChild(message);

    message.scrollIntoView({
        behavior: "smooth"
    });
}


// Send message
function sendMessage() {

    const message = messageInput.value.trim();

    if (!message) {
        return;
    }

    addMessage("You", message);

    messageInput.value = "";

    setTimeout(function() {

        const text = message.toLowerCase();

        if (
            text.includes("youtube") &&
            text.includes("connect")
        ) {

            addMessage(
                "My AI",
                "Sure! I'll connect to YouTube for you."
            );

            connectService("youtube");

        }

        else if (
            text.includes("drive") &&
            text.includes("connect")
        ) {

            addMessage(
                "My AI",
                "Sure! I'll connect to Google Drive for you."
            );

            connectService("drive");

        }

        else if (text.includes("hello")) {

            addMessage(
                "My AI",
                "Hello! 👋 What would you like to connect?"
            );

        }

        else {

            addMessage(
                "My AI",
                "I'm still being built! 🤖 Try asking me to connect to YouTube or Google Drive."
            );

        }

    }, 700);
}


// Send button
sendButton.addEventListener("click", sendMessage);


// Enter key
messageInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter" && !event.shiftKey) {

        event.preventDefault();

        sendMessage();

    }

});
