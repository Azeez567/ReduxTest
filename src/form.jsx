import "./App.css";

import { useSelector, useDispatch } from "react-redux";

import {
  increment,
  decrement,
  reset,
  someval,
  minval
} from "./redux/formSlice";

export default function Form() {

  const dispatch = useDispatch();

  const data = useSelector(
    (state) => state.form.value
  );

  return (
    <div className="container">

      <h2 className="count">
        Count : {data}
      </h2>

      <div className="btn-group">

        <button
          className="plus"
          onClick={() => dispatch(increment())}
        >
          +
        </button>

        <button
          className="minus"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>

        <button
          className="reset"
          onClick={() => dispatch(reset(0))}
        >
          Reset
        </button>

        <button
          className="add"
          onClick={() => dispatch(someval(250))}
        >
          +250
        </button>

        <button
          className="sub"
          onClick={() => dispatch(minval(50))}
        >
          -50
        </button>

      </div>

    </div>
  );
}