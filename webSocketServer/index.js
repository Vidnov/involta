var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
var cors =require('cors');

app.use(cors)

var people = [
  {
    Id: "0",
    FirstName: "Никита",
    LastName: "Виднов",
    SecondName: "Алексеевич",
    Price: "30000",
    Status: "Работает",
    Date: "18.12.2020",
  },
  {
    Id: "1",
    FirstName: "Иван",
    LastName: "Иванов",
    SecondName: "Иванович",
    Price: "30000",
    Status: "Работает",
    Date: "28.12.2020",
  },
];

app.get('/people',(req,res)=>{
  res.send('people')
})

io.on("connection", (socket) => {
  console.log("user connected");
  socket.on("test", (msg) => {
    console.log(msg);
    io.emit('test', msg);

  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

http.listen(3000, () => {
  console.log("listening on *:3000");
});
