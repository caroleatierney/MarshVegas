import React from "react";
// import "../my-bulma-project.scss";
// import "bulma/css/bulma.min.css";

import {
  fetchBeaches,
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
    editBeachId: null,
    editData: {},
  };

  // ============================
  // LOAD ALL BEACHES ON START
  // ============================
  componentDidMount() {
    this.loadBeaches();
  }

  loadBeaches = () => {
    fetchBeaches()
      .then((data) => this.setState({ beaches: data }))
      .catch((err) => console.error("Fetch error:", err));
  };

  // ============================
  // CREATE BEACH
  // ============================
  handleCreate = (e) => {
    e.preventDefault();
    createBeach(this.state.newBeach)
      .then(() => {
        this.loadBeaches();
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
      })
      .catch((err) => console.error("Create error:", err));
  };

  handleNewChange = (e) => {
    this.setState({
      newBeach: { ...this.state.newBeach, [e.target.name]: e.target.value },
    });
  };

  // ============================
  // BEGIN EDIT MODE
  // ============================
  startEdit = (beach) => {
    this.setState({
      editBeachId: beach.id,
      editData: { ...beach },
    });
  };

  handleEditChange = (e) => {
    this.setState({
      editData: { ...this.state.editData, [e.target.name]: e.target.value },
    });
  };

  // ============================
  // UPDATE BEACH
  // ============================
  handleUpdate = (e) => {
    e.preventDefault();
    updateBeach(this.state.editBeachId, this.state.editData)
      .then(() => {
        this.loadBeaches();
        this.setState({ editBeachId: null, editData: {} });
      })
      .catch((err) => console.error("Update error:", err));
  };

  // ============================
  // DELETE BEACH
  // ============================
  handleDelete = (id) => {
    deleteBeach(id)
      .then(() => this.loadBeaches())
      .catch((err) => console.error("Delete error:", err));
  };

  // ============================
  // RENDER
  // ============================
  render() {
    return (
      <div style={{ padding: "5rem"}}>
        <h1>MarshVegas Beaches TEST</h1>

        {this.state.beaches.length === 0 ? (
          <p>Loading beaches…</p>
        ) : (
          <ul>
            {this.state.beaches.map((beach) => (
              <li key={beach.id}>
                <div className="container">
                  <strong>{beach.name}</strong>
                  <br />
                  <img
                    src={beach.photo}
                    alt={beach.name}
                    style={{ width: "200px", borderRadius: "8px" }}
                  />
                  <p>
                    <em>{beach.photo_credit}</em>
                  </p>
                  <p>Access: {beach.access}</p>
                  <p>Parking: {beach.parking}</p>
                  <p>Hours: {beach.hours}</p>
                  <p>Recreation: {beach.avail_rec}</p>
                  <p>Notes: {beach.notes}</p>
                  <div class="buttons">
                    {/* <button
                      className="button is-primary"
                      onClick={() => this.handleDelete(beach.id)}
                    >
                      DELETE
                    </button> */}

                    <button
                      className="button my-custom-button"
                      onClick={() => this.handleDelete(beach.id)}
                    >
                      DELETE
                    </button>

                    <button onClick={() => this.startEdit(beach)}>Edit</button>
                  </div>

                  {this.state.editBeachId === beach.id && (
                    <form onSubmit={this.handleUpdate}>
                      {Object.keys(this.state.editData).map(
                        (field) =>
                          field !== "id" && (
                            <input
                              key={field}
                              name={field}
                              value={this.state.editData[field]}
                              onChange={this.handleEditChange}
                              placeholder={field}
                            />
                          )
                      )}
                      <button type="submit">Save Changes</button>
                    </form>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* =====================================
             CREATE BEACH FORM
        ====================================== */}
        <h2>Create New Beach</h2>
        <form onSubmit={this.handleCreate}>
          {Object.keys(this.state.newBeach).map((field) => (
            <input
              key={field}
              name={field}
              value={this.state.newBeach[field]}
              onChange={this.handleNewChange}
              placeholder={field}
              style={{ display: "block", marginBottom: "6px" }}
            />
          ))}
          <button type="submit">Add Beach</button>
        </form>

        <hr />

        {/* =====================================
             BEACH LIST
        ====================================== */}
        <h2>All Beaches</h2>

        <ul>
          {this.state.beaches.map((beach) => (
            <li key={beach.id} style={{ marginBottom: "1rem" }}>
              <strong>{beach.name}</strong>

              {/* DELETE BUTTON */}
              <button
                onClick={() => this.handleDelete(beach.id)}
                style={{ marginLeft: "1rem" }}
              >
                Delete
              </button>

              {/* EDIT BUTTON */}
              <button
                onClick={() => this.startEdit(beach)}
                style={{ marginLeft: "0.5rem" }}
              >
                Edit
              </button>

              {/* =====================================
                   EDIT FORM (Only for selected beach)
              ====================================== */}
              {this.state.editBeachId === beach.id && (
                <form
                  onSubmit={this.handleUpdate}
                  style={{ marginTop: "10px" }}
                >
                  {Object.keys(this.state.editData).map(
                    (field) =>
                      field !== "id" && (
                        <input
                          key={field}
                          name={field}
                          value={this.state.editData[field]}
                          onChange={this.handleEditChange}
                          placeholder={field}
                          style={{ display: "block", marginBottom: "6px" }}
                        />
                      )
                  )}
                  <button type="submit">Save Changes</button>
                </form>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
