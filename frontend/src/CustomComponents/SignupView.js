import { Component } from "react";
import axios from "axios";

class SignupView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        type: "login",
      },
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

  QPostSignUp = () => {
    let user = this.state.user
    let idr = Math.floor(Math.random() * 10000);
    axios.post("http://88.200.63.148:4567/user/register", {
      id: idr,
      username: this.state.user.username,
      email: this.state.user.email,
      password: this.state.user.password
    }).then(res => {
      console.log("Sent to server")
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
            <label className="form-label">Username:</label>
            <input
              onChange={(e) => this.QGetTextFromField(e)}
              name="username"
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email address:</label>
            <input
              onChange={(e) => this.QGetTextFromField(e)}
              name="email"
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text" style = {{color: "gray"}}>
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Password:</label>
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
          onClick={() => this.QPostSignUp()}
          style={{ color : "white", background: "black", width: "30%", margin : "auto", border: "none", marginBottom: "3%", fontWeight: "900"}}
          className="btn btn-primary bt"
        >
          REGISTER
        </button>
      </div>
    );
  }
}

export default SignupView;
