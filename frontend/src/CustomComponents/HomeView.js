import { Component } from "react";
import picture from './images/sims.png';


class HomeView extends Component {

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    return (


      <div>

        <div className="home">
          <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
            <ol className="carousel-indicators">
              <li id="indicator" data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
              <li id="indicator" data-target="#carouselExampleIndicators" data-slide-to="1"></li>
              <li id="indicator" data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            </ol>

            <div className="carousel-inner">
              <div className="carousel-item active" >
                <img className="d-block w-100" src="https://www.adorama.com/business/wp-content/uploads/2023/12/AdobeStock_425602403.jpeg" alt="First slide"></img>
                <div className="carousel-caption ">
                  <h5> Welcome to the Buddyverse! </h5>
                  <p>

                    Here in the Buddyverse, you’ll discover a vibrant community brimming with friendly faces, stimulating conversations, and countless opportunities to connect. Whether you’re looking to explore new interests, forge meaningful relationships, or simply have a great time, there’s something for everyone. Dive in and experience the warmth and excitement that make the Buddyverse a special place to be!</p>
                </div>
              </div>

              <div className="carousel-item">
                <img className="d-block w-100" src="https://image.cnbcfm.com/api/v1/image/107198349-1677094004134-gettyimages-1413907398-img_9361.jpeg?v=1706809419&w=1920&h=1080" alt="Third slide"></img>
                <div className="carousel-caption ">
                  <h5>Ready to take your connections offline?</h5>
                  <p>Got an idea for a fun event or activity? Use the app to organize and invite others-it’s a fantastic way to connect with new friends and build lasting relationships! And remember, your safety and comfort are our top priorities. Always meet in public places and let someone know where you’re going..</p>
                </div>
              </div>

              <div className="carousel-item">
                <img className="d-block w-100" src={picture} alt="Second slide"></img>
                <div className="carousel-caption ">
                  <div className="carousel-text">
                    <h5>Embrace the Fun of Online Buddyverse </h5>
                    <p>Join online games where you can participate in a variety of challenges organized by our members. From trivia and strategy games to multiplayer adventures, there’s something for everyone to enjoy together.

                      Discover virtual movie nights and watch parties where you can share the experience with fellow members and dive into lively discussions about your favorite films and the latest releases.</p>
                  </div>
                </div>
              </div>


            </div>

            <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="sr-only"></span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="sr-only"></span>
            </a>
          </div>
        </div>

        <div className="outerbox">
          <div className="title">
            EXPLORE THE BUDDYVERSE
          </div>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div id="news-slider" className="owl-carousel">

                  <div className="box">
                    <div className="bimage">
                      <img id="ahri" src="https://cdn.oneesports.gg/cdn-data/2024/05/LeagueofLegends_RisenLegendAhri_SplashArt-1024x576.jpg" alt=""></img>
                      <a href="#" className="over-layer"><i className="fa fa-link"></i></a>
                    </div>


                    <div className="btext">
                      <h3 className="btitle">
                        <a href="#">GAMES</a>
                      </h3>
                      <p className="blongtext">Dive into our dynamic collection of games, where you'll find everything from fast-paced trivia and strategy challenges to immersive multiplayer adventures. </p>

                      <button onClick={() => this.props.changeview({ page: "games" })} className="bbutton">Go to games!</button>
                    </div>
                  </div>

                  <div className="box">
                    <div className="bimage">
                      <img id="ahri" src="https://techcrunch.com/wp-content/uploads/2023/05/Screen-Shot-2023-05-24-at-5.11.46-PM-2.png" alt=""></img>
                      <a href="#" className="over-layer"><i className="fa fa-link"></i></a>
                    </div>


                    <div className="btext">
                      <h3 className="btitle">
                        <a href="#">MOVIES</a>
                      </h3>
                      <p className="blongtext">Welcome to the cinematic universe of Buddyverse! Here, you can immerse yourself in the magic of movies and connect with fellow film enthusiasts like never before.</p>

                      <button onClick={() => this.props.changeview({ page: "movies" })} className="bbutton">Go to movies!</button>
                    </div>
                  </div>

                  <div className="box">
                    <div className="bimage">
                      <img id="ahri" src="https://www.tagvenue.com/images/location-pages/1920x1080/2800.jpg" alt=""></img>
                      <a href="#" className="over-layer"><i className="fa fa-link"></i></a>
                    </div>


                    <div className="btext">
                      <h3 className="btitle">
                        <a href="#">LOCATIONS</a>
                      </h3>
                      <p className="blongtext">We’ve carefully curated a selection of trusted locations for your in-person meetups, ensuring that you can connect with new friends in a secure environment.</p>

                      <button onClick={() => this.props.changeview({ page: "locations" })} className="bbutton">Go to locations!</button>
                    </div>
                  </div>


                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="signupd">
          <div className="title2">
            Become a buddy!
          </div>
          <div>
            <button onClick={() => this.props.changeview({ page: "signup" })} type="button" className="signup">CLICK ME</button>
          </div>
        </div>

        <footer className="footer-section">
          <div className="container">
            <div className="footer-cta pt-5 pb-5">
              <div className="row">
                <div className="col-xl-4 col-md-4 mb-30">
                  <h4 className="footert">Our sponsor:</h4>
                  <div className="footer-logo">
                    <a href="index.html"><img src="https://www.stark.rs/img/stark-beli-logo.webp" class="img-fluid" alt="logo"></img></a>
                  </div>


                </div>

                <div className="col-xl-4 col-md-4 mb-30">
                  <h4 className="footert">Call us:</h4>
                  <span className="footerp">+381 958 7865</span>
                </div>


                <div className="col-xl-4 col-md-4 mb-30">
                  <h4 className="footert">Mail us:</h4>
                  <span className="footerp">buddyverse@info.com</span>
                </div>
              </div>
            </div>
          </div>

          <div class="copyright-area">
            <div class="container">

              <div class="row">
                <div class="col-xl-6 col-lg-6 text-center text-lg-center ">
                  <div class="copyright-text">
                    <p>Copyright &copy; 2024, All Right Reserved </p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </footer>


      </div>
    );
  }
}

export default HomeView;
