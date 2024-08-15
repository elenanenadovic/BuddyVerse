import axios from "axios";
import { Component } from "react";

class SingleLocationView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      location: [],
      genre: "all"
    }
  }

  QSetViewInParent = (obj) => {
    this.props.QViewFromChild(obj);
  };

  componentDidMount() {
    axios.get("http://88.200.63.148:4567/locations/" + this.props.data)

      .then(res => {
        console.log(this.props.type)
        let genre = "all"
        if (this.props.type != "all") {
          console.log("ovde sam")
          console.log(res.data[0].type)
          genre = res.data[0].type
        }
        this.setState({
          location: res.data,
          genre: genre
        })
      })

  }

  render() {
    let location = this.state.location
  
    return (
      <div id = "single-game" className="card" >
        {location.length > 0 ?
          <div>
            <div className="card-body">
              <img className = "card-image" src = {location[0].url}></img>
              <h5 id = "card-title" className="card-title">{location[0].name}</h5>
              <h5 id = "card-year" className="card-title">{location[0].description}</h5>
              <p className="card-text">
                {location[0].description}
              </p>
              <button id = "card-button"
                onClick={() => this.QSetViewInParent({ page: "locations", type: this.state.genre })}
                className="btn btn-primary"
              >
                RETURN TO LOCATIONS
              </button>
            </div>
          </div>
          : "Loading..."}
      </div>

    );
  }
}

export default SingleLocationView;
