var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
var cors = require("cors");

app.use(cors);
//Названия и параметры таблицы
var columnDefs = [
  {
    field: "Id",
    minWidth: 160,
  },
  {
    field: "FirstName",
    minWidth: 160,
  },
  { field: "LastName" },
  {
    field: "SecondName",
    minWidth: 140,
  },
  { field: "Price" },
  {
    field: "Status",
    minWidth: 140,
  },
  {
    field: "Date",
    minWidth: 160,
  },
];

// Данные таблицы 
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

io.on("connection", (socket) => {
  console.log("user connected");
   //Запрос на получение данных при загрузке страницы
  socket.on("dataTable", () => {
   //Отправка данных
    io.emit("getData", people);
  });

  //Запрос на получение названия колонок 
  socket.on("column", () => {
      //Отправка колонок
    io.emit("column", columnDefs);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

http.listen(3000, () => {
  console.log("listening on *:3000");
});
