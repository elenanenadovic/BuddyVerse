import axios from "axios";
import { Component } from "react";

class SingleGameView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      game: [],
      genre: "all",
      gameIDs: [],
      isAdded: false,
      users: [],
      profili: []
    }
  }

  QSetViewInParent = (obj) => {
    this.props.QViewFromChild(obj);
  };

  ma = (obj) => {
    this.props.ma(obj)
  }


  async componentDidMount() {
    try {

      let res = await axios.get("/games/" + this.props.data);
      console.log(res);
      let genre = this.props.type !== "all" ? res.data[0].type : "all"
      this.setState({ game: res.data, genre })


      let profileRes = await axios.get("/games/profil/" + this.props.pid);
      console.log(profileRes);
      let gameIDs = profileRes.data.map(game => game.g_id);
      let isAdded = gameIDs.includes(this.props.data);
      this.setState({ gameIDs, isAdded });


      let usersRes = await axios.get("/games/users/" + this.props.data);
      let users = usersRes.data;
      console.log(users);

      if (users.length === 0) {
        this.setState({ profili: [] });
        return;
      }

      let profiles = users.map(user =>
        axios.get("/profile/profil/" + user.p_id).catch(error => {
          console.error("Error")
          return null;
        })
      );

      let cekamprofil = await Promise.all(profiles);
      console.log(cekamprofil);
      let d = cekamprofil
      .filter(res => res)
        .map(res => res.data);
      console.log(d);
      this.setState({
        profili: d.flat()
      });

      console.log(this.state.profili);

    } catch (error) {
      console.error("Error OPET:", error);
    }
  }



  PostGame() {
    let pid = this.props.pid
    let gid = this.props.data
    //console.log(pid)
    //console.log(this.state.user);
    axios.post("/games/profilpost", {
      p_id: pid,
      g_id: gid
    }, { withCredentials: true })
      .then(res => {
        // console.log("Sent to server...");
        //console.log(res.data);
        this.setState({ isAdded: true });
      });
    this.componentDidMount()
  }


  RemoveGame() {
    let pid = this.props.pid
    let gid = this.props.data

    axios.post("/games/deletegameprofile", {
      p_id: pid,
      g_id: gid
    }, { withCredentials: true })
      .then(res => {
        // console.log("Sent to server...");
        //console.log(res.data);
        //console.log(this.props.data)
        this.QSetViewInParent({ page: "game", id: this.props.data })
        this.setState({ isAdded: false });

      });
    this.componentDidMount()
  }


  render() {
    // console.log("AHOJ")
    let isAdded = this.state.isAdded
    let m = this.state.delete
    let game = this.state.game
    //console.log(this.props.type)
    console.log(this.state.profili)

    let data2 = this.state.profili
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

            <br></br>
            <br></br>
            <p className="platforms-text">{data2.length} PLAYERS OF THE GAME</p>
            <div className="row row-cols-1 row-cols-md-6 g-4" >
              {data2.length > 0 ?
                data2.map(d => {
                  return (<div className="col" id="games-profile-body" key={d.id}>

                    <div className="card">
                      <div className="card-body" id="games-profile-body">
                        <img className="games-image" src={d.icon}></img>

                      </div>
                    </div>
                  </div>
                  )
                }) :
                <p className="no">

                </p>
              }
            </div>



          </div>

          : "Loading..."}


      </div>

    );
  }
}

export default SingleGameView;
