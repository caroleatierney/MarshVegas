import React from "react";
import {
  fetchBeaches,
  fetchBeach,
  createBeach,
  updateBeach,
  deleteBeach,
} from "./api";

class App extends React.Component {
  state = {
    beaches: [],
    newBeach: {
      name: "",
      photo: "",
      photo_credit: "",
      access: "",
      parking: "",
      hours: "",
      avail_rec: "",
      notes: "",
    },
    editingBeachId: null,
    editingBeach: {},
  };

  // --------------------------------------------------
  // Load Data
  // --------------------------------------------------
  componentDidMount() {
    this.loadBeaches();
  }

  loadBeaches = () => {
    fetchBeaches().then((data) => {
      this.setState({ beaches: data });
    });
  };

  // --------------------------------------------------
  // Handle Create Form Input
  // --------------------------------------------------
  handleNewInput = (e) => {
    this.setState({
      newBeach: {
        ...this.state.newBeach,
        [e.target.name]: e.target.value,
      },
    });
  };

  // --------------------------------------------------
  // Create Beach
  // --------------------------------------------------
  handleCreate = (e) => {
    e.preventDefault();
    createBeach(this.state.newBeach).then(() => {
      this.setState({
        newBeach: {
          name: "",
          photo: "",
          photo_credit: "",
          access: "",
          parking: "",
          hours: "",
          avail_rec: "",
          notes: "",
        },
      });
      this.loadBeaches();
    });
  };

  // --------------------------------------------------
  // Begin Editing
  // --------------------------------------------------
  startEdit = (beach) => {
    this.setState({
      editingBeachId: beach.id,
      editingBeach: { ...beach },
    });
  };

  // --------------------------------------------------
  // Handle Edit Inputs
  // --------------------------------------------------
  handleEditInput = (e) => {
    this.setState({
      editingBeach: {
        ...this.state.editingBeach,
        [e.target.name]: e.target.value,
      },
    });
  };

  // --------------------------------------------------
  // Save Updated Beach
  // --------------------------------------------------
  handleUpdate = (e) => {
    e.preventDefault();
    updateBeach(this.state.editingBeachId, this.state.editingBeach).then(() => {
      this.setState({ editingBeachId: null, editingBeach: {} });
      this.loadBeaches();
    });
  };

  // --------------------------------------------------
  // Delete Beach
  // --------------------------------------------------
  handleDelete = (id) => {
    deleteBeach(id).then(() => {
      this.loadBeaches();
    });
  };

  // --------------------------------------------------
  // RENDER
  // --------------------------------------------------
  render() {
    return (
      <div style={{ padding: "2rem" }}>
        <h1>🌊 MarshVegas Beaches</h1>

        {/* -----------------------------------------------
            CREATE FORM
        ------------------------------------------------ */}
        <h2>Add a New Beach</h2>
        <form onSubmit={this.handleCreate}>
          {Object.keys(this.state.newBeach).map((field) => (
            <input
              key={field}
              name={field}
              placeholder={field}
              value={this.state.newBeach[field]}
              onChange={this.handleNewInput}
              style={{ display: "block", margin: "5px 0" }}
            />
          ))}
          <button type="submit">Create Beach</button>
        </form>

        <hr />

        {/* -----------------------------------------------
            BEACH LIST
        ------------------------------------------------ */}
        <h2>All Beaches</h2>
        <ul>
          {this.state.beaches.map((b) => (
            <li key={b.id} style={{ marginBottom: "1.5rem" }}>
              <strong>{b.name}</strong>

              {/* DELETE BUTTON */}
              <button
                onClick={() => this.handleDelete(b.id)}
                style={{ marginLeft: "1rem" }}
              >
                Delete
              </button>

              {/* EDIT SECTION */}
              {this.state.editingBeachId === b.id ? (
                <form
                  onSubmit={this.handleUpdate}
                  style={{ marginTop: "1rem" }}
                >
                  {Object.keys(this.state.editingBeach).map(
                    (field) =>
                      field !== "id" && (
                        <input
                          key={field}
                          name={field}
                          placeholder={field}
                          value={this.state.editingBeach[field]}
                          onChange={this.handleEditInput}
                          style={{ display: "block", margin: "5px 0" }}
                        />
                      )
                  )}
                  <button type="submit">Save</button>
                </form>
              ) : (
                <button onClick={() => this.startEdit(b)}>Edit</button>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
