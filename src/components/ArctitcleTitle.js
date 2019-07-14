import React from "react";
import moment from 'moment';

class ArcticleTitle extends React.Component {
  render() {
    let arcticleIndex = 1;
    return this.props.arcticles.map(arcticle => (
      <div className="arcticle" key={arcticleIndex}>
        <div className="main">
        <div className="index">
          {arcticleIndex++}.
        </div>
        <div className="title" target="_blank">
          <a href={arcticle.url}>
            {arcticle.title}
          </a>
        </div>
        </div>
        <div className="stats">
          <div className="author">
            {arcticle.score} points by {arcticle.author}
          </div>
          <div className="separator">
            |
          </div>
          <div className="time">
            {moment.unix(arcticle.time).fromNow()}
          </div>
          <div className="separator">
            |
          </div>
          <div className="comments">
            {arcticle.commentCount} comments
          </div>
        </div>
      </div>
    ));
  }
}

export default ArcticleTitle;
