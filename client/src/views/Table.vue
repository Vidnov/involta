<template>
  <div>
    <div style="height: 90vh">
      <ag-grid-vue
        style="width: 100%; height: 100%"
        class="ag-theme-alpine"
        id="myGrid"
        
        @cellValueChanged="onGridReadys"
        :gridOptions="gridOptions"
        @grid-ready="onGridReady"
        :columnDefs="columnDefs"
        :defaultColDef="defaultColDef"
        :enterMovesDown="true"
        :enterMovesDownAfterEdit="true"
        :modules="modules"
        :rowData="rowData"
        :components="components"
      ></ag-grid-vue>
    </div>
    
    <button v-on:click="addItem()">Добавить cотрудника</button>
  </div>
</template>

<script>
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import GenderCellRenderer from "../components/genderCellRendererVue";
import { AgGridVue } from "ag-grid-vue";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import axios from "axios";
export default {
  name: "Table",
  components: {
    "ag-grid-vue": AgGridVue,
  },
  data() {
    return {
      gridOptions: null,
      gridApi: null,
      columnApi: null,
      columnDefs: null,
      defaultColDef: null,
      modules: [ClientSideRowModelModule],
      rowData: null,
      msg: null,
      components: null,
      frameworkComponents: null,
    };
  },
  sockets: {
    //прослушиваем события для получения данных с сервера
    connect: function () {
      console.log("socket connected");
    },
    getData: function (data) {
      //Получаем данные таблицы при загрузке страницы
      this.rowData = data;
    },
    conneсt: function (date) {},
    column: function (data) {
      //Получаем столбцы таблицы при загрузке страницы
      this.columnDefs = data;
    },
    updateTable: function(data){
       this.rowData = data;
    }
  },

  beforeMount() {
    this.gridOptions = {};
    this.$socket.emit("column");

    this.defaultColDef = {
      flex: 1,
      minWidth: 100,
      editable: true,
    };
    this.components = { datePicker: getDatePicker() };
  },
  mounted() {
    this.gridApi = this.gridOptions.api;
    this.gridColumnApi = this.gridOptions.columnApi;
  },
  methods: {
    cellEditorParams: function (params) {
      var selectedCountry = params.data.country;

      if (selectedCountry === "Ireland") {
        return {
          values: ["Dublin", "Cork", "Galway"],
        };
      } else {
        return {
          values: ["New York", "Los Angeles", "Chicago", "Houston"],
        };
      }
    },
    addItem:function(addIndex){
       var newItems = [
        createNewRowData()
      ];

       var res = this.gridApi.applyTransaction({
        add: newItems,
        addIndex: addIndex,
      });
      printResult(res);
        this.$socket.emit("create", {});
    },
    clickButton: function () {
      //тестовая отправка данных на сервер
      this.$socket.emit("test", { data: "test" });
    },
    onGridReadys(params) {
      //Получаем данные  ячейки по двойному клику
       this.$socket.emit("editTable",  params.data );
    },
    onGridReady(params) {
      this.$socket.emit("dataTable", { data: "test" });
    },
  },
};
//Создание новой строки в таблице 
window.createNewRowData = function createNewRowData() {
  var newData = {
    Id: 3,
    FirstName: '',
    LastName: '',
    SecondName:'',
    Price: '',
    Status: '',
    Date:''
  };
  return newData;
};

window.printResult = function printResult(res) {
  console.log('---------------------------------------');
  if (res.add) {
    res.add.forEach(function (rowNode) {
      console.log('Added Row Node', rowNode);
    });
  }
  if (res.remove) {
    res.remove.forEach(function (rowNode) {
      console.log('Removed Row Node', rowNode);
    });
  }
  if (res.update) {
    res.update.forEach(function (rowNode) {
      console.log('Updated Row Node', rowNode);
    });
  }
};
// Редактирование даты
window.getDatePicker = function getDatePicker() {
  function Datepicker() {}
  Datepicker.prototype.init = function (params) {
    this.eInput = document.createElement("input");
    this.eInput.value = params.value;
    this.eInput.classList.add("ag-input");
    this.eInput.style.height = "100%";
    $(this.eInput).datepicker({ dateFormat: "dd/mm/yy" });
  };
  Datepicker.prototype.getGui = function () {
    return this.eInput;
  };
  Datepicker.prototype.afterGuiAttached = function () {
    this.eInput.focus();
    this.eInput.select();
  };
  Datepicker.prototype.getValue = function () {
    return this.eInput.value;
  };
  Datepicker.prototype.destroy = function () {};
  Datepicker.prototype.isPopup = function () {
    return false;
  };
  return Datepicker;
};
</script>
<style lang="scss" >
</style>
