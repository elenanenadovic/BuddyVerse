import axios from "axios";
import { Component } from "react";

class SingleGameView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      game: [],
      genre: "all",
      gameIDs: [],
      isAdded: false
    }
  }

  QSetViewInParent = (obj) => {
    this.props.QViewFromChild(obj);
  };

  ma = (obj) =>{
    this.props.ma(obj)
  }


  componentDidMount() {
    axios.get("http://88.200.63.148:4567/games/" + this.props.data)

      .then(res => {
        console.log(this.props.type)
        let genre = "all"
        if (this.props.type != "all") {
          console.log("ovde sam")
          console.log(res.data[0].type)
          genre = res.data[0].type
        }
        this.setState({
          game: res.data,
          genre: genre
        })

        return axios.get("http://88.200.63.148:4567/games/profil/" + this.props.pid);
      })
      .then(res => {
        let gameIDs = res.data.map(game => game.g_id);
        let isAdded = gameIDs.includes(this.props.data);
        this.setState({ gameIDs, isAdded });
        console.log(this.state.gameIDs)
      })


  }

  PostGame() {
    let pid = this.props.pid
    let gid = this.props.data
    console.log(pid)
    //console.log(this.state.user);
    axios.post("http://88.200.63.148:4567/games/profilpost", {
      p_id: pid,
      g_id: gid
    }, { withCredentials: true })
      .then(res => {
        console.log("Sent to server...");
        console.log(res.data);
        this.setState({ isAdded: true });
      });
  }


  RemoveGame(){
    let pid = this.props.pid
    let gid = this.props.data

    axios.post("http://88.200.63.148:4567/games/deletegameprofile", {
      p_id: pid,
      g_id: gid
    }, { withCredentials: true })
      .then(res => {
        console.log("Sent to server...");
        console.log(res.data);
        console.log(this.props.data)
        this.QSetViewInParent({page: "game", id: this.props.data })
        this.setState({ isAdded: false });

      });
  }

  
  render() {
    let isAdded = this.state.isAdded
    let m = this.state.delete
    let game = this.state.game
    console.log(this.props.type)


    return (

      <div>
        {game.length > 0 ?
          <div>
            <p className="singlegame-title">{game[0].name}</p>


            <div className="singlegame-wrap">
              <div className="singlegame-left">
                <img className="singlegame-image" src={game[0].url}></img>
              </div>

              <div className="singlegame-right">


                <p className="singlegame-description">{game[0].description}</p>
                {this.props.logged && this.props.pid != 0 && (
                  <>
                    {!isAdded ? (
                      <button onClick={() => this.PostGame()} className="singlegame-add">+</button>
                    ) : (
                      <button onClick={() => this.RemoveGame()} className="singlegame-add">-</button>
                    )}
                  </>
                )}

              </div>

            </div>





            <button id="singlegame-button"
              onClick={() => this.QSetViewInParent({ page: "games", type: this.state.genre })}
              className="btn btn-primary"
            >
              RETURN TO GAMES
            </button>
          </div>

          : "Loading..."}

          
      </div>

    );
  }
}

export default SingleGameView;
