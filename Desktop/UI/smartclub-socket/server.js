const { Server } = require("socket.io");
const io = new Server(3000, {
  cors: {
    origin: "*", // Cho phép mọi nguồn (web local)
  },
});

io.on("connection", (socket) => {
  console.log("Client kết nối:", socket.id);

  // Lắng nghe tin nhắn
  socket.on("chatMessage", (msg) => {
    console.log("Tin nhận:", msg);
    io.emit("chatMessage", msg); // gửi cho tất cả client khác
  });

  socket.on("disconnect", () => {
    console.log("Client rời:", socket.id);
  });
});

console.log("✅ Socket server chạy tại ws://localhost:3000");
