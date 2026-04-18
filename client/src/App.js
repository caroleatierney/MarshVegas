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
    // tide results:
    high1: "",
    highDate1: "",
    highTime1: "",
    highHeight1: "",
    low1: "",
    lowDate1: "",
    lowTime1: "",
    lowHeight1: "",
    high2: "",
    highDate2: "",
    highTime2: "",
    highHeight2: "",
    low2: "",
    lowDate2: "",
    lowTime2: "",
    lowHeight2: "",
  };

  componentDidMount() {
    this.loadBeaches();
  }

  //***********************************************
  //**************** GET TIDES ********************
  //***********************************************
  getTides = () => {
    console.log(this.state.lat);
    console.log(this.state.long);

    const { lat, long } = this.state;
    const apiKey = process.env.REACT_APP_STORMGLASS_API_KEY;
    const today = new Date();
    const yyyyMmDd = today.toISOString().split("T")[0]; // "2025-12-12"

    const start = `${yyyyMmDd} 00:00`;
    const end = `${yyyyMmDd} 23:59`;

    fetch(
      `https://api.stormglass.io/v2/tide/extremes/point?lat=${lat}&lng=${long}&start=${start}&end=${end}`,
      {
        headers: {
          Authorization: apiKey,
        },
      }
    )

      .then((response) => {
        console.log("Status:", response.status);
        return response.json();
      })
      .then((data) => {
        console.log("Raw tide data:", data);
        const extremes = data.data || [];

        if (!extremes || extremes.length === 0) {
          console.error("No tide data returned:", data);
          // Set ALL rows to "No tide data" ONLY when empty
          this.setState({
            high1: "No tide data",
            highDate1: "",
            highTime1: "",
            highHeight1: "",
            low1: "No tide data",
            lowDate1: "",
            lowTime1: "",
            lowHeight1: "",
            high2: "No tide data",
            highDate2: "",
            highTime2: "",
            highHeight2: "",
            low2: "No tide data",
            lowDate2: "",
            lowTime2: "",
            lowHeight2: "",
          });
          return;
        }

        // Process real data when available
        const count = Math.min(4, extremes.length);
        const date = [];
        const time = [];
        const height = [];

        for (let i = 0; i < count; i++) {
          const entry = extremes[i];
          if (!entry) continue;

          const extremeNewDate = new Date(entry.time || entry.datetime);
          date[i] = extremeNewDate.toLocaleDateString();
          time[i] = extremeNewDate.toLocaleTimeString();
          height[i] = Math.round(entry.height * 100) / 100;
        }

        // Set real data - missing slots stay as previous values or blank
        this.setState({
          high1: extremes[0]?.type || "",
          highDate1: date[0] || "",
          highTime1: time[0] || "",
          highHeight1: height[0] || "",

          low1: extremes[1]?.type || "",
          lowDate1: date[1] || "",
          lowTime1: time[1] || "",
          lowHeight1: height[1] || "",

          high2: extremes[2]?.type || "",
          highDate2: date[2] || "",
          highTime2: time[2] || "",
          highHeight2: height[2] || "",

          low2: extremes[3]?.type || "",
          lowDate2: date[3] || "",
          lowTime2: time[3] || "",
          lowHeight2: height[3] || "",
        });
      });

    // console.log(data);
    // console.log(data.extremes);
    // console.log(data.extremes[0].datetime);

    //   console.log(i);
    //   console.log(extremeNewDate);
    //   console.log(extremeDate);
    //   console.log(extremeTime);
    //   console.log(extremeRoundedHeight);
  };

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
        <h1 className="title is-1 pt-5">Welcome Marshfield Beach Goers!</h1>

        <figure className="image is-vcentered">
          <img src="https://i.imgur.com/Yb9vS4A.jpg" alt="" />
          <h3>photo credit: Shoreline Aviation</h3>
          <h1 className="title is-2 mt-4">Below is your Beach bucket list!</h1>
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
                  <div className="columns is-vcentered">
                    <div className="column is-two-thirds">
                      <h2 className="subtitle has-text-centered is-size-1 has-text-weight-bold is-underlined mb-5">
                        {beach.name}
                      </h2>
                      <figure className="image is-96X96 rounded-image">
                        
                        console.log({beach.photo})
                        
                        <img src={beach.photo} alt={beach.name} />
                      </figure>

                      <p className="has-text-centered">
                        <em>Photo Credit: {beach.photo_credit}</em>
                      </p>
                    </div>

                    <div className="column is-one-third">
                      <div className="column is-vertically-spaced">
                        <details>
                          <summary>Parking Details</summary>
                          <ul className="list">
                            {parkingArray.map((p, idx) => (
                              <li key={idx}>{p}</li>
                            ))}
                          </ul>
                        </details>

                        <details>
                          <summary>General Hours and Access</summary>
                          <ul className="list-col">
                            {hoursArray.map((p, idx) => (
                              <li key={idx}>{p}</li>
                            ))}
                          </ul>
                        </details>

                        <details>
                          <summary>Recreation</summary>
                          <ul className="list">
                            {recArray.map((p, idx) => (
                              <li key={idx}>
                                <img src={p} alt=""></img>
                              </li>
                            ))}
                          </ul>
                        </details>

                        <details>
                          <summary
                            onClick={() => {
                              this.setState(
                                { lat: beach.latitude, long: beach.longitude },
                                () => {
                                  this.getTides(); // Call WITHOUT callback
                                },
                              );
                            }}
                          >
                            tides
                          </summary>

                          <div className="has-text-centered is-size-6">
                            <table
                              className="table is-bordered is-narrow is-hoverable is-fullwidth tide-table"
                              style={{ width: "auto", margin: "0 auto" }}
                            >
                              <thead>
                                <tr key={beach.id}>
                                  <th className="has-text-centered">Extreme</th>
                                  <th className="has-text-centered">Date</th>
                                  <th className="has-text-centered">Time</th>
                                  <th className="has-text-centered">Height</th>
                                </tr>
                              </thead>

                              <tbody>
                                <tr>
                                  <td> {this.state.high1} </td>
                                  <td> {this.state.highDate1} </td>
                                  <td> {this.state.highTime1} </td>
                                  <td> {this.state.highHeight1} </td>
                                </tr>
                                <tr>
                                  <td> {this.state.low1} </td>
                                  <td> {this.state.lowDate1} </td>
                                  <td> {this.state.lowTime1} </td>
                                  <td> {this.state.lowHeight1} </td>
                                </tr>
                                <tr>
                                  <td> {this.state.high2} </td>
                                  <td> {this.state.highDate2} </td>
                                  <td> {this.state.highTime2} </td>
                                  <td> {this.state.highHeight2} </td>
                                </tr>
                                <tr>
                                  <td> {this.state.low2} </td>
                                  <td> {this.state.lowDate2} </td>
                                  <td> {this.state.lowTime2} </td>
                                  <td> {this.state.lowHeight2} </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </details>
                        <p>{beach.notes}</p>

                        <div className="buttons is-normal is-centered pt-5">
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
                      </div>
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
                            ),
                        )}
                        <button className="button is-link mt-2" type="submit">
                          Save Changes
                        </button>
                      </form>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        <hr />

        <h2 className="title is-4 mt-5">Create New Beach</h2>
        <div className="columns is-centered">
          <div className="column is-one-third">
            <form className="is-two-thirds" onSubmit={this.handleCreate}>
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
        </div>
      </section>
    );
  }
}

export default App;
