import { Component } from "react";
import axios from "axios";

class LoginView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        type: "login",
      },
      userid: 0,
      platforms: []
    };
  }

  QGetTextFromField = (e) => {
    this.setState((prevState) => ({
      user: { ...prevState.user, [e.target.name]: e.target.value },
    }));
  };

  QSendUser2Parent = (obj) => {
    this.props.QUserFromChild(obj);
  };

  QPostLogin = () => {
    console.log("tu sam");
    let user = this.state.user;
    //console.log(this.state.user);
    axios.post("http://88.200.63.148:4567/user/login", {
        username: user.username,
        password: user.password
    }, { withCredentials: true })
    .then(res => {
        console.log("Sent to server...");
        console.log(res.data);
        this.QSendUser2Parent(res.data);

        // Use the callback function of setState
        this.setState({
            userid: res.data[1]
        }, () => {
            // This callback function will be executed after the state is updated
            this.QPostProfile();
        });
    });
}



  QPostProfile = () =>{
    console.log(this.state.userid)
    axios.get("http://88.200.63.148:4567/profile/" + this.state.userid)
      .then(res => {
        this.setState({
          platforms: res.data
        })
        console.log(res.data)
        
      })
  }

  render() {
    console.log(this.state);
    return (
      <div
        className="card" id = "signup"
      >
        <form style={{ margin: "20px" }}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              onChange={(e) => this.QGetTextFromField(e)}
              name="username"
              type="text"
              className="form-control"
              id="exampleInputEmail1"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              onChange={(e) => this.QGetTextFromField(e)}
              name="password"
              type="password"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
        </form>
        <button
          onClick={() => this.QPostLogin()}
          style={{ color : "white", background: "black", width: "30%", margin : "auto", border: "none", marginBottom: "3%", fontWeight: "900"}}
          className="btn btn-primary bt"
        >
          LOGIN
        </button>
      </div>
    );
  }
}

export default LoginView;
