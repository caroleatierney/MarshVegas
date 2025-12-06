import React from "react";
import {
  fetchBeaches,
  fetchBeach,
  createBeach,
  deleteBeach,
  updateBeach,
} from "./api";

class App extends React.Component {
  state = {
    beaches: [],
    newName: "",
  };

  // Load all beaches when the component mounts
  componentDidMount() {
    this.loadBeaches();
  }

  // Helper to refresh state
  loadBeaches = () => {
    fetchBeaches().then((data) => {
      this.setState({ beaches: data });
    });
  };

  // CREATE
  handleCreate = () => {
    createBeach({ name: this.state.newName }).then(() => {
      this.loadBeaches(); // refresh
    });
  };

  // DELETE
  handleDelete = (id) => {
    deleteBeach(id).then(() => {
      this.loadBeaches();
    });
  };

  // UPDATE (example: update only name)
  handleUpdate = (id) => {
    const updatedData = { name: prompt("New name?") };
    updateBeach(id, updatedData).then(() => {
      this.loadBeaches();
    });
  };

  render() {
    return (
      <div style={{ padding: "2rem" }}>
        <h1>🌊 MarshVegas Beaches</h1>

        {/* CREATE BEACH */}
        <input
          type="text"
          placeholder="Beach name"
          value={this.state.newName}
          onChange={(e) => this.setState({ newName: e.target.value })}
        />
        <button onClick={this.handleCreate}>Add Beach</button>

        {/* LIST BEACHES */}
        <ul>
          {this.state.beaches.map((b) => (
            <li key={b.id}>
              {b.name}
              {"  "}
              <button onClick={() => this.handleDelete(b.id)}>Delete</button>
              <button onClick={() => this.handleUpdate(b.id)}>Update</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;