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
      platforms: [],
      emails: []
    };
  }

  async componentDidMount() {
    try {

      let res = await axios.get(`/user/`);
      let emsils = res.data.map(d => d.email);
      this.setState({
        emails: emsils
      });
      console.log(this.state.emails)


    } catch (error) {
      console.error("Error:", error);
    }
  }


  QGetTextFromField = (e) => {
    this.setState((prevState) => ({
      user: { ...prevState.user, [e.target.name]: e.target.value },
    }));
  };

  QSendUser2Parent = (obj) => {
    this.props.QUserFromChild(obj);
  };

  loginValidation = () => {
    console.log(this.state.user.username)

    if (this.state.user.username == undefined) {
      alert("Please enter email")
    }
    else {
      if (this.state.user.password == undefined) {
        alert("Please enter password")
      }
      else{
        if(this.state.emails.includes(this.state.user.username)){
          this.QPostLogin()
        }
        else{
          alert("This email is not registered.")
        }
      }
    }
  }


  QPostLogin = () => {
    console.log("tu sam");
    let user = this.state.user;
    //console.log(this.state.user);
    axios.post("/user/login", {
      email: user.username,
      password: user.password
    }, { withCredentials: true })
      .then(res => {
        console.log("Sent to server...");
        console.log(res.data);
        this.QSendUser2Parent(res.data);
        this.setState({
          userid: res.data[1]
        }, () => {
          this.QPostProfile();
        });
      });
  }



  QPostProfile = () => {
    console.log(this.state.userid)
    axios.get("/profile/" + this.state.userid)
      .then(res => {
        this.setState({
          platforms: res.data
        })
        console.log(res.data)
        this.props.changeview({page: "profile", id: this.state.platforms[0]?.id})

      })
  }

  render() {
    console.log(this.state);
    return (
      <div
        className="card" id="signup"
      >
        <form style={{ margin: "20px" }}>
          <div className="mb-3">
            <label className="form-label">Email</label>
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
          onClick={() => this.loginValidation()}
          style={{ color: "white", width: "30%", margin: "auto", border: "none", marginBottom: "3%", fontWeight: "900" }}
          className="btn btn-primary bt" id="signup-button"
        >
          LOGIN
        </button>
      </div>
    );
  }
}

export default LoginView;
