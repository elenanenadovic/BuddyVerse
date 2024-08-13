import { Component } from "react";
import axios from "axios";

class PlatformsView extends Component {

  constructor(props) {
    super(props)
    this.state = {
      platforms: [],
      link: [],
    }
  }


  QGetTextFromField = (e) => {
    this.setState((prevState) => ({
      link: { ...prevState.link, [e.target.name]: e.target.value },
    }));
  };

  QPostLogin = () =>{
    console.log("tu sam za link")
    let link = this.state.link
    console.log(this.state.link)
    
    axios.post("http://88.200.63.148:4567/games/l", {
      url: link.url
    },{withCredentials: true})
    .then(res=>{
      console.log("Sent to server...")
      console.log(res.data)
    })
      
  }


  /*passing object to prop*/
  QSetViewInParent = (obj) => {
    this.props.QIDFromChild(obj);
  };


  /*rusn everytime component is mounted*/
  //zarez
  componentDidMount() {
    axios.get("http://88.200.63.148:4567/platforms",)
      .then(res => {
        this.setState({
          platforms: res.data
        })
      })


  }

  render() {
    //console.log(this.state.games)
    let data = this.state.platforms

    return (
      
      <div className = "games-body">
    
        <div className="row row-cols-1 row-cols-md-6 g-4" style={{ margin: "10px" }}>
          {data.length > 0 ?
            data.map(d => {
              return (<div className="col" key={d.id}>
                <h5 className="card-title">{d.name}</h5>
                <div className="card">
                  <div className="card-body">
                    <img className="games-image" src = {d.url}></img>
                    
                  </div>
                 </div>
              </div>
              )
            }) :
            "There are currently no games sorry uwu"}
        </div>

      </div>
    );
  }
}

export default PlatformsView;