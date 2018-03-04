import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
