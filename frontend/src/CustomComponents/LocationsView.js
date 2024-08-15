import { Component } from "react";
import axios from "axios";

class LocationsView extends Component {

  constructor(props) {
    super(props)
    this.state = {
      locations: [],
      link: [],
      type: this.props.type
    }
  }


  QGetTextFromField = (e) => {
    this.setState((prevState) => ({
      link: { ...prevState.link, [e.target.name]: e.target.value },
    }));
  };


  QSetViewInParent = (obj) => {
    this.props.QIDFromChild(obj);
  };

  //zarez
  componentDidMount() {
    if (this.state.type == "all") {
      axios.get("http://88.200.63.148:4567/locations",)
        .then(res => {
          this.setState({
            locations: res.data
          })
        })
    }
    else {
      axios.get("http://88.200.63.148:4567/locations")
        .then(res => {
          let filteredGames = res.data.filter((element) => element.type === this.props.type)
          this.setState({
            locations: filteredGames,
            type: this.props.type
          });
        })
        .catch(error => {
          console.error("Error fetching games:", error);
        });
    }
  }


  setFilter(e) {
    axios.get("http://88.200.63.148:4567/locations")
      .then(res => {
        let filteredGames = res.data.filter((element) => element.type === e);
        console.log(filteredGames)

        if (e == "all") {
          filteredGames = res.data
        }

        this.setState({
          locations: filteredGames,
          type: e
        });
      })
      .catch(error => {
        console.error("Error fetching games:", error);
      });

  }

  render() {
    //console.log(this.state.games)
    let data = this.state.locations

    return (

      <div>

        <div className="select">
          <label for="type">TTYPE OF THE LOCATION:</label>

          <div className="select-left">
            <select value={this.state.type} name="type" onChange={e => this.setFilter(e.target.value)}>
              <option value="all">All</option>
              <option value="cafe">Cafe</option>
              <option value="cinema">Cinema</option>
              <option value="computer">Internet cafe</option>
            </select>
          </div>
        </div>


        <div className="games-body">

          <div className="row row-cols-1 row-cols-md-2 g-4" style={{ margin: "10px" }}>
            {data.length > 0 ?
              data.map(d => {
                return (<div className="col" key={d.id}>
                  <h5 className="card-title">{d.name}</h5>
                  <div className="card">
                    <div className="card-body">
                      <img onClick={() => this.QSetViewInParent({ page: "location", id: d.id, type: this.state.type })} className="games-image" src={d.url}></img>

                    </div>
                  </div>
                </div>
                )
              }) :
              "There are currently no location sorry"}
          </div>

        </div>

      </div>
    );
  }
}

export default LocationsView;