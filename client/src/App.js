import React from "react";
import { fetchBeaches, createBeach, fetchBeach } from "./api";

class App extends React.Component {
  state = {
    beaches: [],
  };

  componentDidMount() {
    fetchBeaches().then((data) => {
      this.setState({ beaches: data });
    });
  }

  render() {
    return (
      <div style={{ padding: "2rem" }}>
        <h1>🌊 MarshVegas Beaches</h1>
        <ul>
          {this.state.beaches.map((b) => (
            <li key={b.id}>{b.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
