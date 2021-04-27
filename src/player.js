import React, { Component } from "react";
import Header from "./header";
import Footer from "./footer";

export default class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoId: this.props.match.params.id,
      videoData: {},
    };
  }
  // we get the video id from the URL parameter (line 7)
  // With the id, we can make a request to the server to fetch metadata about the video: http://localhost:4000/video/${this.state.videoId}/data (line 12)

  async componentDidMount() {
    try {
      const res = await fetch(
        `http://localhost:4000/video/${this.state.videoId}/data`
      );
      const data = await res.json();
      this.setState({ videoData: data });
    } catch (error) {
      console.log("Error");
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <Header />
          <video controls muted autoPlay crossOrigin="anonymous">
            <source
              src={`http://localhost:4000/video/${this.state.videoId}`}
              type="video/mp4"
            ></source>
            <track
              label="English"
              kind="captions"
              srcLang="en"
              src={`http://localhost:4000/video/${this.state.videoId}/caption`}
              default
            ></track>
          </video>
          <h1>{this.state.videoData.name}</h1>
          <Footer />
        </div>
      </div>
    );
  }
}

// the video element’s src attribute is a link which appends the id to the /video route, and the server responds with the actual video: http://localhost:4000/video/${this.state.videoId} (line 32)
