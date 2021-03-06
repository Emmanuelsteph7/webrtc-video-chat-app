const express = require("express");
const dotenv = require("dotenv");
const app = express();
const server = require("http").createServer(app);
const cors = require("cors");
const path = require("path");
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());

// Setting up config file
dotenv.config({ path: "/config/config.env" });

io.on("connection", (socket) => {
  // you can emit events on one side and register listeners on the other
  socket.emit("me", socket.id);

  socket.on("disconnect", () => {
    socket.broadcast.emit("callended");
  });

  socket.on("calluser", ({ userToCall, signalData, from, name }) => {
    io.to(userToCall).emit("calluser", { signal: signalData, from, name });
  });

  socket.on("answercall", (data) => {
    io.to(data.to).emit("callaccepted", data.signal);
  });
});

// if (process.env.NODE_ENV === "PRODUCTION") {
app.use(express.static(path.join(__dirname, "/client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "/client/build/index.html"));
});
// }

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
