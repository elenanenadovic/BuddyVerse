import { Component } from "react";
import axios from "axios";

class AddGameView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      game: { id: 0 },
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
    }).then(res => {
      console.log("Sent to server...");
      this.props.QViewFromChild({ page: "games" })
    });
  }

  PostMovie = () => {
    let idr = Math.floor(Math.random() * 10000);
    console.log(this.state.game.name)
    axios.post("http://88.200.63.148:4567/movies", {
      id: idr,
      name: this.state.game.name,
      description: this.state.game.description,
      genre: this.state.game.genre,
      year: 2023,
      url: this.state.game.url,
      cinema: this.state.game.cinema
    }).then(res => {
      console.log("Sent to server...");
      this.props.QViewFromChild({ page: "movies" })
    });
  }

  PostLocation = () => {
    let idr = Math.floor(Math.random() * 10000);
    console.log(this.state.game.name)
    console.log(this.state.game.type)
    axios.post("http://88.200.63.148:4567/locations", {
      id: idr,
      name: this.state.game.name,
      description: this.state.game.description,
      type: this.state.game.type,
      url: this.state.game.url,
      address: this.state.game.address
    }).then(res => {
      console.log("Sent to server...");
      this.props.QViewFromChild({ page: "locations" })
    });
  }

  PostPlatform = () => {
    let idr = Math.floor(Math.random() * 10000);
    console.log(this.state.game.name)
    console.log(this.state.game.type)
    axios.post("http://88.200.63.148:4567/platforms", {
      id: idr,
      name: this.state.game.name,
      description: this.state.game.description,
      url: this.state.game.url,
    }).then(res => {
      console.log("Sent to server...");
      this.props.QViewFromChild({ page: "platforms" })   
    });
  }



  DeleteGame = () => {
    let gameID = this.state.game.id
    console.log(this.state.game.id)
    if (this.state.game.id == 0) {
      console.log("usao")
      this.setState({
        input: "redinput"
      })
    }
    else {
      axios.post("http://88.200.63.148:4567/games/delete", {
        id: gameID
      }).then(res => {
        console.log("Sent to server...");
        this.props.QViewFromChild({ page: "games" }) 
      });
    }
  }

  DeleteMovie = () => {
    let movieID = this.state.game.id
    console.log(this.state.game.id)
    if (this.state.game.id == 0) {
      console.log("usao")
      this.setState({
        input: "redinput"
      })
    }
    else {
      axios.post("http://88.200.63.148:4567/movies/delete", {
        id: movieID
      }).then(res => {
        console.log("Sent to server...");
        this.props.QViewFromChild({ page: "movies" })
      });
    }
  }

  DeleteLocation = () => {
    let locationID = this.state.game.id
    console.log(this.state.game.id)
    if (this.state.game.id == 0) {
      console.log("usao")
      this.setState({
        input: "redinput"
      })
    }
    else {
      axios.post("http://88.200.63.148:4567/locations/delete", {
        id: locationID
      }).then(res => {
        console.log("Sent to server...");
        this.props.QViewFromChild({ page: "locations" })
      });  
    }
  }

  DeletePlatform = () => {
    let platformID = this.state.game.id
    console.log(this.state.game.id)
    if (this.state.game.id == 0) {
      console.log("usao")
      this.setState({
        input: "redinput"
      })
    }
    else {
      axios.post("http://88.200.63.148:4567/platforms/delete", {
        id: platformID
      }).then(res => {
        console.log("Sent to server...");
        this.props.QViewFromChild({ page: "platforms" })  
      });
    }
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
          <h3 style={{ margin: "10px", color: "white", fontWeight: "800" }}>DELETE FUNCTION</h3>
          <div className="mb-3" style={{ margin: "10px" }}>
            <label className="form-label"> Be careful !!!!!!!!!!
            </label>
            <input id={this.state.input} name="id" onChange={(e) => this.QGetTextFromField(e)} type="text" className="form-control" placeholder="Please enter the id..." />
          </div>

          <button
            onClick={() => this.DeleteGame()}
            className="btn btn-primary bt" style={{ margin: "10px", width: "25%", backgroundColor: "black", border: "none", fontWeight: "800" }}>
            DELETE A GAME
          </button>

          <button
            onClick={() => this.DeleteMovie()}
            className="btn btn-primary bt" style={{ margin: "10px", width: "25%", backgroundColor: "black", border: "none", fontWeight: "800" }}>
            DELETE A MOVIE
          </button>

          <button
            onClick={() => this.DeleteLocation()}
            className="btn btn-primary bt" style={{ margin: "10px", width: "25%", backgroundColor: "black", border: "none", fontWeight: "800" }}>
            DELETE A LOCATION
          </button>

          <button
            onClick={() => this.DeletePlatform()}
            className="btn btn-primary bt" style={{ margin: "10px", width: "25%", backgroundColor: "black", border: "none", fontWeight: "800" }}>
            DELETE A PLATFORM
          </button>

        </div>




        <div className="card" style={{ margin: "10px", marginTop: "5%" }}>
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
            <textarea name="year" onChange={(e) => this.QGetTextFromField(e)} className="form-control" rows="1" placeholder="Year..."></textarea>
          </div>
          <button style={{ margin: "10px", width: "25%", backgroundColor: "black", border: "none", fontWeight: "800" }}
            onClick={() => this.PostGame()}
            className="btn btn-primary bt">
            SEND
          </button>
        </div>

        <div className="card" style={{ margin: "10px", marginTop: "5%" }}>
          <h3 style={{ margin: "10px", color: "white", fontWeight: "800" }}>ADD A MOVIE</h3>
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
            <label className="form-label">Genre</label>
            <textarea name="genre" onChange={(e) => this.QGetTextFromField(e)} className="form-control" rows="1" placeholder="comedy/action/animation/romantic/thriller"></textarea>
          </div>
          <div className="mb-3" style={{ margin: "10px" }}>
            <label className="form-label">Cinema</label>
            <textarea name="cinema" onChange={(e) => this.QGetTextFromField(e)} className="form-control" rows="1" placeholder="Cinema..."></textarea>
          </div>
          <div className="mb-3" style={{ margin: "10px" }}>
            <label className="form-label">Year</label>
            <textarea name="year" onChange={(e) => this.QGetTextFromField(e)} className="form-control" rows="1" placeholder="Year..."></textarea>
          </div>
          <button style={{ margin: "10px", width: "25%", backgroundColor: "black", border: "none", fontWeight: "800" }}
            onClick={() => this.PostMovie()}
            className="btn btn-primary bt">
            SEND
          </button>
        </div>

        <div className="card" style={{ margin: "10px", marginTop: "5%" }}>
          <h3 style={{ margin: "10px", color: "white", fontWeight: "800" }}>ADD A LOCATION</h3>
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
            <textarea name="type" onChange={(e) => this.QGetTextFromField(e)} className="form-control" rows="1" placeholder="comedy/action/animation/romantic/thriller"></textarea>
          </div>
          <div className="mb-3" style={{ margin: "10px" }}>
            <label className="form-label">Address</label>
            <textarea name="address" onChange={(e) => this.QGetTextFromField(e)} className="form-control" rows="1" placeholder="Address..."></textarea>
          </div>

          <button style={{ margin: "10px", width: "25%", backgroundColor: "black", border: "none", fontWeight: "800" }}
            onClick={() => this.PostLocation()}
            className="btn btn-primary bt">
            SEND
          </button>
        </div>

        <div className="card" style={{ margin: "10px", marginTop: "5%" }}>
          <h3 style={{ margin: "10px", color: "white", fontWeight: "800" }}>ADD A PLATFORM</h3>
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
        

          <button style={{ margin: "10px", width: "25%", backgroundColor: "black", border: "none", fontWeight: "800" }}
            onClick={() => this.PostPlatform()}
            className="btn btn-primary bt">
            SEND
          </button>
        </div>
      </div>
    );
  }
}

export default AddGameView;
