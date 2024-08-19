import React from "react";
import axios from "axios";
import './style.css';

//imported routes
import GamesView from "./CustomComponents/GamesView";
import HomeView from "./CustomComponents/HomeView";
import LoginView from "./CustomComponents/LoginView";
import SignupView from "./CustomComponents/SignupView";
import SingleGameView from "./CustomComponents/SingleGameView";
import AboutView from "./CustomComponents/AboutView";
import AddGameView from "./CustomComponents/AddGameView";
import MoviesView from "./CustomComponents/MoviesView"
import SingleMovieView from "./CustomComponents/SingleMovieView";
import SingleLocationView from "./CustomComponents/SingleLocationView";
import LocationsView from "./CustomComponents/LocationsView";
import PlatformsView from "./CustomComponents/PlatformsView";
import ProfileView from "./CustomComponents/ProfileView";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentPage: "home",
      gameID: 0,
      movieID: 0,
      locationID: 0,
      userStatus: {
        logged: false
      },
      type: "all",
      profile: false,
      profileID: 0,
      hasprofile: 0
    };
  }

  QSetView = (obj) => {
    this.setState({
      currentPage: obj.page,
      gameID: obj.id || 0,
      movieID: obj.id || 0,
      locationID: obj.id || 0,
      type: obj.type || "all"
    });
  };

  componentDidMount() {
    axios.get("http://88.200.63.148:4567/user/login")
      .then(res => {
        console.log(res)
      })


  }
  QGetView = (state) => {
    let page = state.currentPage;

    switch (page) {
      case "home":
        return <HomeView changeview = {this.QSetView} />;
      case "about":
        return <AboutView />;
      case "games":
        return <GamesView QIDFromChild={this.QSetView} type={this.state.type} />;
      case "movies":
        return <MoviesView QIDFromChild={this.QSetView} type={this.state.type} />;
      case "locations":
        return <LocationsView QIDFromChild={this.QSetView} type={this.state.type} />;
      case "addgame":
        return state.userStatus.logged ? <AddGameView QViewFromChild={this.QSetView} /> : "Loading";
      case "signup":
        return <SignupView QUserFromChild={this.QHandleUserLog} changeview = {this.QSetView} />;
      case "login":
        return <LoginView QUserFromChild={this.QHandleUserLog} />;
      case "game":
        return <SingleGameView ma = {this.QHandleProfile} pid = {this.state.profileID} logged = {this.state.userStatus.logged} QViewFromChild={this.QSetView} data={this.state.gameID} type={this.state.type} />;
      case "movie":
        return <SingleMovieView logged =  {this.state.userStatus.logged} pid = {this.state.profileID} QViewFromChild={this.QSetView} data={this.state.movieID} type={this.state.type} />;
      case "location":
        return <SingleLocationView  p_id = {this.state.profileID} l_id = {this.state.locationID} logged = {this.state.userStatus.logged} QViewFromChild={this.QSetView} data={this.state.locationID} type={this.state.type} />;
      case "platforms":
        return <PlatformsView QIDFromChild={this.QSetView} />;
      case "profile":
        return <ProfileView login = {this.QHandleUserLogOut} QProfileFromChild={this.QHandleProfile}  QIDFromChild={this.QSetView} user = {this.state.userStatus.user} id = {this.state.profileID} />;

    }
  };

  QHandleUserLog = (obj) => {
    this.setState({
      userStatus: { logged: true, user: obj }
    })
  };

  
  QHandleUserLogOut = () => {
    this.setState({
      userStatus: { logged: false, user: {} }
    })
  };

  QHandleProfile = (obj) =>{
    this.setState({
      profileID: obj.id
    })
  }

  QHandleGame  = (obj) =>{
    this.setState({
      gameID: obj.id,
      currentPage: obj.page
    })
  }

  render() {
    console.log(this.state)
    return (

      <div id="APP" className="container-fluid">
         <div id="menu" className="row">
          <nav className="navbar navbar-expand-lg navbar-dark ">
            <div className="container-fluid">
              <a
                onClick={() => this.QSetView({ page: "home" })}
                className="nav-link"
                href="#"
              >
                HOME
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>

              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <a
                      onClick={() => this.QSetView({ page: "about" })}
                      className="nav-link "
                      href="#"
                    >
                      ABOUT
                    </a>
                  </li>

                  <li className="nav-item">
                    <a
                      onClick={() => this.QSetView({ page: "games" })}
                      className="nav-link "
                      href="#"
                    >
                      GAMES
                    </a>
                  </li>

                  <li className="nav-item">
                    <a
                      onClick={() => this.QSetView({ page: "movies" })}
                      className="nav-link "
                      href="#"
                    >
                      MOVIES
                    </a>
                  </li>

                  <li className="nav-item">
                    <a
                      onClick={() => this.QSetView({ page: "locations" })}
                      className="nav-link "
                      href="#"
                    >
                      LOCATIONS
                    </a>
                  </li>

                  <li className="nav-item">
                    <a
                      onClick={() => this.QSetView({ page: "platforms" })}
                      className="nav-link "
                      href="#"
                    >
                      PLATFORMS
                    </a>
                  </li>

                {this.state.userStatus.logged && this.state.profileID == 0 &&
                  <li className="nav-item">
                    <a
                      onClick={() => this.QSetView({ page: "addgame" })}
                      className="nav-link"
                      href="#"
                    >
                      ADD A GAME
                    </a>
                  </li>

                  }

                  {!this.state.userStatus.logged && (
                    <>
                      <li className="nav-item">
                        <a
                          onClick={() => this.QSetView({ page: "signup" })}
                          className="nav-link "
                          href="#"
                        >
                          SIGN UP
                        </a>
                      </li>

                      <li className="nav-item">
                        <a
                          onClick={() => this.QSetView({ page: "login" })}
                          className="nav-link "
                          href="#"
                        >
                          LOGIN
                        </a>
                      </li>
                    </>
                  )}

                  {this.state.userStatus.logged && (
                    <>
                      <li className="nav-item">
                        <a
                          onClick={() => this.QSetView({ page: "profile" })}
                          className="nav-link "
                          href="#"
                        >
                          PROFILE
                        </a>
                      </li>


                    </>
                  )}


                </ul>
              </div>
            </div>
          </nav>


        </div> 
      
        

        <div id="viewer" >
          {this.QGetView(this.state)}
        </div>










      </div>


    );
  }
}

export default App;
