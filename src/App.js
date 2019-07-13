import React from "react";
import "./App.css";
import ArcticleTitle from "./components/ArctitcleTitle";

const hnBaseEndpoint = `https://hacker-news.firebaseio.com/v0/`;

class App extends React.Component {
  state = {
    arcticles: []
  };

  componentDidMount() {
    fetch(`${hnBaseEndpoint}topstories.json`)
      .then(res => {
        return res.json();
      })
      .then(data => {
        const storyPromises = [];
        for (let i = 0; i < 50; i++) {
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
                    time: arcticleData.time
                  });
                });
            })
          );
        }

        Promise.all(storyPromises).then(arcticles =>
          this.setState({ arcticles: arcticles })
        );
      });
  }

  render() {
    return (
      <div className="App">
        <ArcticleTitle arcticles={this.state.arcticles} />
      </div>
    );
  }
}

export default App;
