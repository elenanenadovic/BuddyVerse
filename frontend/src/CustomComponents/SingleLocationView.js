import axios from "axios";
import { Component } from "react";

class SingleLocationView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      location: [],
      genre: "all",
      comments: [],
      profileid: [],
      profili: [],
      comment: { text: "" },
      changed: false,
      liked: 0
    }
  }

  QSetViewInParent = (obj) => {
    this.props.QViewFromChild(obj)
  };

  async nja() {
    try {

      //svi komentari
      let res = await axios.get(`http://88.200.63.148:4567/locations/comments/` + this.props.data)
      this.setState({
        comments: res.data
      })

      //onda iz komentare uzmem id profila
      let profileIDs = res.data.map(d => d.p_id)
      //console.log(profileIDs)

      //dobijem sve profile koji su komentarisali
      let p = profileIDs.map(id =>
        axios.get(`http://88.200.63.148:4567/profile/profil/` + id)
      );
      let profiles = await Promise.all(p)


      let profilesData = profiles.map(res => res.data)
      //console.log(profilesData)


      this.setState({
        profili: profilesData
      })

      // console.log(this.state.profili)
    } catch (error) {
      console.error("Error:", error)
    }
  }


  componentDidMount() {
    axios.get("http://88.200.63.148:4567/locations/" + this.props.data)
      .then(res => {
        console.log(this.props.type)
        let genre = "all"
        if (this.props.type != "all") {
          console.log("ovde sam");
          console.log(res.data[0].type)
          genre = res.data[0].type
        }
        this.setState({
          location: res.data,
          genre: genre
        })
      })

    this.nja()
  }

  QGetTextFromField = (e) => {
    this.setState(prevState => ({
      comment: { ...prevState.comment, [e.target.name]: e.target.value },
    }));
    //console.log(this.state.comment)
  };


  PostComment = () => {
    let idr = Math.floor(Math.random() * 10000);
    axios.post("http://88.200.63.148:4567/comments/locations", {
      id: idr,
      text: this.state.comment.text,
      l_id: this.props.l_id,
      p_id: this.props.p_id
    }).then(res => {
      console.log("Sent to server...")
      this.nja()
      this.props.QViewFromChild({ page: "location", id: this.props.l_id })

      this.setState({
        changed: !this.state.changed
      })

    });
  }

  Like = () =>{

    axios.post("http://88.200.63.148:4567/locations/like",{
      id: this.props.l_id,
      likes: this.state.location[0]?.likes
    }).then(res=>{
      this.setState({
        liked: this.state.liked+1
      })
      this.componentDidMount()
    });

  }

  Dislike = () =>{

    axios.post("http://88.200.63.148:4567/locations/dislike",{
      id: this.props.l_id,
      likes: this.state.location[0]?.dislikes
    }).then(res=>{
      this.setState({
        liked: this.state.liked+1
      })
      this.componentDidMount()
    });

  }


  render() {

    let location = this.state.location
    let comments = this.state.comments
    let profiles = this.state.profili

    let combined = comments.map((comment, index) => {
      const profile = profiles[index] || {}
      return {
        ...comment,
        profile: profile
      }
    });

    //console.log(combined)
    //console.log(comments)
    return (
      <div >
        {location.length > 0 ?


          <div>
            <p className="singlegame-title">{location[0].name}</p>
            <p className="singlelocation-address">Address: {location[0].address}</p>

            <div className="singlegame-wrap">
              <div className="singlegame-left">
                <img className="singlegame-image" src={location[0].url}></img>
              </div>

              <div className="singlegame-right">


                <p className="singlelocation-description">{location[0].description}</p>
                {this.state.changed}
              </div>

            </div>





            <button id="singlegame-button"
              onClick={() => this.QSetViewInParent({ page: "locations", type: this.state.genre })}
              className="btn btn-primary"
            >
              RETURN TO LOCATIONS
            </button>
          </div>
          : "Loading..."}

        {this.props.logged && this.props.p_id? (

          
          <div>
            <br></br><br></br>
            <p className="comments-like">LIKES: {location[0]?.likes}</p> <button onClick = {this.Like} className="comments-likebutton"> &lt;3 </button><br></br><br></br>
            <p className="comments-like">DISLIKES: {location[0]?.dislikes}</p><button onClick = {this.Dislike} className = "comments-likebutton">&lt;/3</button>
            <p className="comments-main">LEAVE A COMMENT:</p>
            <p className="comments-sub">*please note that all comments against the guidelines will be permanently deleted</p>
            <p className="comments-sub">*all posted comments will be linked directly to your profile</p>

            <textarea name="text" onChange={(e) => this.QGetTextFromField(e)} className="comment-textarea" rows="3" placeholder="Type your comment here..."></textarea>
            <br></br>
            <button style={{ marginLeft: "5%", marginTop: "2%", width: "10%", backgroundColor: "white", color: "black", border: "none", fontWeight: "800" }}
              onClick={() => this.PostComment()}
              className="btn btn-primary bt" id="comment-button">
              SEND
            </button>

          </div>
        ) : (
          <div>
            <p className="comments-notlogged">To leave like, dislike or leave a comment, you must have a profile and be logged in.</p>
          </div>
        )}


        <div>
          <p className="comments-main">COMMENTS:</p>
          {combined.length > 0 ?
            <div>
              <div className="row row-cols-1 row-cols-md-1 g-4" style={{ marginLeft: "10%" }}>
                {combined.length > 0 ?
                  combined.map((d, ind) => {
                    return (<div >
                      <div id="comment-card">
                        <div className="comment-left">
                          <img className="comment-img" src={d.profile[0]?.icon} alt="Profile Icon" />
                        </div>
                        <div className="comment-right">
                          <p className="comment-username">{d.profile[0]?.nickname}</p>
                          <p className="comment-title">{d.text}</p>
                        </div>
                      </div>
                    </div>
                    )
                  }) :
                  "There are currently no games sorry."}
              </div>
            </div>
            : "NJa"}



        </div>


      </div>

    );
  }
}

export default SingleLocationView;
