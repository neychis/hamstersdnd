import React, { Component } from "react";
import Constants from "../constants";
import HamsterField from "./containers/HamsterField";
import HamsterContext from "../HamsterContext";
import Rack from "./containers/Rack";
import "../styles/main.scss";

class App extends Component {
  constructor(props) {
    super(props);

    const hamsters = [];
    for (let i = 0; i < Constants.numberOfHamsters; i++) {
      hamsters.push({ id: i });
    }

    this.state = { hamsters: [...hamsters] };

    this.setCurrentHamsterId = this.setCurrentHamsterId.bind(this);
  }

  render() {
    return (
      <HamsterContext.Provider
        value={{
          changeCurrentHamsterState: this.changeCurrentHamsterState,
          hamsters: this.state.hamsters
        }}
      >
        <div className="mainContainer">
          <HamsterField />
          <Rack />
        </div>
      </HamsterContext.Provider>
    );
  }

  setCurrentHamsterId(hamsterId) {
    const newState = { ...this.state };
    newState.currentHamsterId = hamsterId;
    this.setState(newState);
  }

  changeCurrentHamsterState = shelfId => {
    const newState = { ...this.state };
    const hamster = newState.hamsters.filter(
      hamster => hamster.id === this.state.currentHamsterId
    )[0];
    const id = hamster.id;
    if (newState.hamsters[id]) {
      newState.hamsters[id] = {
        id: newState.currentHamsterId,
        shelfId: shelfId
      };

      this.setState(newState);
    }
  };
}

export default App;
