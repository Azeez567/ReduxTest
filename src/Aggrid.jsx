import React, {
  useState,
  useMemo,
  useRef
} from "react";

import { AgGridReact } from "ag-grid-react";

import {
  ModuleRegistry,
  AllCommunityModule
} from "ag-grid-community";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import {
  ToastContainer,
  toast
} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

ModuleRegistry.registerModules([
  AllCommunityModule
]);

export default function App() {

  const gridRef = useRef();

  const [search, setSearch] = useState("");

  const [rowData, setRowData] = useState([
    {
      id: 1,
      name: "Azeez",
      age: 24,
      city: "Chennai",
      salary: 50000,
      status: "Active"
    },
    {
      id: 2,
      name: "Rahul",
      age: 20,
      city: "Delhi",
      salary: 35000,
      status: "Active"
    },
    {
      id: 3,
      name: "John",
      age: 28,
      city: "Mumbai",
      salary: 70000,
      status: "Active"
    },
    {
      id: 4,
      name: "Kumar",
      age: 30,
      city: "Bangalore",
      salary: 90000,
      status: "Inactive"
    }
  ]);

  // default column properties

  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
    floatingFilter: true,
    editable: true,
    resizable: true,
    flex: 1
  }), []);

  // custom button renderer

  const StatusButton = (params) => {
    function mess(){
    (params.value=="Active")?toast(params.value):toast.warning(params.value)
    }
    return (
      <button
        style={{
          padding: "5px 10px",
          cursor: "pointer"
        }}
        onClick={mess}
      >
        {params.value}
      </button>
    );
  };

  // column definitions

  const columnDefs = useMemo(() => [

    {
      field: "id",
      checkboxSelection: true,
      headerCheckboxSelection: true,
      width: 120
    },

    {
      field: "name",
      cellStyle: {
        fontWeight: "bold"
      }
    },

    {
      field: "age",
      cellStyle: (params) => {
        return params.value >= 25
          ? { color: "green" }
          : { color: "red" };
      }
    },

    {
      field: "city"
    },

    {
      field: "salary",

      valueFormatter: (params) => {
        return "₹ " + params.value;
      }
    },

    {
      field: "status",

      cellRenderer: StatusButton
    }

  ], []);

  // add new user

  function addUser() {

    const newUser = {
      id: rowData.length + 1,
      name: "New User",
      age: 25,
      city: "Hyderabad",
      salary: 40000,
      status: "Active"
    };
    toast.info("Edit with User Data")

    setRowData([...rowData, newUser]);
  }

  // delete selected rows

  function deleteSelected() {

    const selectedRows =
      gridRef.current.api.getSelectedRows();

    const filteredData = rowData.filter(
      (row) =>
        !selectedRows.includes(row)
    );

    setRowData(filteredData);
    toast.success("Deleted")
  }

  // export csv

  function exportCSV() {

    gridRef.current.api.exportDataAsCsv();
  }

  // select all rows

  function selectAll() {

    gridRef.current.api.selectAll();
  }

  // deselect all rows

  function deselectAll() {

    gridRef.current.api.deselectAll();
  }

  // row click

  function rowClicked(ev) {

    console.log(ev.data);
  }

  return (
    <div
      style={{
        padding: 20
      }}
    >
        <ToastContainer />

      <h1>AG Grid Full Example</h1>

      {/* search */}

      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        style={{
          padding: 10,
          marginBottom: 10,
          width: 300
        }}
      />

      <br />

      {/* buttons */}

      <button onClick={addUser}>
        Add User
      </button>

      <button
        onClick={deleteSelected}
        style={{ marginLeft: 10 }}
      >
        Delete Selected
      </button>

      <button
        onClick={exportCSV}
        style={{ marginLeft: 10 }}
      >
        Export CSV
      </button>

      <button
        onClick={selectAll}
        style={{ marginLeft: 10 }}
      >
        Select All
      </button>

      <button
        onClick={deselectAll}
        style={{ marginLeft: 10 }}
      >
        Deselect All
      </button>

      {/* AG Grid */}

      <div
        className="ag-theme-quartz"
        style={{
          height: 500,
          width: "100%",
          marginTop: 20
        }}
      >

        <AgGridReact

          ref={gridRef}

          rowData={rowData}

          columnDefs={columnDefs}

          defaultColDef={defaultColDef}

          pagination={true}

          paginationPageSize={8}

          rowSelection="multiple"

          quickFilterText={search}

          animateRows={true}

          rowHeight={50}

          domLayout="normal"

          onRowClicked={rowClicked}

          getRowStyle={(params) => {

  if (
    params.data.status === "Inactive" ||
    params.data.name === "Hari"||params.data.age >=35|| params.data.salary===50000
  ) {

    return {
      background: "#ffe5e5",
      color: "green",
      fontWeight: "bold"
    };
  }
  

}}

        />

      </div>

    </div>
  );
}