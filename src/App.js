import React from "react";
import "./App.css";
import ArcticleTitle from "./components/ArctitcleTitle";
import Loader from "./components/Loader";
import ThemeSwitch from "./components/ThemeSwitch";

const hnBaseEndpoint = `https://hacker-news.firebaseio.com/v0/`;

class App extends React.Component {
  state = {
    loading: true,
    arcticles: []
  };

  componentDidMount() {
    fetch(`${hnBaseEndpoint}topstories.json`)
      .then(res => {
        return res.json();
      })
      .then(data => {
        const storyPromises = [];
        const arcticles = [];
        const arcticleCount = 30;
        for (let i = 0; i < arcticleCount; i++) {
          arcticles[i] = {
            index: i,
            url: "",
            title: "",
            score: "",
            author: "",
            time: new Date(),
            commentCount: 0
          };
          storyPromises.push(
            new Promise(resolve => {
              fetch(`${hnBaseEndpoint}item/${data[i]}.json`)
                .then(res => res.json())
                .then(arcticleData => {
                  // TODO - remove this - only to demo the `skeleton` effect
                  setTimeout(() => {
                    resolve({
                      index: i,
                      id: arcticleData.id,
                      title: arcticleData.title,
                      author: arcticleData.by,
                      url: arcticleData.url,
                      time: arcticleData.time,
                      commentCount: arcticleData.kids
                        ? arcticleData.kids.length
                        : 0,
                      score: arcticleData.score
                    })}, 1000 * Math.random() + i * 500 * Math.random()      
                  );
                });
            })
          );
        }
        this.setState({arcticles: arcticles, loading: false });

        storyPromises.forEach(story =>
          story.then(arcticle => {
            arcticles[arcticle.index] = arcticle;
            this.setState({ arcticles: arcticles, loading: false });
          })
        );
      });
  }

  render() {
    return (
      <div className="App">
        <div className="arcticles">
          <h1>Hacker News App</h1>
          <h4>To learn React by building a real world application.</h4>
          <Loader loading={this.state.loading} />
          <ArcticleTitle arcticles={this.state.arcticles} />
          <ThemeSwitch />
        </div>
      </div>
    );
  }
}

export default App;
