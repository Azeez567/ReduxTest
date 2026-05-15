import React, { useState, useMemo } from "react";

import { AgGridReact } from "ag-grid-react";

import {
  ModuleRegistry,
  AllCommunityModule
} from "ag-grid-community";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

// register modules

ModuleRegistry.registerModules([
  AllCommunityModule
]);

export default function Formgrid() {

  // form state

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    age: "",
    city: ""
  });

  // grid data

  const [rowData, setRowData] = useState([]);

  // handle input change

  function handleChange(e) {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  // add data to grid

  function handleSubmit(e) {

    e.preventDefault();

    setRowData([
      ...rowData,
      formData
    ]);

    // clear form

    setFormData({
      id: "",
      name: "",
      age: "",
      city: ""
    });
  }

  // columns

  const columnDefs = useMemo(() => [

    {
      field: "id"
    },

    {
      field: "name"
    },

    {
      field: "age"
    },

    {
      field: "city"
    }

  ], []);

  // default column settings

  const defaultColDef = useMemo(() => ({
    sortable: true,
    filter: true,
    floatingFilter: true,
    flex: 1,
    resizable: true
  }), []);

  return (

    <div
      style={{
        padding: 20
      }}
    >

      <h1>Form to AG Grid</h1>

      {/* form */}

      <form onSubmit={handleSubmit}>

        <input
          type="number"
          name="id"
          placeholder="Enter ID"
          value={formData.id}
          onChange={handleChange}
          style={{
            padding: 10,
            marginRight: 10
          }}
        />

        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={formData.name}
          onChange={handleChange}
          style={{
            padding: 10,
            marginRight: 10
          }}
        />

        <input
          type="number"
          name="age"
          placeholder="Enter Age"
          value={formData.age}
          onChange={handleChange}
          style={{
            padding: 10,
            marginRight: 10
          }}
        />

        <input
          type="text"
          name="city"
          placeholder="Enter City"
          value={formData.city}
          onChange={handleChange}
          style={{
            padding: 10,
            marginRight: 10
          }}
        />

        <button
          type="submit"
          style={{
            padding: "10px 20px"
          }}
        >
          Add User
        </button>

      </form>

      {/* grid */}

      <div
        className="ag-theme-quartz"
        style={{
          height: 400,
          width: "100%",
          marginTop: 30
        }}
      >

        <AgGridReact

          rowData={rowData}

          columnDefs={columnDefs}

          defaultColDef={defaultColDef}

          pagination={true}

          paginationPageSize={5}

          rowSelection="multiple"

          animateRows={true}

        />

      </div>

    </div>
  );
}