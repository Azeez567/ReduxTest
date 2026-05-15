import { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { increment,decrement,reset } from "./redux/useSlice";
export default function Usestat(){
    const dispatch=useDispatch();
    const data=useSelector((state)=>state.useSate.value);
    return(
        <>
        <h3>Count : {data}</h3>
        <button onClick={()=>dispatch(increment())}>+</button>
        <button onClick={()=>dispatch(decrement())}>-</button>
        <button onClick={()=>dispatch(reset(0))}>Reset</button>
        </>
    )
}