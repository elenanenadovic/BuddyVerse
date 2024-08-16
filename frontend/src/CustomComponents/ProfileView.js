import { Component } from "react";
import axios from "axios";

class ProfileView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: false,
      prof: [],
      platforms: [],
      games: []
    };
  }

  QGetTextFromField = (e) => {
    this.setState((prevState) => ({
      user: { ...prevState.user, [e.target.name]: e.target.value },
    }));
  };

  QSendUserToParent = () => {
    this.props.QUserFromChild(this.state.user);
  };

  QSetViewInParent = (obj) => {
    this.props.QIDFromChild(obj);
  };


  QSendUser2Parent = (obj) => {
    this.props.QProfileFromChild(obj);
  };



  async componentDidMount() {
    try {

      let res = await axios.get(`http://88.200.63.148:4567/profile/` + this.props.user[1]);
      this.setState({
        prof: res.data
      });
      console.log(res.data[0].id)
      this.QSendUser2Parent({ id: res.data[0].id });
      let res2 = await axios.get(`http://88.200.63.148:4567/platforms/` + this.props.id);
      //console.log(res.data);
      let platformIds = res2.data.map(d => d.pp_id);
      //console.log(platformIds)
      let res3 = platformIds.map(id =>
        axios.get(`http://88.200.63.148:4567/platforms/profil/` + id)
      );
      let platforms = await Promise.all(res3);

      
      let platformsData = platforms.map(response => response.data);
      this.setState({
        platforms: platformsData
      });


      let games = await axios.get(`http://88.200.63.148:4567/games/profil/` + this.props.id);
      console.log(games.data);

      let gameIDs = games.data.map(d => d.g_id);
      console.log(gameIDs)

      let gamesFinal = gameIDs.map(id =>
        axios.get(`http://88.200.63.148:4567/games/` + id)
      );
      let gameInfo = await Promise.all(gamesFinal);
      let d = gameInfo.map(response => response.data);
      this.setState({
        games: d
      });

     

    } catch (error) {
      console.error("Error:", error);
    }
  }




  render() {
    let data = this.state.platforms
    let data2 = this.state.games
    console.log(data2)
    return (
      <div className="profile-div">
        {this.state.prof.length > 0 && (
          <>
            <div className="card-profile">
              <div className="profile-left">
                <img className="img-icon" src="https://opgg-static.akamaized.net/meta/images/profile_icons/profileIcon4295.jpg?image=e_upscale,q_auto,f_webp,w_auto&v=1721451321478"></img>
              </div>
              <div className="profile-right">
                <h4 className="profile-id">UID: {this.state.prof[0]?.u_id}</h4>
                <h5 className="profile-title">{this.state.prof[0]?.name} {this.state.prof[0]?.surname} </h5>
                <h6 className="profile-nickname">{this.state.prof[0]?.nickname}</h6>
                <h7 className="profile-description">{this.state.prof[0]?.description}</h7>
              </div>
            </div>

            <div className="card-profile">
              <p className="platforms-text"> Your platforms:</p>

              {data.length > 0 ?
                data.map(d => {
                  return (

                    <a href={d[0].description} target="_blank"><img className="platform-icon" src={d[0].url}></img></a>
                  )
                }) :
                "There are currently no platforms sorry uwu"}
            </div>

            <div  id = "games-profile-body">
            <p className="platforms-text"> Your GAMES:</p>
              <div className="row row-cols-1 row-cols-md-4 g-4" >
                {data2.length > 0 ?
                  data2.map(d => {
                    return (<div className="col" id = "games-profile-body"  key={d.id}>
                      
                      <div className="card">
                        <div className="card-body" id = "games-profile-body">
                          <img className="games-image" src={d[0].url}></img>

                        </div>
                      </div>
                    </div>
                    )
                  }) :
                  "There are currently no games sorry uwu"}
              </div>

            </div>


          </>
        )}

        {this.state.prof.length === 0 && (
          <>


            INPUTRIAJ
          </>
        )}


      </div>
    );
  }
}

export default ProfileView;
