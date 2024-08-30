

document.getElementById('chat-close-btn').addEventListener('click', function() {
    document.getElementById('chat-box').style.display = 'none';
});

// Function to get the current time in Indian Standard Time (IST)
function updateTime() {
    var now = new Date();
    var utc = now.getTime() + (now.getTimezoneOffset() * 6000);
    var istTime = new Date(utc + (3600000*5.5));

    var hours = istTime.getHours();
    var minutes = istTime.getMinutes();
    var seconds = istTime.getSeconds();

    // Pad the minutes and seconds with leading zeros, if required
    minutes = (minutes < 10 ? "0" : "") + minutes;
    seconds = (seconds < 10 ? "0" : "") + seconds;

    // Choose either "AM" or "PM" as appropriate
    var amPm = (hours < 12) ? "AM" : "PM";

    // Convert the hours component to 12-hour format if needed
    hours = (hours > 12) ? hours - 12 : hours;

    // Convert an hours component of "0" to "12"
    hours = (hours === 0) ? 12 : hours;

    // Compose the string for display
    var currentTimeString = hours + ":" + minutes + ":" + seconds + " " + amPm;

    document.getElementById("time").innerText = "Current IST Time: " + currentTimeString;
}

// Call the updateTime function once to initialize the time display
updateTime();

// Update the time every second
setInterval(updateTime, 1000);

// Simple chatbot logic
document.getElementById('send-btn').addEventListener('click', function() {
    var userInput = document.getElementById('user-input').value;
    if (userInput.trim() !== "") {
        addChatMessage("You", userInput);
        getBotResponse(userInput);
        document.getElementById('user-input').value = "";
    }
});

document.getElementById('user-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        document.getElementById('send-btn').click();
    }
});

function addChatMessage(sender, message) {
    var chatContent = document.getElementById('chat-content');
    var messageElement = document.createElement('p');
    messageElement.innerHTML ='<strong>${sender}:</strong> ${message}';
    chatContent.appendChild(messageElement);
    chatContent.scrollTop = chatContent.scrollHeight;
}

function getBotResponse(userInput) {
    // Simple predefined responses
    var botResponse = "";
    if (userInput.toLowerCase().includes("hello")) {
        botResponse = "Hi there! How can I help you today?";
    } else if (userInput.toLowerCase().includes("hours")) {
        botResponse = "We are open from 11am to 10pm from Monday to Friday and 11am to 12am on weekends.";
    } else if (userInput.toLowerCase().includes("location")) {
        botResponse = "We are located at 500 Terry Francine Street, San Francisco, CA 94158.";
    } else {
        botResponse = "I'm not sure how to help with that. Can you please provide more details?";
    }
    setTimeout(function() {
        addChatMessage("Bot", botResponse);
    }, 1000);
}