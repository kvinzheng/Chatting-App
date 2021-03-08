const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const port = process.env.PORT || 8080;

const bodyParser = require("body-parser");
const { nanoid } = require("nanoid");
const NEW_CHAT_MESSAGE = "NEW_CHAT_MESSAGE";
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const router = express.Router();

// Unsafely enable cors
router.use(function (_req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// mockDatabase
const mockDatabase = [
  {
    name: "Art History Chat",
    id: 0,
    users: ["Kevin", "Nicole", "Thomas"],
    messages: [
      { name: "Kevin", message: "What is the homework due?", id: "gg35545" },
      { name: "Nicole", message: "I am not sure either", id: "yy35578" },
      {
        name: "Thomas",
        message: "I think it is due next Monday",
        id: "hh9843",
      },
    ],
  },
  {
    name: "Weekend Party Chat",
    id: 1,
    users: ["Randall"],
    messages: [
      {
        name: "Randall",
        message: "What do we plan to do for the weekend? Party over my house?",
        id: "ff35278",
      },
    ],
  },
];

// Utility functions
const findRoom = (roomId) => {
  const room = mockDatabase.find((room) => {
    return room.id === parseInt(roomId);
  });
  if (room === undefined) {
    return { error: `Room id ${roomId} does not exist` };
  }
  return room;
};

const logUser = (room, username) => {
  const userNotLogged = !room.users.find((user) => {
    return user === username;
  });

  if (userNotLogged) {
    room.users.push(username);
  }
};

// API Routes
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
      logUser(room, req.body.name);
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

// mount the router on the app
app.use("/api", router);

// allow cross origin issue
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
        logUser(room, user);

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
