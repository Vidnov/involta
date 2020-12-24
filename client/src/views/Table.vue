<template>
  <div>
    <div style="height: 90vh">
      <ag-grid-vue
        style="width: 100%; height: 100%"
        class="ag-theme-alpine"
        id="myGrid"
        @cellClicked="onGridReadys"
        :gridOptions="gridOptions"
        @grid-ready="onGridReady"
        :columnDefs="columnDefs"
        :defaultColDef="defaultColDef"
        :enterMovesDown="true"
        :enterMovesDownAfterEdit="true"
        :modules="modules"
        :rowData="rowData"
      ></ag-grid-vue>
    </div>
    <button v-on:click="clickButton">Отправить</button>
  </div>
</template>

<script>
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
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
    };
  },
  sockets: {
    //прослушиваем события для получения данных с сервера
    connect: function () {
      console.log("socket connected");
    },
    getData: function (data) { //Получаем данные таблицы при загрузке страницы 
      this.rowData = data;
    },
    conneсt: function (date) {
  
    },
    column: function (data) { //Получаем столбцы таблицы при загрузке страницы 
      this.columnDefs = data;
    },
  },

  beforeMount() {
    this.gridOptions = {};
    this.$socket.emit("column");

    this.defaultColDef = {
      flex: 1,
      minWidth: 100,
      editable: true,
    };
  },
  mounted() {
    this.gridApi = this.gridOptions.api;
    this.gridColumnApi = this.gridOptions.columnApi;
  },
  methods: {
    clickButton: function () { //тестовая отправка данных на сервер
      this.$socket.emit("test", { data: "test" });
    },
    onGridReadys(params) { //Получаем данные  ячейки по двойному клику 
      console.log(params);
    },
    onGridReady(params) {
      this.$socket.emit("dataTable", { data: "test" });
    },
  },
};
</script>
<style lang="scss" >
</style>
