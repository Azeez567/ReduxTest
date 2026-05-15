import { useState } from "react";

import {
  addUser,
  clearUsers,
  deleteUser
} from "./redux/localSlice";

import {
  useDispatch,
  useSelector
} from "react-redux";

import {
  ToastContainer,
  toast
} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export default function App5() {

  const dispatch = useDispatch();

  // Redux Array Data

  const users = useSelector(
    (state) => state.local.users
  );

  // Form State

  const [form, setForm] = useState({
    name: "",
    age: "",
    city: "",
  });

  // Handle Input

  function handleChange(e) {

    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  // Clear Input

  function clearInput() {

    setForm({
      name: "",
      age: "",
      city: "",
    });
  }

  // SET DATA

  function handleSet() {

    localStorage.setItem(
      "user",
      JSON.stringify(form)
    );

    toast.success("Data Saved");

    clearInput();
  }

  // GET DATA

  function handleGet() {

    const data = localStorage.getItem("user");

    if (data) {

      const parsedData = JSON.parse(data);

      // Add Redux Array

      dispatch(addUser(parsedData));

      toast.info("Data Loaded");

    } else {

      toast.error("No Data Found");
    }
  }

  // DELETE SINGLE USER

  function handleDelete(index) {

    dispatch(deleteUser(index));

    toast.warning("User Deleted");
  }

  // CLEAR ALL

  function handleClearAll() {

    localStorage.clear();

    dispatch(clearUsers());

    toast.error("All Data Cleared");
  }

  return (

    <div
      style={{
        textAlign: "center",
        marginTop: "50px"
      }}
    >

      {/* Toast */}

      <ToastContainer />

      <h1>Redux + LocalStorage</h1>

      {/* Name */}

      <input
        type="text"
        placeholder="Enter Name"
        value={form.name}
        name="name"
        onChange={handleChange}
      />

      <br /><br />

      {/* Age */}

      <input
        type="number"
        placeholder="Enter Age"
        value={form.age}
        name="age"
        onChange={handleChange}
      />

      <br /><br />

      {/* City */}

      <input
        type="text"
        placeholder="Enter City"
        value={form.city}
        name="city"
        onChange={handleChange}
      />

      <br /><br />

      {/* Buttons */}

      <button onClick={handleSet}>
        Set
      </button>

      <button
        onClick={handleGet}
        style={{ marginLeft: "10px" }}
      >
        Get
      </button>

      <button
        onClick={handleClearAll}
        style={{ marginLeft: "10px" }}
      >
        Clear All
      </button>

      <hr />

      {/* Redux Display */}

      {
        users.map((item, index) => (

          <div
            key={index}
            style={{
              border: "1px solid gray",
              margin: "20px auto",
              padding: "20px",
              width: "300px",
              borderRadius: "10px"
            }}
          >

            <h2>Name : {item.name}</h2>

            <h2>Age : {item.age}</h2>

            <h2>City : {item.city}</h2>

            <button
              onClick={() => handleDelete(index)}
            >
              Delete
            </button>

          </div>
        ))
      }

    </div>
  );
}