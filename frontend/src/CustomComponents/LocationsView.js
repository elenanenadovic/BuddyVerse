import { Component } from "react";
import axios from "axios";

class LocationsView extends Component {

  constructor(props) {
    super(props)
    this.state = {
      locations: [],
      link: []
    }
  }


  QGetTextFromField = (e) => {
    this.setState((prevState) => ({
      link: { ...prevState.link, [e.target.name]: e.target.value },
    }));
  };



  /*passing object to prop*/
  QSetViewInParent = (obj) => {
    this.props.QIDFromChild(obj);
  };


  /*rusn everytime component is mounted*/
  //zarez
  componentDidMount() {
    axios.get("http://88.200.63.148:4567/locations",)
      .then(res => {
        this.setState({
          locations: res.data
        })
      })


  }

  render() {
    //console.log(this.state.games)
    let data = this.state.locations

    return (
      
      <div className = "games-body">
    
        <div className="row row-cols-1 row-cols-md-2 g-4" style={{ margin: "10px" }}>
          {data.length > 0 ?
            data.map(d => {
              return (<div className="col" key={d.id}>
                <h5 className="card-title">{d.name}</h5>
                <div className="card">
                  <div className="card-body">
                    <img onClick={() => this.QSetViewInParent({ page: "location", id: d.id })} className="games-image" src = {d.url}></img>
                    
                  </div>
                 </div>
              </div>
              )
            }) :
            "There are currently no location sorry uwu"}
        </div>

      </div>
    );
  }
}

export default LocationsView;