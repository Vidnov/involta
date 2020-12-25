var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
var cors = require("cors");

app.use(cors);
//Названия и параметры таблицы
var columnDefs = [
  {
    headerName: "ID",
    field: "Id",
    minWidth: 160,
  },
  {
    headerName: "Имя",
    field: "FirstName",
    minWidth: 160,
  },
  {
    headerName: "Фамилия",
    field: "LastName",
    minWidth: 160,
  },
  {
    headerName: "Отчество",
    field: "SecondName",
    minWidth: 140,
  },
  {
    headerName: "Оплата",
    field: "Price",
  },
  {
    headerName: "Статус",
    field: "Status",
    minWidth: 140,
    cellEditor: "cellEditorParams",
    cellEditorParams: {
      cellHeight: 50,
      values: ["Ireland", "USA"],
    },
  },
  {
    headerName: "Дата Устройства",
    field: "Date",
    editable: true,
    cellEditor: "datePicker",
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
  // Создание новой позиции 
  socket.on("create", () => {
    let count = people.forEach((element) => {
      console.log(element);
      return element.Id;
    });
    console.log(count);
    people.push({ Id: people.length });
    io.emit("updateTable", people);
  });
  socket.on("editTable", (msg) => {
    console.log(people);
    people = people.map((item, index, array) => {
      if (item.Id == msg.Id) {
        console.log(typeof item);
        item = msg;
      }
      return item;
    });
    io.emit("updateTable", people);
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
