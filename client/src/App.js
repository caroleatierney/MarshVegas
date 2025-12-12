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
  getTides = (event) => {
    // console.log(this.state.lat);
    // console.log(this.state.long);

    fetch(
      "https://tides.p.rapidapi.com/tides?latitude=" +
        this.state.lat +
        "&longitude=" +
        this.state.long,
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "tides.p.rapidapi.com",
          "x-rapidapi-key":
            "72f2d4d192mshd7feaecf8ffd802p140faajsna045792ab384",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (!data || !data.extremes || data.extremes.length === 0) {
          console.error("No tide data returned:", data);
          return;
        }

        // Make sure we don’t try to read more tides than exist
        const count = Math.min(4, data.extremes.length);
        const date = [];
        const time = [];
        const height = [];

        for (let i = 0; i < count; i++) {
          const entry = data.extremes[i];
          if (!entry) continue;

          let extremeNewDate = new Date(entry.datetime);
          let extremeTime = extremeNewDate.toLocaleTimeString();
          let extremeDate = extremeNewDate.toLocaleDateString();
          let extremeHeight = entry.height;
          let extremeRoundedHeight = Math.round(extremeHeight * 100) / 100;

          date[i] = extremeDate;
          time[i] = extremeTime;
          height[i] = extremeRoundedHeight;
        }

        this.setState({
          high1: data.extremes[0]?.state || "",
          highDate1: date[0] || "",
          highTime1: time[0] || "",
          highHeight1: height[0] || "",

          low1: data.extremes[1]?.state || "",
          lowDate1: date[1] || "",
          lowTime1: time[1] || "",
          lowHeight1: height[1] || "",

          high2: data.extremes[2]?.state || "",
          highDate2: date[2] || "",
          highTime2: time[2] || "",
          highHeight2: height[2] || "",

          low2: data.extremes[3]?.state || "",
          lowDate2: date[3] || "",
          lowTime2: time[3] || "",
          lowHeight2: height[3] || "",
        });
      });

        // console.log(data);
        // console.log(data.extremes);
        // console.log(data.extremes[0].datetime);

  
          // console.log(i);
          // console.log(extremeNewDate);
          // console.log(extremeDate);
          // console.log(extremeTime);
          // console.log(extremeRoundedHeight);



  
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

                  <div className="list-col">
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
                              this.getTides
                            );
                          }}
                        >
                          tides
                     </summary>

                    <div>
                        <table border="1">
                          <thead>
                            <tr key={beach.id}>
                              <th>Extreme</th>
                              <th>Date</th>
                              <th>Time</th>
                              <th>Height</th>
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
                        <p>Not suitable for navigation purposes</p>
                      </div>
                    </details>
                  </div>

                  <p>{beach.notes}</p>

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
