import { Component } from "react";
import axios from "axios";

class GameView extends Component {

  constructor(props) {
    super(props)
    this.state = {
      games: [],
      link: [],
      type: this.props.type
    }
  }


  componentDidMount() {
    if (this.state.type == "all") {
      axios.get("http://88.200.63.148:4567/games",)
        .then(res => {
          this.setState({
            games: res.data
          })
        })
    }
    else{
      axios.get("http://88.200.63.148:4567/games")
      .then(res => {
        let filteredGames =  res.data.filter((element) => element.type === this.props.type)
        this.setState({
          games: filteredGames,
          type: this.props.type
        });
      })
      .catch(error => {
        console.error("Error getting games:", error);
      });
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


  setFilter(e) {
    axios.get("http://88.200.63.148:4567/games")
      .then(res => {

        let filteredGames =  res.data.filter((element) => element.type === e);
        //console.log(e)
        
        if(e == "all"){
          filteredGames =  res.data
        }

        this.setState({
          games: filteredGames,
          type: e
        });
      })
      .catch(error => {
        console.error("Error:", error);
      });
  }

  setFilter2(e){
    this.setState({
      games: this.state.games.reverse()
    })
  }

  render() {

    let data = this.state.games
    console.log(this.state.type)
    return (

      <div>
        <div className="select">
          <label for="type">TYPE OF THE GAME:</label>

          <div className="select-left">
            <select value={this.state.type} name="type" onChange={e => this.setFilter(e.target.value)}>
            <option value="all">All</option>
              <option value="action">Action</option>
              <option value="adventure">Adventure</option>
              <option value="moba">MOBA</option>
              <option value="racing">Racing</option>
              <option value="shooter">Shooter</option>
              <option value="gacha">Gacha</option>
              <option value="other">Mobile</option>
            </select>
          </div>


          <label for="date">DATE ADDED:</label>
          <div className = "select-right">
            

            <select name="date" onChange={e => this.setFilter2(e.target.value)}>
              <option value="newest">Most recently added</option>
              <option value="oldest">Least recently added</option>
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
                      <img onClick={() => this.QSetViewInParent({ page: "game", id: d.id, type: this.state.type})} className="games-image" src={d.url}></img>

                    </div>
                  </div>
                </div>
                )
              }) :
              "There are currently no games sorry."}
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

export default GameView;
