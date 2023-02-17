import React, { Component } from "react";
import Crud from "./Crud";
import "./index.css";

class App extends Component {
  render() {
    return (
      <div className="App" >
        <div className="table-container">
          <Crud />
        </div>
      </div>
    );
  }
}

export default App;
