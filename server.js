const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const port = process.env.PORT || 8080;
const { findRoom, logUserInSingleRoom, mockDatabase } = require("./server-helper");

const bodyParser = require("body-parser");
const { nanoid } = require("nanoid");
const NEW_CHAT_MESSAGE = "NEW_CHAT_MESSAGE";
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const router = express.Router();

/* Unsafely enable cors for MVP */
router.use(function (_req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

router.get("/rooms", function (req, res) {
  const rooms = mockDatabase.map((room) => {
    return { name: room.name, id: room.id };
  });
  console.log("Response:", rooms);
  res.json(rooms);
});

router.get("/rooms/:roomId", function (req, res) {
  const room = findRoom(req.params.roomId);
  if (room.error) {
    console.log("error:", room);
    res.json(room);
  } else {
    console.log("Response:", {
      name: room.name,
      id: room.id,
      users: room.users,
    });
    res.json({ name: room.name, id: room.id, users: room.users });
  }
});

router
  .route("/rooms/:roomId/messages")
  .get(function (req, res) {
    const room = findRoom(req.params.roomId);
    if (room.error) {
      console.log("error:", room);
      res.json(room);
    } else {
      console.log("Response:", room.messages);
      res.json(room.messages);
    }
  })
  .post(function (req, res) {
    const room = findRoom(req.params.roomId);
    if (room.error) {
      console.log("error:", room);
      res.json(room);
    } else if (!req.body.name || !req.body.message) {
      console.log("Response:", { error: "request missing name or message" });
      res.json({ error: "request missing name or message" });
    } else {
      logUserInSingleRoom(room, req.body.name);
      const messageObj = {
        name: req.body.name,
        message: req.body.message,
        id: shortid.generate(),
      };
      room.messages.push(messageObj);
      console.log("Response:", { message: "OK!" });
      res.json(messageObj);
    }
  });


app.use("/api", router);

// allow cross origin issue for WebSocket
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  const { roomId, user } = socket.handshake.query;
  if (!isNaN(roomId)) {
    //group the individual room together into this socket cluster
    socket.join(roomId);
    socket.on(NEW_CHAT_MESSAGE, (data) => {
      const room = findRoom(roomId);
      if (room.error) {
        console.log("error:", room);
      } else if (!data) {
        console.log("Response:", { error: "request missing name or message" });
      } else {
        logUserInSingleRoom(room, user);

        const newMessage = {
          name: user,
          message: data,
          id: nanoid(),
        };
        room.messages.push(newMessage);
        console.log("Response:", { message: "OK!" });
        io.in(roomId).emit(NEW_CHAT_MESSAGE, { message: newMessage, room });
      }
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  }
});

server.listen(port, () => console.log(`API running at localhost:${port}/api`));
