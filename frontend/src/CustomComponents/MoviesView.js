import { Component } from "react";
import axios from "axios";

class MoviesView extends Component {

  constructor(props) {
    super(props)
    this.state = {
      movies: [],
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
      axios.get("/movies",)
        .then(res => {
          this.setState({
            movies: res.data
          })
        })
    }
    else{
      axios.get("/movies")
      .then(res => {
        let filteredGames =  res.data.filter((element) => element.genre === this.props.type)
        this.setState({
          movies: filteredGames,
          type: this.props.type
        });
      })
      .catch(error => {
        console.error("Error fetching movies:", error);
      });
    }
  }


  setFilter(e) {
    axios.get("/movies")
      .then(res => {
        
        let filteredGames =  res.data.filter((element) => element.genre === e);
        console.log(filteredGames)
        
        if(e == "all"){
          filteredGames =  res.data
        }

        this.setState({
          movies: filteredGames,
          type: e
        });
      })
      .catch(error => {
        console.error("Error fetching movies:", error);
      });

    
  }


  render() {
    //console.log(this.state.games)
    let data = this.state.movies
    console.log(this.state.type)
    return (


      <div>

        <div className="select">
          <label for="type">TYPE OF THE MOVIES:</label>

          <div className="select-left">
            <select value={this.state.type} name="type" onChange={e => this.setFilter(e.target.value)}>
              <option value="all">All</option>
              <option value="action">Action</option>
              <option value="thriller">Thrillers</option>
              <option value="romantic">Romance</option>
              <option value="superhero">Superhero</option>
              <option value="comedy">Comedy</option>
              <option value="animation">Animation</option>
            </select>
          </div>
        </div>

        <div className="games-body">

          <div className="row row-cols-1 row-cols-md-6 g-4" style={{ margin: "10px" }}>
            {data.length > 0 ?
              data.map(d => {
                return (<div className="col" key={d.id}>
                  
                  <div className="card">
                    <div className="card-body">
                      <img onClick={() => this.QSetViewInParent({ page: "movie", id: d.id, type: this.state.type })} className="games-image" src={d.url}></img>

                    </div>
                  </div>
                </div>
                )
              }) :
              "There are currently no movies sorry. "}
          </div>

        </div>
        <footer className="footer-section">
          <div className="container">
            <div className="footer-cta pt-5 pb-5">
              <div className="row">
                <div className="col-xl-4 col-md-4 mb-30">
                  <h4 className="footert">Our sponsor:</h4>
                  <div className="footer-logo">
                    <a href="index.html"><img src="https://www.stark.rs/img/stark-beli-logo.webp" class="img-fluid" alt="logo"></img></a>
                  </div>


                </div>

                <div className="col-xl-4 col-md-4 mb-30">
                  <h4 className="footert">Call us:</h4>
                  <span className="footerp">+381 958 7865</span>
                </div>


                <div className="col-xl-4 col-md-4 mb-30">
                  <h4 className="footert">Mail us:</h4>
                  <span className="footerp">buddyverse@info.com</span>
                </div>
              </div>
            </div>
          </div>

          <div class="copyright-area">
            <div class="container">

              <div class="row">
                <div class="col-xl-6 col-lg-6 text-center text-lg-center ">
                  <div class="copyright-text">
                    <p>Copyright &copy; 2024, All Right Reserved </p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </footer>
      </div>
    );
  }
}

export default MoviesView;
