import { Component } from "react";
import axios from "axios";

class SignupView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        type: "login",
      },
      checked: false
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

  //
  signupVlidation(username, password, email, passwordrepeat) {
    console.log(username)
    console.log(password)
    console.log(email)

    var usernameregex = /^[a-z0-9_-]{3,15}$/;
    var emailregex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/
    var passwordregex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
 //min 8 , 1letter, 1number

 console.log(username.match(usernameregex))
    if (username.match(usernameregex)) {
      console.log("mecujem")
      if(email.match(emailregex)){
        if(password.match(passwordregex)){
          if(password == passwordrepeat){
            if(this.state.checked){
              this.QPostSignUp()
            }
            else{
              alert("You must agree with terms and conditions to proceed.")
            }
          }
          else{
            alert("Passwords are not matching.")
          }
        }
        else{
          alert("Please enter a valid email. Example: buddyverse@gmail.com.")
        }
      }
      else{
        alert("The password is too weak. Please use at least 8 charactrs and 1 number.")
      }
      
    }
    else {
      alert("Please enter a valid username. ");
      return false;
    }
  }


  QPostSignUp = () => {
    let user = this.state.user
    let idr = Math.floor(Math.random() * 10000);
    axios.post("http://88.200.63.148:4567/user/register", {
      id: idr,
      username: this.state.user.username,
      email: this.state.user.email,
      password: this.state.user.password
    }).then(res => {
      this.props.changeview({ page: "login" })
      console.log("Sent to server")
    })
  }

  checked() {
    this.setState({
      checked: !this.state.checked
    })
  }

  render() {
    console.log(this.state.checked)
    console.log(this.state);
    return (
      <div
        className="card" id="signup"

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
              placeholder="Between 3 and 15 characters"
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
              placeholder="example@gmail.com. . ."
            />
            <div id="emailHelp" className="form-text" style={{ color: "gray" }}>
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
              placeholder="Minimum 8 characters and 1 number. . ."
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Please repeat your password:</label>
            <input
              onChange={(e) => this.QGetTextFromField(e)}
              name="passwordrepeat"
              type="password"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
        </form>

         <text style = {{marginLeft: "3%", fontStyle: "italic"}}>I agree to terms and conditions</text> <input style = {{marginRight: "93%", marginTop: "2%", padding:"0%" }}type="checkbox" onChange={() => this.checked()}></input>

        <button
          onClick={() => this.signupVlidation(this.state.user.username, this.state.user.password, this.state.user.email, this.state.user.passwordrepeat)}
          style={{ color: "white", width: "30%", margin: "auto", border: "none", marginBottom: "3%", fontWeight: "900", marginTop: "3%" }}
          className="btn btn-primary bt" id = "signup-button"
        >
          REGISTER
        </button>
      </div>
    );
  }
}

export default SignupView;
