import React from "react";

//imported routes
import GamesView from "./CustomComponents/GamesView";
import HomeView from "./CustomComponents/HomeView";
import LoginView from "./CustomComponents/LoginView";
import SignupView from "./CustomComponents/SignupView";
import SingleGameView from "./CustomComponents/SingleGameView";
import AboutView from "./CustomComponents/AboutView";
import AddGameView from "./CustomComponents/AddGameView";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: "home",
      gameID: 0,
    };
  }

  QSetView = (obj) => {
    this.setState({
      currentPage: obj.page,
      gameId: obj.id || 0,
    });
  };

  QGetView = (state) => {
    let page = state.currentPage;

    switch (page) {
      case "home":
        return <HomeView />;
      case "about":
        return <AboutView />;
      case "games":
        return <GamesView QIDFromChild={this.QSetView} />;
      case "addgame":
        return <AddGameView />;
      case "signup":
        return <SignupView QUserFromChild={this.QHandleUserLog} />;
      case "login":
        return <LoginView QUserFromChild={this.QHandleUserLog} />;
      case "game":
        return <SingleGameView QViewFromChild={this.QSetView} />;
    }
  };

  QHandleUserLog = (obj) => {
    this.QSetView({ page: "home" });
  };

  render() {
    return (
      <div id="APP" className="container">
        <div id="menu" className="row">
          <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
              <a
                onClick={() => this.QSetView({ page: "home" })}
                className="navbar-brand"
                href="#"
              >
                Home
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
                      About
                    </a>
                  </li>

                  <li className="nav-item">
                    <a
                      onClick={() => this.QSetView({ page: "games" })}
                      className="nav-link "
                      href="#"
                    >
                      Games
                    </a>
                  </li>

                  <li className="nav-item">
                    <a
                      onClick={() => this.QSetView({ page: "addgame" })}
                      className="nav-link"
                      href="#"
                    >
                      Add game
                    </a>
                  </li>

                  <li className="nav-item">
                    <a
                      onClick={() => this.QSetView({ page: "signup" })}
                      className="nav-link "
                      href="#"
                    >
                      Sign up
                    </a>
                  </li>

                  <li className="nav-item">
                    <a
                      onClick={() => this.QSetView({ page: "login" })}
                      className="nav-link "
                      href="#"
                    >
                      Login
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>

        <div id="viewer" className="row container">
          {this.QGetView(this.state)}
        </div>
      </div>
    );
  }
}

export default App;
