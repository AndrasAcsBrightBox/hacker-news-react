import React from "react";
import moment from "moment";

class ArcticleTitle extends React.Component {
  getHighlightedTitle(title, searchTerm) {
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
  }

  render() {
    return this.props.arcticles.map(arcticle => {
      if (!arcticle.visible) return "";
      else if (arcticle.title === "") {
        return (
          <div className="arcticle skeleton" key={arcticle.index}>
            <div className="main">
              <div className="index" />
              <div className="title" target="_blank" />
            </div>
            <div className="stats">
              <div className="author" />
              <div className="separator" />
              <div className="time" />
              <div className="separator" />
              <div className="comments" />
            </div>
          </div>
        );
      } else {
        return (
          <div className="arcticle" key={arcticle.index}>
            <div className="main">
              <div className="index">{arcticle.index + 1}</div>
              <div className="title" target="_blank">
                <a href={arcticle.url}>
                  {this.getHighlightedTitle(
                    arcticle.title,
                    this.props.searchTerm
                  )}
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
      }
    });
  }
}

export default ArcticleTitle;
