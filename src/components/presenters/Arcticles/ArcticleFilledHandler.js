import React from "react";
import AbstractArcticleHandler from "./AbstractArcticleHandler";
import moment from "moment";

class ArcticleFilledHandler extends AbstractArcticleHandler {
  getHighlightedTitle = (title, searchTerm) => {
    if (!searchTerm) return title;
    else {
      const findStart = title.toLowerCase().indexOf(searchTerm.toLowerCase());
      return (
        <React.Fragment>
          {title.substr(0, findStart)}
          <span className="highlighted">
            {title.substr(findStart, searchTerm.length)}
          </span>
          {title.substr(findStart + searchTerm.length)}
        </React.Fragment>
      );
    }
  };

  HandleRequest = (arcticle, filterTerm) => {
    return (
      <div className="arcticle" key={arcticle.index}>
        <div className="main">
          <div className="index">{arcticle.index + 1}</div>
          <div className="title" target="_blank">
            <a href={arcticle.url}>
              {this.getHighlightedTitle(arcticle.title, filterTerm)}
            </a>
          </div>
        </div>
        <div className="stats">
          <div className="author">
            {arcticle.score} points by {arcticle.author}
          </div>
          <div className="separator">|</div>
          <div className="time">{moment.unix(arcticle.time).fromNow()}</div>
          <div className="separator">|</div>
          <div className="comments">{arcticle.commentCount} comments"</div>
        </div>
      </div>
    );
  };
}

export default ArcticleFilledHandler;
