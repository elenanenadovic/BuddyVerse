import { Component } from "react";
import axios from "axios";

class AddGameView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      game: {}
    };
  }

  QPostNovica = () => {
    let idr = Math.floor(Math.random() * 10000);
    console.log(this.state.game.name)
    axios.post("http://88.200.63.148:4567/games",{
      id: idr,
      name: this.state.game.name,
      description: this.state.game.description,
      type: this.state.game.type,
      year: 2023
    })

    this.props.QViewFromChild({page:"games"})
   
  }

  QGetTextFromField = (e) => {
    this.setState(prevState => ({
      game: { ...prevState.game, [e.target.name]: e.target.value },
    }));
  };

  render() {
    console.log(this.state)
    return (
      <div className="card" style={{ margin: "10px" }}>
        <h3 style={{ margin: "10px" }}>Welcome user</h3>
        <div className="mb-3" style={{ margin: "10px" }}>
          <label className="form-label">Name</label>
          <input name = "name" onChange={(e) => this.QGetTextFromField(e)} type="text" className="form-control" placeholder="Name..." />
        </div>
        <div className="mb-3" style={{ margin: "10px" }}>
          <label className="form-label">Descirption</label>
          <input name = "description" onChange={(e) => this.QGetTextFromField(e)} type="text" className="form-control" placeholder="Description..." />
        </div>
        <div className="mb-3" style={{ margin: "10px" }}>
          <label className="form-label">Type</label>
          <textarea name = "type" onChange={(e) => this.QGetTextFromField(e)} className="form-control" rows="3"></textarea>
        </div>
        <div className="mb-3" style={{ margin: "10px" }}>
          <label className="form-label">Year</label>
          <textarea name = "year" onChange={(e) => this.QGetTextFromField(e)} className="form-control" rows="3"></textarea>
        </div>
        <button 
        onClick={()=>this.QPostNovica()}
        className="btn btn-primary bt" style={{ margin: "10px" }}>
          Send
        </button>
      </div>
    );
  }
}

export default AddGameView;
