import { Component } from "react";
import axios from "axios";

class GameView extends Component {

  constructor(props) {
    super(props)
    this.state = {
      games: []
    }
  }


  /*passing object to prop*/
  QSetViewInParent = (obj) => {
    this.props.QIDFromChild(obj);
  };


  /*rusn everytime component is mounted*/

  componentDidMount() {
    axios.get("http://88.200.63.148:4567/games")
      .then(res => {
        this.setState({
          games: res.data
        })
      })
  }

  render() {
    console.log(this.state.games)
    let data = this.state.games
    return (
      <div className="row row-cols-1 row-cols-md-3 g-4" style={{ margin: "10px" }}>
        {data.length > 0 ?
          data.map(d => {
            return (<div className="col">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{d.name}</h5>
                  <p className="card-text">{d.description}</p>
                </div>
                <button
                onClick = {() => this.QSetViewInParent({page: "game", id: d.id})} style={{ margin: "10px" }} className="btn btn-primary bt">Read more</button>
              </div>
            </div>
            )
          }) :
          "loading"}
      </div>
    );
  }
}

export default GameView;
