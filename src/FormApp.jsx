import React, {
  useEffect,
  useMemo,
} from "react";

import axios from "axios";

import { AgGridReact } from "ag-grid-react";

import {
  ModuleRegistry,
  AllCommunityModule,
} from "ag-grid-community";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  setUsers,
  addUser,
  updateUser,
} from "./redux/usSlice";

import { useForm }
from "react-hook-form";

import { yupResolver }
from "@hookform/resolvers/yup";

import { userSchema }
from "./validation/userValidation";

import {
  ToastContainer,
  toast,
} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import "./App.css";

// REGISTER AG GRID MODULES
ModuleRegistry.registerModules([
  AllCommunityModule,
]);

export default function App() {

  const dispatch = useDispatch();

  // REDUX STATE
  const users = useSelector(
    (state) => state.usState.value
  );

  const API =
    "https://6985ac756964f10bf2540df1.mockapi.io/users";

  // REACT HOOK FORM
  const {
    register,
    handleSubmit,
    reset,

    formState: { errors },

  } = useForm({

    resolver:
      yupResolver(userSchema),

  });

  // AG GRID COLUMNS
  const columnDefs = [

    {
      headerName: "ID",

      field: "id",

      editable: true,

      sortable: true,
      filter: true,
      flex: 1,
    },

    {
      headerName: "Name",

      valueGetter: (params) =>
        params.data.name ||
        params.data.username,

      editable: false,

      sortable: true,
      filter: true,
      flex: 1,
    },

    {
      headerName: "Email",

      field: "email",

      editable: false,

      sortable: true,
      filter: true,
      flex: 1,
    },

    {
      headerName: "Password",

      field: "password",

      editable: false,

      sortable: true,
      filter: true,
      flex: 1,
    },
  ];

  // DEFAULT COLUMN
  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      floatingFilter: true,
      flex: 1,
      resizable: true,
    }),
    []
  );

  // GET USERS
  async function fetchUsers() {

    try {

      const response =
        await axios.get(API);

      dispatch(
        setUsers(response.data)
      );

    } catch (error) {

      console.log(error);

      toast.error(
        "GET API Error"
      );
    }
  }

  // AUTO LOAD
  useEffect(() => {

    fetchUsers();

  }, []);

  // UPDATE API
  async function onCellValueChanged(
    params
  ) {

    try {

      const response =
        await axios.put(

          `${API}/${params.data.id}`,

          params.data
        );

      dispatch(
        updateUser(
          response.data
        )
      );

      toast.success(
        "Updated Successfully"
      );

    } catch (error) {

      console.log(error);

      toast.error(
        "Update Failed"
      );
    }
  }

  // POST METHOD
  async function onSubmit(data) {

    try {

      const response =
        await axios.post(
          API,
          data
        );

      dispatch(
        addUser(
          response.data
        )
      );

      toast.success(
        "Data Submitted Successfully"
      );

      reset();

    } catch (error) {

      console.log(error);

      toast.error(
        "POST API Error"
      );
    }
  }

  return (

    <div
      style={{
        width: "90%",
        margin: "20px auto",
      }}
    >

      <ToastContainer />

      {/* TITLE */}
      <h1
        style={{
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        React Hook Form +
        Redux Toolkit +
        AG Grid
      </h1>

      {/* FORM */}
      <form

        onSubmit={handleSubmit(
          onSubmit
        )}

        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "15px",
          marginBottom: "30px",
        }}
      >

        {/* NAME */}
        <div
          style={{
            width: "43%",
          }}
        >

          <input
            type="text"

            placeholder="Enter Name"

            {...register("name")}

            style={{
              width: "100%",
              padding: "10px",
            }}
          />

          <p
            style={{
              color: "red",
            }}
          >
            {
              errors.name
                ?.message
            }
          </p>

        </div>

        {/* EMAIL */}
        <div
          style={{
            width: "43%",
          }}
        >

          <input
            type="email"

            placeholder="Enter Email"

            {...register("email")}

            style={{
              width: "100%",
              padding: "10px",
            }}
          />

          <p
            style={{
              color: "red",
            }}
          >
            {
              errors.email
                ?.message
            }
          </p>

        </div>

        {/* PASSWORD */}
        <div
          style={{
            width: "43%",
          }}
        >

          <input
            type="password"

            placeholder="Enter Password"

            {...register(
              "password"
            )}

            style={{
              width: "100%",
              padding: "10px",
            }}
          />

          <p
            style={{
              color: "red",
            }}
          >
            {
              errors.password
                ?.message
            }
          </p>

        </div>

        {/* BUTTON */}
        <button
          type="submit"

          className="btn"

          style={{
            width: "43%",
            padding: "10px",
          }}
        >
          Send
        </button>

      </form>

      <hr />

      {/* TITLE */}
      <h2
        style={{
          textAlign: "center",
          color: "blue",
          margin: "20px 0",
        }}
      >
        <u>User List</u>
      </h2>

      {/* AG GRID */}
      <div
        className="ag-theme-quartz"

        style={{
          height: "450px",
          width: "85%",
          margin: "30px auto",

          borderRadius: "12px",

          overflow: "hidden",

          "--ag-header-background-color":
            "#0284c7",

          "--ag-header-foreground-color":
            "white",

          "--ag-row-hover-color":
            "#bae6fd",

          "--ag-odd-row-background-color":
            "#f1f5f9",

          "--ag-cell-horizontal-padding":
            "20px",

          "--ag-row-height":
            "55px",

          "--ag-header-height":
            "60px",
        }}
      >

        <AgGridReact

          // IMPORTANT FIX
          rowData={users.map(
            (user) => ({
              ...user,
            })
          )}

          columnDefs={columnDefs}

          defaultColDef={
            defaultColDef
          }

          pagination={true}

          paginationPageSize={
            10
          }

          animateRows={true}

          onCellValueChanged={
            onCellValueChanged
          }
        />

      </div>

    </div>
  );
}