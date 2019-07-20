import React from "react";
import moment from "moment";

class ArcticleTitle extends React.Component {
  render() {
    return this.props.arcticles.map(arcticle => (
      <div
        className={"arcticle " + (arcticle.title === "" ? "skeleton" : "")}
        key={arcticle.index}
      >
        <div className="main">
          <div className="index">{arcticle.title !== "" ? arcticle.index + 1 + '.' : ''}</div>
          <div className="title" target="_blank">
            <a href={arcticle.url}>{arcticle.title}</a>
          </div>
        </div>
        <div className="stats">
          <div className="author">
            {arcticle.title !== ""
              ? arcticle.score + " points by" + arcticle.author
              : ""}
          </div>
          <div className="separator">{arcticle.title !== "" ? "|" : ""} </div>
          <div className="time">
            {arcticle.title !== "" ? moment.unix(arcticle.time).fromNow() : ""}
          </div>
          <div className="separator">{arcticle.title !== "" ? "|" : ""} </div>
          <div className="comments">
            {arcticle.title !== "" ? arcticle.commentCount + " comments" : ""}
          </div>
        </div>
      </div>
    ));
  }
}

export default ArcticleTitle;
