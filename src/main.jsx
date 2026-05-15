import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"
import App2 from "./App2";
import App4 from "./App4";
import App5 from "./App5";
import App1 from "./App1";
import Aggrid from "./Aggrid";
import { Provider } from "react-redux";
import { store ,persistor} from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import Formgrid from "./formgrid";
import Form from "./form";
import Usestat from "./Usestat";
import FormApp from "./FormApp";
ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <Provider store={store}>
    <PersistGate loading={<p>Loading...</p>} persistor={persistor}>
      <FormApp />
    </PersistGate>
  </Provider>
);

