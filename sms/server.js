const express = require('express');
const http = require('http');
const cors = require('cors');
const axios = require('axios');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

const io = new Server(server, {
  cors: { origin: "*" }
});

const sessions = {};
const outgoingQueue = [];

// Hospital Backend (Port 3000)
const HOSPITAL_API = "http://localhost:3000/api/tokens";


// ===== WebSocket =====
io.on('connection', () => {
  console.log("🌐 Browser connected");
});


// ===== Incoming SMS From Android =====
app.post('/api/device/incoming', async (req, res) => {
  const { phone_number, message } = req.body;

  console.log("📩 Incoming:", phone_number, message);

  io.emit("newSMS", { phone_number, message });

  await handleConversation(phone_number, message);

  res.json({ success: true });
});


// ===== Conversation Engine =====
async function handleConversation(phone, message) {

  const text = message.trim().toLowerCase();

  if (!sessions[phone]) {
    sessions[phone] = { step: 0 };
  }

  const session = sessions[phone];

  switch (session.step) {

    case 0:
      if (text === "hi") {
        session.step = 1;
        sendSMS(phone,
          "Welcome to CityCare Hospital.\nWould you like to book a token?\nReply YES or NO"
        );
      }
      break;

    case 1:
      if (text === "yes") {
        session.step = 2;
        sendSMS(phone, "Please enter your NAME:");
      } else {
        delete sessions[phone];
        sendSMS(phone, "Thank you. Have a good day!");
      }
      break;

    case 2:
      session.name = message;
      session.step = 3;
      sendSMS(phone, "Enter your AGE:");
      break;

    case 3:
      session.age = message;
      session.step = 4;
      sendSMS(phone, "Enter your PROBLEM:");
      break;

    case 4:
      session.problem = message;

      try {

        const response = await axios.post(HOSPITAL_API, {
          phone_number: phone,
          priority: 2,
          name: session.name,
          age: parseInt(session.age),
          problem: session.problem,
          source: "sms"
        });

        const tokenData = response.data.data;

        sendSMS(
          phone,
          `Token Booked Successfully!\nToken No: ${tokenData.token_number}\nEstimated Wait: ${formatETA(tokenData.estimated_time)}`
        );

        io.emit("newToken", tokenData);

      } catch (error) {
        console.error("❌ Hospital API Error:", error.message);

        sendSMS(
          phone,
          "System temporarily unavailable. Please try again later."
        );
      }

      delete sessions[phone];
      break;
  }
}


// ===== Format ETA (Better Display) =====
function formatETA(estimatedTime) {
  if (!estimatedTime) return "Unknown";

  const eta = new Date(estimatedTime);
  const now = new Date();
  const diffMinutes = Math.max(
    Math.ceil((eta - now) / 60000),
    0
  );

  return `${diffMinutes} minutes`;
}


// ===== Queue SMS To Android =====
function sendSMS(phone, message) {

  console.log("📤 Queueing SMS:", phone, message);

  outgoingQueue.push({
    phone_number: phone,
    message
  });

  io.emit("newSMS", { phone_number: "SERVER", message });
}


// ===== Android Polling Endpoint =====
app.get('/api/device/send', (req, res) => {

  if (outgoingQueue.length > 0) {
    const msg = outgoingQueue.shift();
    return res.json(msg);
  }

  res.json({});
});


// ===== Live UI =====
app.get('/', (req, res) => {
  res.send(`
    <html>
    <head>
      <title>SMS Gateway Monitor</title>
      <script src="/socket.io/socket.io.js"></script>
      <style>
        body { font-family: Arial; background:#f4f6f9; margin:20px; }
        .box { background:white; padding:15px; border-radius:8px; 
               box-shadow:0 2px 6px rgba(0,0,0,0.1); margin-bottom:20px; }
        .msg { margin-bottom:8px; padding:6px; border-radius:5px; }
        .in { background:#e3f2fd; }
        .out { background:#e8f5e9; }
        .token { background:#fff3e0; }
      </style>
    </head>
    <body>

      <h1>📡 SMS Gateway (Port 5000)</h1>

      <div class="box">
        <h3>Messages</h3>
        <div id="messages"></div>
      </div>

      <div class="box">
        <h3>Tokens (From Hospital Backend)</h3>
        <div id="tokens"></div>
      </div>

      <script>
        const socket = io();

        socket.on("newSMS", data => {
          const div = document.createElement("div");
          div.className = "msg " + 
            (data.phone_number === "SERVER" ? "out" : "in");
          div.innerText = data.phone_number + " : " + data.message;
          document.getElementById("messages").appendChild(div);
        });

        socket.on("newToken", token => {
          const div = document.createElement("div");
          div.className = "msg token";
          div.innerText =
            "Token #" + token.token_number +
            " | Source: " + token.source +
            " | ETA: " + new Date(token.estimated_time).toLocaleTimeString();
          document.getElementById("tokens").appendChild(div);
        });
      </script>

    </body>
    </html>
  `);
});


const PORT = 5000;
server.listen(PORT, '0.0.0.0', () => {
  console.log("🚀 SMS Gateway running on port 5000");
});
