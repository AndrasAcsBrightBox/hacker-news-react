import React from "react";
import "./App.css";
import ArcticleTitle from "./components/ArctitcleTitle";
import Loader from "./components/Loader";
import ThemeSwitch from "./components/ThemeSwitch";
import Search from "./components/Search";

const hnBaseEndpoint = `https://hacker-news.firebaseio.com/v0/`;

class App extends React.Component {
  state = {
    loading: true,
    arcticles: [],
    searchTerm: ""
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
            commentCount: 0,
            visible: true
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
                      score: arcticleData.score,
                      visible: true
                    });
                  }, 1000 * Math.random() + i * 500 * Math.random());
                });
            })
          );
        }
        this.setState({ arcticles: arcticles, loading: false });

        storyPromises.forEach(story =>
          story.then(arcticle => {
            arcticles[arcticle.index] = arcticle;
            this.setState({ arcticles: arcticles, loading: false });
            if (this.state.searchTerm) {
              this.onSearch(this.state.searchTerm);
            }
          })
        );
      });
  }

  onSearch(searchValue) {
    this.setState({
      arcticles: this.state.arcticles.map(arcticle => {
        arcticle.visible =
          arcticle.title.toLowerCase().indexOf(searchValue.toLowerCase()) > -1;
        return arcticle;
      }),
      searchTerm: searchValue
    });
  }

  render() {
    return (
      <div className="App">
        <div className="arcticles">
          <div className="title">
            <h1>Hacker News App</h1>
            <div />
            <div className="search">
              <Search onSearch={this.onSearch.bind(this)} />
            </div>
          </div>
          <h4>To learn React by building a real world application.</h4>
          <Loader loading={this.state.loading} />
          <ArcticleTitle
            arcticles={this.state.arcticles}
            searchTerm={this.state.searchTerm}
          />
          <ThemeSwitch />
        </div>
      </div>
    );
  }
}

export default App;
