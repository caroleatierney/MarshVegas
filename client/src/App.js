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
      <section className="hero has-text-centered">
        <h1 className="title is-1">Welcome Marshfield Beach Goers!</h1>

        <figure className="image is-vcentered">
          <img src="https://i.imgur.com/Yb9vS4A.jpg" alt="" />
          <h3>photo credit: Shoreline Aviation</h3>
          <h1 className="title is-2 mt-4">Below is your Beach Bucket list!</h1>
        </figure>

        <h1 className="title has-text-centered mt-5">MarshVegas Beaches</h1>

        {this.state.beaches.length === 0 ? (
          <p>Loading beaches…</p>
        ) : (
          <ul>
            {this.state.beaches.map((beach) => {
              const parkingArray = beach.parking?.split(",") || [];
              const hoursArray = beach.hours?.split(",") || [];
              const recArray = beach.avail_rec?.split(",") || [];

              return (
                <li key={beach.id} className="box m-5">
                  <h2 className="subtitle has-text-centered">{beach.name}</h2>

                  <figure className="image is-128X128 rounded-image">
                    <img src={beach.photo} alt={beach.name} />
                  </figure>

                  <p className="has-text-centered">
                    <em>Photo Credit: {beach.photo_credit}</em>
                  </p>

                  <details>
                    <summary>Parking Details</summary>
                    <ul>
                      {parkingArray.map((p, idx) => (
                        <li key={idx}>{p}</li>
                      ))}
                    </ul>
                  </details>

                  <details>
                    <summary>Hours</summary>
                    <ul>
                      {hoursArray.map((p, idx) => (
                        <li key={idx}>{p}</li>
                      ))}
                    </ul>
                  </details>

                  <details>
                    <summary>Recreation</summary>
                    <ul>
                      {recArray.map((p, idx) => (
                        <li key={idx}>{p}</li>
                      ))}
                    </ul>
                  </details>

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
              );
            })}
          </ul>
        )}

        <hr />

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
      </section>
    );
  }
}

export default App;
