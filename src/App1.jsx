import "./App.css";

import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import {
    add,
    sub,
    mul,
    reset,
    subnum,
    start
} from "./redux/countSlice";

import {
    addUser,
    clearUsers,
    currentDelete,
    deleteUser
} from "./redux/userSlice";

export default function App1() {

    const dispatch = useDispatch();

    const value = useSelector((state) => state.count.value);

    const { users } = useSelector((state) => state.user);

    const [form, setForm] = useState({
        name: "",
        age: "",
        city: ""
    });

    // Handle Input Change
    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    // Handle Submit
    function handleSubmit() {

        if (!form.name || !form.age || !form.city) {
            alert("Please Fill All Fields");
            return;
        }

        dispatch(addUser(form));

        setForm({
            name: "",
            age: "",
            city: ""
        });
    }

    return (
        <div className="app">

            <div className="container">

                <h1>
                    <u>Redux Counter</u>
                </h1>

                <h2 className="count">
                    Count : {value}
                </h2>

                <div className="btn-group">

                    <button onClick={() => dispatch(add())}>
                        +
                    </button>

                    <button onClick={() => dispatch(sub())}>
                        -
                    </button>

                    <button onClick={() => dispatch(mul(2))}>
                        *2
                    </button>

                    <button onClick={() => dispatch(subnum(250))}>
                        -250
                    </button>



                    <button onClick={() => dispatch(start())}>
                        Clear
                    </button>

                </div>

                <hr />

                {/* User Management */}

                <h1>
                    <u>User Management</u>
                </h1>

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

                <div className="btn-group">

                    <button
                        className="add-btn"
                        onClick={handleSubmit}
                    >
                        Add User
                    </button>

                    <button
                        className="delete-btn"
                        onClick={() => dispatch(deleteUser())}
                    >
                        Delete
                    </button>

                    <button
                        className="clear-btn"
                        onClick={() => dispatch(clearUsers())}
                    >
                        Delete All
                    </button>

                </div>

                <hr />

                {/* User List */}

                {
                    users.length === 0 ? (
                        <h3>No Users Found</h3>
                    ) : (
                        users.map((item, index) => (
                            <div className="user-card" key={index}>

                                <h2 className="user-name">
                                    Name:{item.name}
                                </h2>

                                <p>
                                    <strong>Age :</strong> {item.age}
                                </p>

                                <p>
                                    <strong>City :</strong> {item.city}
                                </p>

                                <button
                                    className="delete-btn"
                                    onClick={() =>
                                        dispatch(currentDelete(index))
                                    }
                                >
                                    Delete
                                </button>

                            </div>
                        ))
                    )
                }

            </div>

        </div>
    );
}