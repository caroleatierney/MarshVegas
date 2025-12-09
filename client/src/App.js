import React from "react";
import { fetchBeaches, createBeach, updateBeach, deleteBeach } from "./api";

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

  componentDidMount() {
    this.loadBeaches();
  }

  loadBeaches = () => {
    fetchBeaches()
      .then((data) => this.setState({ beaches: data }))
      .catch((err) => console.error("Fetch error:", err));
  };

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

  handleUpdate = (e) => {
    e.preventDefault();
    updateBeach(this.state.editBeachId, this.state.editData)
      .then(() => {
        this.loadBeaches();
        this.setState({ editBeachId: null, editData: {} });
      })
      .catch((err) => console.error("Update error:", err));
  };

  handleDelete = (id) => {
    deleteBeach(id)
      .then(() => this.loadBeaches())
      .catch((err) => console.error("Delete error:", err));
  };

  render() {
    return (
      <div className="container mt-5">
        <h1 className="title has-text-centered">MarshVegas Beaches</h1>

        {this.state.beaches.length === 0 ? (
          <p>Loading beaches…</p>
        ) : (
          <ul>
            {this.state.beaches.map((beach) => (
              <li key={beach.id} className="box mb-5">
                <h2 className="subtitle has-text-centered">{beach.name}</h2>

                <figure class="image is-128X128 rounded-image">
                  <img src={beach.photo} alt={beach.name} />
                </figure>

                <p className="has-text-centered">
                  <em>Photo Credit: {beach.photo_credit}</em>
                </p>
                <p>Access: {beach.access}</p>
                <p>Parking: {beach.parking}</p>
                <p>Hours: {beach.hours}</p>
                <p>Recreation: {beach.avail_rec}</p>
                <p>Notes: {beach.notes}</p>

                <div className="buttons equal-buttons">
                  <button
                    className="button my-custom-button"
                    onClick={() => this.handleDelete(beach.id)}
                  >
                    Delete
                  </button>

                  <button
                    className="button my-custom-button"
                    onClick={() => this.startEdit(beach)}
                  >
                    Edit
                  </button>
                </div>

                {this.state.editBeachId === beach.id && (
                  <form onSubmit={this.handleUpdate}>
                    {Object.keys(this.state.editData).map(
                      (field) =>
                        field !== "id" && (
                          <input
                            key={field}
                            className="input mb-2"
                            name={field}
                            value={this.state.editData[field]}
                            onChange={this.handleEditChange}
                            placeholder={field}
                          />
                        )
                    )}
                    <button className="button is-link mt-2" type="submit">
                      Save Changes
                    </button>
                  </form>
                )}
              </li>
            ))}
          </ul>
        )}

        <hr />

        {/* CREATE BEACH FORM */}
        <h2 className="title is-4 mt-5">Create New Beach</h2>

        <form onSubmit={this.handleCreate}>
          {Object.keys(this.state.newBeach).map((field) => (
            <input
              key={field}
              className="input mb-2"
              name={field}
              value={this.state.newBeach[field]}
              onChange={this.handleNewChange}
              placeholder={field}
            />
          ))}
          <button className="button is-success mt-3" type="submit">
            Add Beach
          </button>
        </form>
      </div>
    );
  }
}

export default App;
