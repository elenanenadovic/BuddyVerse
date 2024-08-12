import axios from "axios";
import { Component } from "react";

class SingleGameView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      game: []
    }
  }

  QSetViewInParent = (obj) => {
    this.props.QViewFromChild(obj);
  };

  componentDidMount() {
    axios.get("http://88.200.63.148:4567/games/" + this.props.data)
      .then(res => {
        this.setState({
          game: res.data
        })
      })

  }

  render() {
    let game = this.state.game
  
    return (
      <div id = "single-game" className="card" >
        {game.length > 0 ?
          <div>
            <div className="card-body">
              <img className = "card-image" src = {game[0].url}></img>
              <h5 id = "card-title" className="card-title">{game[0].name}</h5>
              <h5 id = "card-year" className="card-title">{game[0].year}</h5>
              <p className="card-text">
                {game[0].description}
              </p>
              <button id = "card-button"
                onClick={() => this.QSetViewInParent({ page: "games" })}
                className="btn btn-primary"
              >
                RETURN TO GAMES
              </button>
            </div>
          </div>
          : "Loading..."}
      </div>

    );
  }
}

export default SingleGameView;
