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
      <div className="card" style={{ margin: "10px" }}>
        {game.length > 0 ?
          <div>
            <h5 className="card-header">{game[0].name}</h5>
            <div className="card-body">
              <h5 className="card-title">{game[0].year}</h5>
              <p className="card-text">
                {game[0].description}
              </p>
              <button
                onClick={() => this.QSetViewInParent({ page: "games" })}
                className="btn btn-primary"
              >
                Return news
              </button>
            </div>
          </div>
          : "Loading..."}
      </div>

    );
  }
}

export default SingleGameView;
