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

var config = [];

// Данные таблицы
var people = [
  {
    Id: 0,
    FirstName: "Никита",
    LastName: "Виднов",
    SecondName: "Алексеевич",
    Price: "30000",
    Status: "Работает",
    Date: "18/12/2020",
  },
  {
    Id: 1,
    FirstName: "Иван",
    LastName: "Иванов",
    SecondName: "Иванович",
    Price: "30000",
    Status: "Работает",
    Date: "28/12/2020",
  },
];

io.on("connection", (socket) => {
  console.log("user connected");
  //Запрос на получение данных при загрузке страницы
  socket.on("dataTable", () => {
    //Отправка данных
    io.emit("getData", people);
  });
  //Создание ограничение на редактирование таблицы
  socket.on("getConfig", (msg) => {
    if (config.length != 0) {
      config.forEach((element) => {
        if (element.Id == msg.params.Id) {
          io.emit("getConfig", false);
          if (element.edit == msg.value) {
            io.emit("getConfig", false);
            console.log("Ячейка уже редактируется!!!");
          }
        } else {
          console.log("Ячейка не редактируется");
          // config.push({ Id: msg.params.Id, edit: msg.value });
          io.emit("getConfig", true);
        }
      });
    } else {
      console.log("Ни одна ячейка не редактируется");
      io.emit("getConfig", true);
    }
  });
  //
  socket.on("editStoped", (msg) => {
    config = [];
  });
  // Создание новой позиции
  socket.on("create", () => {
    people.push({ Id: people.length });
    io.emit("updateTable", people);
  });
  //Редактирование ячейки
  socket.on("editTable", (msg) => {
    people = people.map((item, index, array) => {
      if (item.Id == msg.Id) {
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

  socket.on("edit", (msg) => {
    console.log(msg)
    config.push({ Id: msg.params.Id, edit: msg.value });
    console.log(config)
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

http.listen(3000, () => {
  console.log("listening on *:3000");
});
