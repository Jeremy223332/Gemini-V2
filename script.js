const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");

// All supported services
const services = {
    youtube: {
        name: "YouTube",
        statusId: "youtubeStatus",
        buttonId: "youtubeButton",
        logo: "▶"
    },

    drive: {
        name: "Google Drive",
        statusId: "driveStatus",
        buttonId: "driveButton",
        logo: "◆"
    },

    gmail: {
        name: "Gmail",
        statusId: "gmailStatus",
        buttonId: "gmailButton",
        logo: "✉"
    },

    calendar: {
        name: "Google Calendar",
        statusId: "calendarStatus",
        buttonId: "calendarButton",
        logo: "📅"
    },

    github: {
        name: "GitHub",
        statusId: "githubStatus",
        buttonId: "githubButton",
        logo: "🐙"
    },

    discord: {
        name: "Discord",
        statusId: "discordStatus",
        buttonId: "discordButton",
        logo: "💬"
    },

    spotify: {
        name: "Spotify",
        statusId: "spotifyStatus",
        buttonId: "spotifyButton",
        logo: "🎵"
    }
};


// Keep track of connections
const connectedServices = {};


// --------------------------------
// Connect a service
// --------------------------------

function connectService(serviceId) {

    const service = services[serviceId];

    if (!service) {
        console.error("Unknown service:", serviceId);
        return;
    }

    const status = document.getElementById(service.statusId);
    const button = document.getElementById(service.buttonId);

    if (!status || !button) {
        console.warn(
            "UI elements missing for:",
            service.name
        );
        return;
    }


    // Already connected
    if (connectedServices[serviceId]) {

        status.textContent =
            "✓ " + service.name + " connected";

        button.textContent = "Connected";

        return;
    }


    // Connecting
    button.disabled = true;

    button.textContent = "Connecting...";

    status.textContent =
        "Connecting to " +
        service.name +
        "...";


    // Simulated connection
    setTimeout(function () {

        connectedServices[serviceId] = true;

        status.textContent =
            "✓ " +
            service.name +
            " connected";

        button.textContent = "Connected";

        console.log(
            service.name +
            " connected"
        );

    }, 2500);
}


// --------------------------------
// Find service from user message
// --------------------------------

function findService(message) {

    const text = message.toLowerCase();

    if (text.includes("youtube")) {
        return "youtube";
    }

    if (
        text.includes("google drive") ||
        text.includes("drive")
    ) {
        return "drive";
    }

    if (text.includes("gmail")) {
        return "gmail";
    }

    if (
        text.includes("google calendar") ||
        text.includes("calendar")
    ) {
        return "calendar";
    }

    if (text.includes("github")) {
        return "github";
    }

    if (text.includes("discord")) {
        return "discord";
    }

    if (text.includes("spotify")) {
        return "spotify";
    }

    return null;
}


// --------------------------------
// Add chat message
// --------------------------------

function addMessage(sender, text) {

    const chat = document.querySelector(".chat");

    if (!chat) {
        return;
    }

    const message = document.createElement("div");

    message.className = "message";

    message.innerHTML =
        '<div class="message-sender">' +
        sender +
        "</div>" +

        '<div class="message-text">' +
        text +
        "</div>";

    chat.appendChild(message);

    message.scrollIntoView({
        behavior: "smooth"
    });
}


// --------------------------------
// Send message
// --------------------------------

function sendMessage() {

    const message = messageInput.value.trim();

    if (!message) {
        return;
    }


    // Show user's message
    addMessage(
        "You",
        message
    );

    messageInput.value = "";


    // AI response
    setTimeout(function () {

        const text = message.toLowerCase();

        const serviceId =
            findService(text);


        // Connection command
        if (
            serviceId &&
            (
                text.includes("connect") ||
                text.includes("link") ||
                text.includes("add")
            )
        ) {

            const service =
                services[serviceId];

            addMessage(
                "My AI",
                "Sure! I'll connect to " +
                service.name +
                " for you."
            );

            connectService(serviceId);

            return;
        }


        // Hello
        if (
            text === "hello" ||
            text.includes("hello ") ||
            text.includes("hi")
        ) {

            addMessage(
                "My AI",
                "Hello! 👋 What would you like to connect?"
            );

            return;
        }


        // Unknown command
        addMessage(
            "My AI",
            "I'm still being built! 🤖 You can ask me to connect to YouTube, Google Drive, Gmail, Calendar, GitHub, Discord, or Spotify."
        );

    }, 700);
}


// --------------------------------
// Send button
// --------------------------------

if (sendButton) {

    sendButton.addEventListener(
        "click",
        sendMessage
    );
}


// --------------------------------
// Enter key
// --------------------------------

if (messageInput) {

    messageInput.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Enter" &&
                !event.shiftKey
            ) {

                event.preventDefault();

                sendMessage();
            }
        }
    );
}
