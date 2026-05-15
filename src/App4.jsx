import { useState } from "react";
export default function App4() {
    const [name, setName] = useState();
    const [data,setData] = useState();
    function set() {
        const sett = localStorage.setItem("name", name)

    }
    function get() {
        const gett = localStorage.getItem("name")
        console.log(gett)
        setData(gett)
    }
    function clear() {
        localStorage.removeItem("name")
        setName("")
        setData("")
    }
    function clearAll() {
        localStorage.clear()
         setName("")
         setData("")
    }
    return (
        <>
            <input
                type="text"
                name="name"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}

            />

            <button onClick={set}>set</button>
            <button onClick={get}>get</button>
            <button onClick={clear}>clear</button>
             <button onClick={clearAll}>clearAll</button>


             <h2>Name: {data}</h2>
        </>
    )
}