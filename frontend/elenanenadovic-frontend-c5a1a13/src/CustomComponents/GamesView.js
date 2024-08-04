import { Component } from "react";

class GameView extends Component {
  /*passing object to prop*/
  QSetViewInParent = (obj) => {
    this.props.QIDFromChild(obj);
  };

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