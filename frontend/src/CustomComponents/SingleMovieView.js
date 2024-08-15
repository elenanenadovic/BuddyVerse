import axios from "axios";
import { Component } from "react";

class SingleMovieView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      movie: [],
      genre: "all"
    }
  }

  QSetViewInParent = (obj) => {
    this.props.QViewFromChild(obj);
  };

  componentDidMount() {
    axios.get("http://88.200.63.148:4567/movies/" + this.props.data)

      .then(res => {
        console.log(this.props.type)
        let genre = "all"
        if (this.props.type != "all") {
          console.log("ovde sam")
          console.log(res.data[0].genre)
          genre = res.data[0].genre
        }
        this.setState({
          movie: res.data,
          genre: genre
        })
      })

  }

  render() {
    let movie = this.state.movie
    console.log(this.props.type)
    return (
      <div id="single-game" className="card" >
        {movie.length > 0 ?
          <div>
            <div className="card-body">
              <img className="card-image" src={movie[0].url}></img>
              <h5 id="card-title" className="card-title">{movie[0].name}</h5>
              <h5 id="card-year" className="card-title">{movie[0].year}</h5>
              <p className="card-text">
                {movie[0].description}
              </p>
              <button id="card-button"
                onClick={() => this.QSetViewInParent({ page: "movies", type: this.state.genre })}
                className="btn btn-primary"
              >
                RETURN TO MOVIES
              </button>
            </div>
          </div>
          : "Loading..."}
      </div>

    );
  }
}

export default SingleMovieView;
