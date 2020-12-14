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
  </div>
</template>

<script>
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { AgGridVue } from "ag-grid-vue";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
export default {
  name: "Table",
  components: {
    "ag-grid-vue": AgGridVue,
  },
  sockets: {
    connect: function () {
      this.$sockets.emit
      console.log("socket connected");
    },
    customEmit: function (data) {
      console.log(
        'this method was fired by the socket server. eg: io.emit("customEmit", data)'
      );
    },
  },
  data() {
    return {
      test:'123',
      gridOptions: null,
      gridApi: null,
      columnApi: null,
      columnDefs: null,
      defaultColDef: null,
      modules: [ClientSideRowModelModule],
      rowData: null,
    };
  },
  beforeMount() {
    this.gridOptions = {};
    this.columnDefs = [
       {
        field: "Id",
        minWidth: 160,
      },
      {
        field: "First Name",
        minWidth: 160,
      },
      { field: "Last Name" },
      {
        field: "Second Name",
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
      }
    ];
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
    onGridReadys(params) {
      console.log(params);
    },
    getSelectedRows() {
      // const selectedNodes = this.gridApi.getSelectedNodes();
      // const selectedData = selectedNodes.map((node) => node.data);
      // const selectedDataStringPresentation = selectedData
      //   .map((node) => node.make + " " + node.model)
      //   .join(", ");
      // alert(`Selected nodes: ${selectedDataStringPresentation}`);
    },
    onGridReady(params) {
      const httpRequest = new XMLHttpRequest();
      const updateData = (data) => {
        this.rowData = data;
      };

      httpRequest.open(
        "GET",
        "https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/olympicWinnersSmall.json"
      );
      httpRequest.send();
      httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState === 4 && httpRequest.status === 200) {
          updateData(JSON.parse(httpRequest.responseText));
        }
      };
    },
  },
};
</script>
<style lang="scss" >
</style>
