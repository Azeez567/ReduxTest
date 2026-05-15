import { useEffect, useState } from "react";

import {
  ToastContainer,
  toast
} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export default function App() {

  const [name, setName] = useState("");

  const [data, setData] = useState("");

  // Load data automatically

  useEffect(() => {

    const storedData =
      localStorage.getItem("username");

    if (storedData) {

      setData(storedData);
    }

  }, []);

  // validation

  const validate = () => {

    if (name.trim() !== "") {

      toast.success("Saved");

      return true;
    }

    else {

      toast.warning("Enter a Name");

      return false;
    }
  };

  // Save String

  function handleSave() {

    if (validate()) {

      localStorage.setItem(
        "username",
        name
      );

      setData("");

      setName("");
    }
  }

  // Get Data

  function handleGet() {

    const result =
      localStorage.getItem("username");

    if (result) {

      toast.info(result);

      setData(result);
     
    }

    else {

      toast.warning("No Data Found");
    }
  }

  // Remove Single Item

  function handleRemove() {

    localStorage.removeItem("username");

    toast.warning("Single Item Removed");

    setData("");
  }

  // Clear Entire Local Storage

  function handleClear() {

    localStorage.clear();

    toast.error("All Local Storage Cleared");

    setData("");
  }

  // Save Object

  function handleObjectSave() {

    const user = {

      name: "Azeez",

      age: 25,

      city: "Chennai"
    };

    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );

    toast.success("Object Saved");
  }

  // Get Object

  function handleObjectGet() {

    const userData = JSON.parse(
      localStorage.getItem("user")
    );

    if (userData) {

      console.log(userData);

      toast.info(

        `Name: ${userData.name}
Age: ${userData.age}
City: ${userData.city}`

      );
    }

    else {

      toast.warning("No Object Found");
    }
  }

  return (

    <div

      style={{
        textAlign: "center",
        marginTop: "50px",
        fontFamily: "Arial"
      }}

    >

      <ToastContainer />

      <h1>
        Local Storage Practice
      </h1>

      <input

        type="text"

        placeholder="Enter Name"

        value={name}

        onChange={(e) =>
          setName(e.target.value)
        }

        style={{
          padding: "10px",
          width: "250px"
        }}

      />

      <br />
      <br />

      {/* String Methods */}

      <button onClick={handleSave}>
        Save String
      </button>

      <button

        onClick={handleGet}

        style={{
          marginLeft: "10px"
        }}

      >
        Get String
      </button>

      <button

        onClick={handleRemove}

        style={{
          marginLeft: "10px"
        }}

      >
        Remove Item
      </button>

      <button

        onClick={handleClear}

        style={{
          marginLeft: "10px"
        }}

      >
        Clear All
      </button>

      <br />
      <br />

      {/* Object Methods */}

      <button onClick={handleObjectSave}>
        Save Object
      </button>

      <button

        onClick={handleObjectGet}

        style={{
          marginLeft: "10px"
        }}

      >
        Get Object
      </button>

      <br />
      <br />

      <h2>
        Stored Data : {data}
      </h2>

    </div>
  );
}