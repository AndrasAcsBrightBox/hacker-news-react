import React from "react";
import "./App.css";
import ArcticleTitle from "./components/ArctitcleTitle";
import Loader from "./components/Loader";
import ThemeSwitch from "./components/ThemeSwitch"

const hnBaseEndpoint = `https://hacker-news.firebaseio.com/v0/`;

class App extends React.Component {
  state = {
    loading : true,
    arcticles: []
  };

  componentDidMount() {
    fetch(`${hnBaseEndpoint}topstories.json`)
      .then(res => {
        return res.json();
      })
      .then(data => {
        const storyPromises = [];
        for (let i = 0; i < 30; i++) {
          storyPromises.push(
            new Promise((resolve, reject) => {
              fetch(`${hnBaseEndpoint}item/${data[i]}.json`)
                .then(res => res.json())
                .then(arcticleData => {
                  resolve({
                    id: arcticleData.id,
                    title: arcticleData.title,
                    author: arcticleData.by,
                    url: arcticleData.url,
                    time: arcticleData.time,
                    commentCount: arcticleData.kids 
                      ? arcticleData.kids.length
                      : 0,
                    score: arcticleData.score
                  });
                });
            })
          );
        }

        Promise.all(storyPromises).then(arcticles =>
          this.setState({ arcticles: arcticles, loading: false})
        );
      });
  }

  render() {
    return (
      <div className="App">
        <div className="arcticles">
          <h1>
            Hacker News App
          </h1>
          <h4>
            To learn React by building a real world application.
          </h4>
          <Loader loading={this.state.loading} />
          <ArcticleTitle arcticles={this.state.arcticles} />
          <ThemeSwitch />
        </div>
      </div>
    );
  }
}

export default App;
