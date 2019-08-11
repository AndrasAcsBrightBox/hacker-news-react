import React from "react";
import ArcticleHandler from "./ArcticleHandler";

class ArcticleTitleIsEmptyHandler extends ArcticleHandler {
  handleRequest = (arcticle, filterTerm) => {
    if (arcticle.title === "") {
      return (
        <div className="article article--skeleton" key={arcticle.index}>
          <div className="article__body">
            <div className="article__index" />
            <div className="article__title" target="_blank" />
          </div>
          <div className="article__stats">
            <div className="article__author" />
            <div className="article__separator" />
            <div className="article__time" />
            <div className="article__separator" />
            <div className="article__comments" />
          </div>
        </div>
      );
    }
    return super.handleRequest(arcticle, filterTerm);
  };
}

export default ArcticleTitleIsEmptyHandler;
