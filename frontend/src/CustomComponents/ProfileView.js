import { Component } from "react";
import axios from "axios";

class ProfileView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: false,
      prof: [],
      platforms: [],
      games: [],
      platformaAdd: "Discord",
      platformID: 1,
      sveplatforme: [],
      user: {},
      sveplatforme2: [],
      applications: [],
      movies: []
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

      let res = await axios.get(`/profile/` + this.props.user[1]);
      this.setState({
        prof: res.data
      });



      ///console.log(res.data[0].id)
      this.QSendUser2Parent({ id: res.data[0].id });
      let res2 = await axios.get(`/platforms/` + this.props.id)

      //console.log("ovde");
      //console.log(res.data);
      let platformIds = res2.data.map(d => d.pp_id);
      //console.log(platformIds)
      let res3 = platformIds.map(id =>
        axios.get(`/platforms/profil/` + id)
      );
      let platforms = await Promise.all(res3);


      let platformsData = platforms.map(response => response.data);
      this.setState({
        platforms: platformsData
      });

      //trebaju i games i platforms ali platforms dodaj posle addovanje na profil
      let games = await axios.get(`/games/profil/` + this.props.id)//props id
      /// console.log(games.data);

      let gameIDs = games.data.map(d => d.g_id);
      /// console.log(gameIDs)

      let gamesFinal = gameIDs.map(id =>
        axios.get(`/games/` + id)
      );
      let gameInfo = await Promise.all(gamesFinal);
      let d = gameInfo.map(response => response.data);
      this.setState({
        games: d
      });

      let platformss = await axios.get(`/platforms`);
      this.setState({
        sveplatforme: platformss.data
      })
      //console.log(this.state.sveplatforme.data)

      let sveplatforme = await axios.get(`/platforms/` + this.props.id)
      console.log(sveplatforme.data)
      this.setState({
        sveplatforme2: sveplatforme.data
      })

      //vucem sve aplikacije
      let applications = await axios.get(`/applications/` + this.props.id)
      this.setState({
        applications: applications.data
      })


      //svi filmovi iz app
      let moviesids = applications.data.map(d => d.m_id);
      //console.log(moviesids)


      let moviespictures = moviesids.map(id =>
        axios.get(`/movies/` + id)
      );
      let moviespictures2 = await Promise.all(moviespictures);


      let moviespictures3 = moviespictures2.map(response => response.data);
      this.setState({
        movies: moviespictures3.flat()
      });

      console.log(this.state.movies)
      console.log(this.state.applications)
      //console.log(this.state.sveplatforme2.data)



    } catch (error) {
      console.error("Error:", error);
    }
  }


  selectPlatform = (val) => {
    console.log(val)
    this.setState({
      platformaAdd: val
    })
    axios.get(`/id/` + val)
      .then(res => {
        //console.log(res.data)
        this.setState({
          platformID: res.data[0].id
        })
        this.componentDidMount()
      })
      .catch(error => {
        console.error("Error getting platforms:", error);
      });


    //console.log(this.state.platformaAdd)
  }


  addPlatform = () => {
    let data3 = this.state.platforms.flat()
    let d = this.state.sveplatforme

    let data4 = this.platformsNot(data3, d)
    let d4len = data4.length
    let m = this.state.platformID
    console.log(data4)

    //console.log(data4.findIndex(data4 => data4.id == m))
    if (data4.length == 1) {

      m = data4[0].id
    }

    let idr = Math.floor(Math.random() * 10000);
    axios.post("/platforms/profile", {
      id: idr,
      p_id: this.props.id,
      nick: this.state.user.nick,
      pp_id: m

    }).then(res => {
      if (d4len != 1) {
        this.setState({
          platformID: data4[0]?.id
        })
      }
      else {
        this.setState({
          platformID: 0
        })
      }
      this.componentDidMount()
    });
  }


  platformsNot(platformenaprofilu, sveplatforme) {
    let ids = new Set(platformenaprofilu.map(platform => platform.id))
    return sveplatforme.filter(platforma => !ids.has(platforma.id))
  }


  Logout = () => {
    this.props.login()
    this.props.QProfileFromChild({ id: 0 })
    this.QSetViewInParent({ page: "home" })
  }



  PostProfile = () => {
    let idr = Math.floor(Math.random() * 10000);
    console.log(this.props.user[1])
    axios.post("/profile/", {
      id: idr,
      age: this.state.user.age,
      surname: this.state.user.surname,
      name: this.state.user.name,
      city: this.state.user.city,
      description: this.state.user.description,
      icon: this.state.user.icon,
      nickname: this.state.user.nickname,
      u_id: this.props.user[1]
    }).then(res => {
      this.componentDidMount()
    });

  }





  render() {

    let applications = this.state.applications
    let movies = this.state.movies

    let applicationsMovies = applications.map((application, index) => {
      let url = this.state.movies[index] || {}
      return {
        ...application,
        url: url.url
      }
    })

    console.log(applicationsMovies)
    let data = this.state.platforms
    let data3 = this.state.platforms.flat()
    let d = this.state.sveplatforme
    let data2 = this.state.games

    let data4 = this.platformsNot(data3, d)

    console.log(this.state.sveplatforme2)

    let combined = data.flat().map((comment, index) => {
      let nickname = this.state.sveplatforme2[index] || {}
      return {
        ...comment,
        nick: nickname.nick
      }
    });


    console.log(combined)
    console.log(this.state.user[1])
    return (
      <div className="profile-div">
        {this.state.prof.length > 0 && (
          <>
            <div className="card-profile">
              <div className="profile-left">
                <img className="img-icon" src={this.state.prof[0]?.icon}></img>
              </div>
              <div className="profile-right">
                <h4 className="profile-id">UID: {this.state.prof[0]?.u_id}</h4>
                <h5 className="profile-title">{this.state.prof[0]?.name} {this.state.prof[0]?.surname} </h5>
                <h6 className="profile-nickname">{this.state.prof[0]?.nickname}</h6>
                <h7 className="profile-description">{this.state.prof[0]?.description}</h7>
              </div>
            </div>

            {this.props.user[1] != 73489 ? <div>
            <p className="platforms-text"> Your platforms:</p>
            <text className="platforms-additionaltext">*Each of your platforms has its "username/nickname" stated below. You consent to sharing your username by adding the platforms to your profile.</text>
            </div> : <div></div> }
            
            
            
            <div className="row row-cols-1 row-cols-md-6 g-4" style={{ margin: "10px" }}>


              {combined.length > 0 ?
                combined.map(d => {
                  return (

                    <div>
                      <text style={{ color: "white", fontStyle: "italic", marginRight: "1%" }}>{d.nick}</text>
                      <a href={d.description} target="_blank"><img className="platform-icon" src={d.url}></img></a>
                    </div>
                  )
                }) :
                <p className="no">
                  THERE ARE CURRENTLY NO PLATFORMS ADDED.
                </p>}


              {data4.length > 0 ?
                <div>
                  <select value={this.state.platformaAdd} onChange={e => this.selectPlatform(e.target.value)} >
                    {data4.map((e) => <option value={e.name}>{e.name}</option>)}
                  </select><input name="nick" onChange={(e) => this.QGetTextFromField(e)} style={{ width: "50%", marginLeft: "5%" }}></input>
                  <button style={{ width: "40%", borderRadius: "7px", fontWeight: "700", color: "white", backgroundColor: "black", marginLeft: "1%", fontSize: "10px" }} onClick={this.addPlatform}> ADD PLATFORM</button>
                </div> :

                <div></div>

              }


            </div>

            {this.props.user[1] != 73489 ?
              <div id="games-profile-body">
                <p className="platforms-text"> Your GAMES:</p>
                <div className="row row-cols-1 row-cols-md-4 g-4" >
                  {data2.length > 0 ?
                    data2.map(d => {
                      return (<div className="col" id="games-profile-body" key={d.id}>

                        <div className="card">
                          <div className="card-body" id="games-profile-body">
                            <img className="games-image" src={d[0].url}></img>

                          </div>
                        </div>
                      </div>
                      )
                    }) :
                    <p className="no">
                      There are currently no games added.
                    </p>
                  }
                </div>
              </div> :
              <div >
              </div>
            }

            {this.props.user[1] != 73489 ?
              <div id="games-profile-body">
              <p className="platforms-text"> Your open movie applications:</p>
              <div className="row row-cols-1 row-cols-md-6 g-4" >
                {applicationsMovies.length > 0 ?
                  applicationsMovies.map(d => {
                    return (<div className="col" id="games-profile-body" key={d.id}>

                      <div className="card">
                        <div className="card-body" id="games-profile-body">
                          <img className="games-image" src={d.url}></img>

                        </div>
                      </div>
                    </div>
                    )
                  }) :
                  <p className="no">
                    YOU HAVE NOT APPLIED TO ANY MOVIE.
                  </p>}
              </div>

            </div>:
              <div >
              </div>
            }


            

            <div>
              <button className="byelehends" onClick={() => this.Logout()}>LOGOUT</button>
            </div>



          </>
        )}

        {this.state.prof.length === 0 && (
          <>
            <div>


              <div>
                <h3 style={{ margin: "10px", color: "white", fontWeight: "800" }}>Want to create a profile?</h3>
                <h4 style={{ margin: "10px", color: "white", fontWeight: "600", fontSize: "15px" }}>Creating a profile unlocks various activites.</h4><br></br><br></br>
                <div className="mb-3" style={{ margin: "10px" }}>
                  <label className="form-label">Name</label>
                  <input name="name" onChange={(e) => this.QGetTextFromField(e)} type="text" className="form-control" placeholder="Name..." />
                </div>
                <div className="mb-3" style={{ margin: "10px" }}>
                  <label className="form-label">Surname</label>
                  <input name="surname" onChange={(e) => this.QGetTextFromField(e)} type="text" className="form-control" placeholder="Surname..." />
                </div>
                <div className="mb-3" style={{ margin: "10px" }}>
                  <label className="form-label">City</label>
                  <input name="city" onChange={(e) => this.QGetTextFromField(e)} type="text" className="form-control" placeholder="City..." />
                </div>
                <div className="mb-3" style={{ margin: "10px" }}>
                  <label className="form-label">About you</label>
                  <input name="description" onChange={(e) => this.QGetTextFromField(e)} type="text" className="form-control" placeholder="About you..." />
                </div>

                <div className="mb-3" style={{ margin: "10px" }}>
                  <label className="form-label">Icon</label>
                  <input name="icon" onChange={(e) => this.QGetTextFromField(e)} type="text" className="form-control" placeholder="Icon 400x400..." />
                </div>
                <div className="mb-3" style={{ margin: "10px" }}>
                  <label className="form-label">Nickname</label>
                  <input name="nickname" onChange={(e) => this.QGetTextFromField(e)} type="text" className="form-control" placeholder="Nickname..." />
                </div>
                <div className="mb-3" style={{ margin: "10px" }}>
                  <label className="form-label">Year</label>
                  <textarea name="age" onChange={(e) => this.QGetTextFromField(e)} className="form-control" rows="1" placeholder="Year..."></textarea>
                </div>
                <button style={{ margin: "10px", width: "25%", backgroundColor: "black", border: "none", fontWeight: "800" }}
                  onClick={() => this.PostProfile()}
                  className="btn btn-primary bt">
                  SEND
                </button>
              </div>

            </div>
          </>
        )}


      </div>
    );
  }
}

export default ProfileView;
