import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";
//  importing some required packages

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      videos: [],
    };
  }
  // initializes the state variable videos to an empty array

  async componentDidMount() {
    try {
      const response = await fetch("http://localhost:4000/videos");
      const data = await response.json();
      this.setState({ videos: [...data] });
    } catch (error) {
      console.log("error");
    }
    // makes a request to an endpoint (http://localhost:4000/videos), which will return an array of video metadata. This metadata will be represented as array of objects, where each object looks like:
    //     {
    //     id: 0,
    //     poster: '/video/0/poster',
    //     duration: '3 mins',
    //     name: 'Sample 1'
    // }
  }
  render() {
    return (
      <div className="App App-header">
        <Header />
        <div className="container">
          <div className="row">
            {this.state.videos.map((video) => (
              <div className="col-md-4" key={video.id}>
                <Link to={`/player/${video.id}`}>
                  <div className="card border-0">
                    <img
                      src={`http://localhost:4000 ${video.poster}`}
                      alt={video.name}
                    />
                    <div className="card-body">
                      <p>{video.name}</p>
                      <p>{video.duration}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

/*
After fetching the video metadata, we render it as a list of videos
Each card is wrapped with a link to the Player view
another endpoint request is made to http://localhost:4000${video.poster}, which will return a thumbnail of a video in the list. The video.poster variable is populated with a value like /video/0/poster from the video metadata array, so the request will have the form http://localhost:4000/video/:id/poster.
*/
