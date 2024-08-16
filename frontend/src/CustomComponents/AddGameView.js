import { Component } from "react";
import axios from "axios";

class AddGameView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      game: {id : 0},
      input: ""
    };
    
  }
  
  PostGame = () => {
    let idr = Math.floor(Math.random() * 10000);
    console.log(this.state.game.name)
    axios.post("http://88.200.63.148:4567/games", {
      id: idr,
      name: this.state.game.name,
      description: this.state.game.description,
      type: this.state.game.type,
      year: 2023,
      url: this.state.game.url
    })

    this.props.QViewFromChild({ page: "games" })

  }

  DeleteGame = () =>{
    let gameID = this.state.game.id
    console.log(this.state.game.id)
    if(this.state.game.id == 0){
      console.log("usao")
      this.setState({
        input: "redinput"
      })
    }
    axios.post("http://88.200.63.148:4567/games/delete", {
      id: gameID
    })

    this.props.QViewFromChild({ page: "games" })
  }

  QGetTextFromField = (e) => {
    this.setState(prevState => ({
      game: { ...prevState.game, [e.target.name]: e.target.value },
    }));
  };

  render() {
    console.log(this.state)
    return (
      <div>

        
        <div className="card" style={{ margin: "10px" }}>
          <h3 style={{ margin: "10px", color: "white", fontWeight: "800" }}>DELETE A GAME:</h3>
          <div className="mb-3" style={{ margin: "10px" }}>
            <label  className="form-label">GAME ID</label>
            <input id = {this.state.input} name="id" onChange={(e) => this.QGetTextFromField(e)} type="text" className="form-control" placeholder="Please enter the game id..." />
          </div>

          <button
            onClick={() => this.DeleteGame()}
            className="btn btn-primary bt" style={{ margin: "10px", width: "25%", backgroundColor: "black", border: "none", fontWeight : "800" }}>
            DELETE
          </button>
        </div>


        <div className="card" style={{ margin: "10px", marginTop: "5%"}}>
          <h3 style={{ margin: "10px", color: "white", fontWeight: "800" }}>ADD A GAME</h3>
          <div className="mb-3" style={{ margin: "10px" }}>
            <label className="form-label">Name</label>
            <input name="name" onChange={(e) => this.QGetTextFromField(e)} type="text" className="form-control" placeholder="Name..." />
          </div>
          <div className="mb-3" style={{ margin: "10px" }}>
            <label className="form-label">Descirption</label>
            <input name="description" onChange={(e) => this.QGetTextFromField(e)} type="text" className="form-control" placeholder="Short description..." />
          </div>
          <div className="mb-3" style={{ margin: "10px" }}>
            <label className="form-label">Url</label>
            <input name="url" onChange={(e) => this.QGetTextFromField(e)} type="text" className="form-control" placeholder="Url 1920x1080..." />
          </div>
          <div className="mb-3" style={{ margin: "10px" }}>
            <label className="form-label">Type</label>
            <textarea name="type" onChange={(e) => this.QGetTextFromField(e)} className="form-control" rows="1" placeholder="action/adventure/gacha/moba/racing/shooter/mobile"></textarea>
          </div>
          <div className="mb-3" style={{ margin: "10px" }}>
            <label className="form-label">Year</label>
            <textarea name="year" onChange={(e) => this.QGetTextFromField(e)} className="form-control" rows="1" placeholder ="Year..."></textarea>
          </div>
          <button style={{ margin: "10px", width: "25%", backgroundColor: "black", border: "none", fontWeight : "800" }}
            onClick={() => this.PostGame()}
            className="btn btn-primary bt">
            SEND
          </button>
        </div>


      </div>
    );
  }
}

export default AddGameView;
