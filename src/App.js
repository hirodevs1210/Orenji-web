import "./App.css";

import { Fragment } from "react";
import { Provider } from "react-redux";
import store from "./store/store";
import Routing from "./components/routing/Routing";


const App = () => {
  return (
    <Provider store={store}>
      <Fragment className="App">
      <Routing />
      </Fragment>
    </Provider>
  );
};

export default App;
