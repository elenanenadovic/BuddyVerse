import axios from "axios";
import { Component } from "react";

class SingleMovieView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      movie: [],
      genre: "all",
      application: {}
    }
  }

  QSetViewInParent = (obj) => {
    this.props.QViewFromChild(obj);
  };

  QGetTextFromField = (e) => {
    this.setState(prevState => ({
      application: { ...prevState.application, [e.target.name]: e.target.value },
    }));
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

  SendApplication() {
    if (this.phoneValidation(this.state.application.phone)) {
      let idr = Math.floor(Math.random() * 10000);
      console.log(this.state.application.phone)
      axios.post("http://88.200.63.148:4567/applications", {
        id: idr,
        m_id: this.props.data,
        text: this.state.application.text,
        phone: this.state.application.phone,
        p_id: this.props.pid
      }).then(res => {
        console.log("sent to server")
        this.QSetViewInParent({ page: "profile" })

      })
    } else {
      console.log("tu sam")
    }

  }


  phoneValidation(phone) {
    var phoneno = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
    if (phone.match(phoneno)) {
      return true;
    }
    else {
      alert(" pogresan broj");
      return false;
    }
  }


  render() {
    let movie = this.state.movie
    console.log(this.props.type)
    return (
      <div >
        {movie.length > 0 ?


          <div>
            <div className="singlegame-wrap">
              <div className="singlegame-left">
                <img className="singlegame-image" src={movie[0].url}></img>
              </div>

              {this.props.logged && this.props.pid?

                <div className="singlegame-right">

                  <p className="movie-title">{movie[0].name} ({movie[0].year})</p>
                  <p className="movie-genre"> Genre:</p>
                  <p className="movie-genre2"> {movie[0].genre}</p>
                  <p className="movie-descriptiontext">Short description:</p>
                  <p className="movie-description">{movie[0].description}</p>


                  <p className="movie-cinema">*We have this movie available at all of our partner cinemas. Before applying, please verify the dates and times in your local city schedule. Your application will be reviewed by the staff member, and you will receive a phone call with any additional information. Please include your phone number, the date and time, and the application.  </p>

                  <input onChange={(e) => this.QGetTextFromField(e)} name="phone"></input> <br></br><br></br>
                  <textarea onChange={(e) => this.QGetTextFromField(e)} name="text"></textarea> <br></br>
                  <button onClick={() => this.SendApplication()} className="movie-apply">APPLY</button>
                </div>

                :

                <div className="singlegame-right">

                  <p className="movie-title">{movie[0].name} ({movie[0].year})</p>
                  <p className="movie-genre"> Genre:</p>
                  <p className="movie-genre2"> {movie[0].genre}</p>
                  <p className="movie-descriptiontext">Short description:</p>
                  <p className="movie-description">{movie[0].description}</p>


                  <p className="movie-cinema">*To apply for a movie date, you must be logged in.</p>
                  <p className="movie-cinema">**We have this movie available at all of our partner cinemas. Before applying, please verify the dates and times in your local city schedule. Your application will be reviewed by the staff member, and you will receive a phone call with any additional information. Please include your phone number, the date and time, and the application.  </p>


                </div>
              }

            </div>





            <button id="singlegame-button"
              onClick={() => this.QSetViewInParent({ page: "movies", type: this.state.genre })}
              className="btn btn-primary"
            >
              RETURN TO MOVIES
            </button>
          </div>
          : "Loading..."}
      </div>

    );
  }
}

export default SingleMovieView;
