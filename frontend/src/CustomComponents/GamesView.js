import { Component } from "react";
import axios from "axios";

class GameView extends Component {



  /*passing object to prop*/
  QSetViewInParent = (obj) => {
    this.props.QIDFromChild(obj);
  };

  
  /*rusn everytime component is mounted*/
  componentDidMount(){
    axios.get("http://88.200.63.148:4567/games")
    .then(res=>{
      console.log(res)
    })

  }

  render() {
    return (
      <div
        className="row row-cols-1 row-cols-md-3 g-4"
        style={{ margin: "10px" }}
      >
        <div className="col">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">Slug</p>
            </div>
            <button
              onClick={() => this.QSetViewInParent({ page: "game", id: 1 })}
              style={{ margin: "10px" }}
              className="btn btn-primary bt"
            >
              Read more
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default GameView;
