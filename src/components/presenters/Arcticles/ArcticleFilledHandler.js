import React from "react";
import ArcticleHandler from "./ArcticleHandler";
import moment from "moment";

class ArcticleFilledHandler extends ArcticleHandler {
  getHighlightedTitle (title, searchTerm) {
    if (!searchTerm) return title;
    else {
      const findStart = title.toLowerCase().indexOf(searchTerm.toLowerCase());
      return (
        <React.Fragment>
          {title.substr(0, findStart)}
          <span className="article__title--highlighted">
            {title.substr(findStart, searchTerm.length)}
          </span>
          {title.substr(findStart + searchTerm.length)}
        </React.Fragment>
      );
    }
  };

  handleRequest = (arcticle, filterTerm) => {
    return (
      <div className="article" key={arcticle.index}>
        <div className="article__body">
          <div className="article__index">{arcticle.index + 1}</div>
          <div className="article__title" target="_blank">
            <a href={arcticle.url} className='article__hyperlink'>
              {this.getHighlightedTitle(arcticle.title, filterTerm)}
            </a>
          </div>
        </div>
        <div className="article__stats">
          <div className="article__author">
            {arcticle.score} points by {arcticle.author}
          </div>
          <div className="article__separator">|</div>
          <div className="article__time">{moment.unix(arcticle.time).fromNow()}</div>
          <div className="article__separator">|</div>
          <div className="article__comments">{arcticle.commentCount} comments</div>
        </div>
      </div>
    );
  };
}

export default ArcticleFilledHandler;
