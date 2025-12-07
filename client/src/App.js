import React from "react";
import {
  fetchBeaches,
  createBeach,
  fetchBeach,
  deleteBeach,
  updateBeach,
} from "./api";

class App extends React.Component {
  state = {
    beaches: [],
  };

  // Load all beaches on page load
  componentDidMount() {
    this.loadBeaches();
  }

  loadBeaches = () => {
    fetchBeaches().then((data) => {
      this.setState({ beaches: data });
    });
  };

  // DELETE
  handleDelete = (id) => {
    deleteBeach(id).then(() => {
      this.loadBeaches();
    });
  };

  // UPDATE (placeholder)
  handleUpdate = (id) => {
    const updatedData = { name: "Updated Beach Name" }; // example
    updateBeach(id, updatedData).then(() => {
      this.loadBeaches();
    });
  };

  // CREATE (placeholder)
  handleCreate = () => {
    const newData = { name: "New Beach" }; // example
    createBeach(newData).then(() => {
      this.loadBeaches();
    });
  };

  render() {
    return (
      <div style={{ padding: "2rem" }}>
        <h1>🌊 MarshVegas Beaches</h1>

        <ul>
          {this.state.beaches.map((b) => (
            <li key={b.id}>
              {b.name}
              <button onClick={() => this.handleDelete(b.id)}>Delete</button>
              <button onClick={() => this.handleUpdate(b.id)}>Update</button>
            </li>
          ))}
        </ul>

        <button onClick={this.handleCreate}>Add Placeholder Beach</button>
      </div>
    );
  }
}

export default App;
