import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";


import { addUser, clearUsers, deleteUser, currentDelete, updateUser} from "./redux/userSlice";
import { increment, decrement, reset, multiply } from "./redux/counterSlice";

export default function App() {
  const dispatch = useDispatch();

  
  const { users, name, age, city } = useSelector((state) => state.user)
  const value = useSelector((state) => state.counter.value)
  const [form, setForm] = useState({
    name: "",
    age: "",
    city: ""
  });

  function handleChange(e) {
    
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }
 
   const disab=users.some(
    (user)=>(user.name =="azeez"
    || user.age<=18) || user.city == "madurai"
   )
   
    const isDisabled =
  !form.name ||
  !form.age ||        
  !form.city ||
  Number(form.age) < 18;
   
   
  function handleSubmit() {
    dispatch(addUser(form));
    console.log(typeof(form.name));
     console.log(typeof(form.age));

    setForm({
      name: "",
      age: "",
      city: ""
    });
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>

      {/* Counter Slice */}
      <h1>Redux Counter</h1>

      <h2>Value : {value}</h2>

      <button onClick={() => dispatch(increment())}>
        +
      </button>

      <button
        onClick={() => dispatch(decrement())}
        style={{ marginLeft: "10px" }}
      >
        -
      </button>
      <button onClick={() => dispatch(multiply(5))} style={{ marginLeft: "10px" }}>
        *5</button>

      <button
        onClick={() => dispatch(reset(0))}
        style={{ marginLeft: "10px" }}
      >
        Reset
      </button>

      <hr />

      
      <h1>User Management</h1>

      <input
        type="text"
        name="name"
        placeholder="Enter Name"
        value={form.name}
        onChange={handleChange}
      />

      <br /><br />

      <input
        type="number"
        name="age"
        placeholder="Enter Age"
        value={form.age}
        onChange={handleChange}
      />

      <br /><br />

      <input
        type="text"
        name="city"
        placeholder="Enter City"
        value={form.city}
        onChange={handleChange}
      />

      <br /><br />

      <button onClick={handleSubmit}>
        Add User
      </button>

      <button
        onClick={() => dispatch(deleteUser())}
        style={{ marginLeft: "10px" }}
      >
        Delete Last
      </button>

      <button
        onClick={() => dispatch(clearUsers())}
        disabled={disab}
        style={{ marginLeft: "10px" }}
      >
        Clear All
      </button>

      <hr />

      <h2>User List</h2>

      {users.map((item, index) => (
        <div key={index}>
          <h3>Name: {item.name}</h3>
          <p>Age: {item.age}</p>
          <p>City: {item.city}</p>

          <button
            onClick={() =>
              dispatch(currentDelete(index))
              
            }
          >
            Delete
          </button>

          <hr />
        </div>
      ))}
    </div>
  );
}