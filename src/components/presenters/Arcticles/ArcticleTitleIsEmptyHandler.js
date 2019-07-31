import React from "react";
import ArcticleHandler from "./ArcticleHandler";

class ArcticleTitleIsEmptyHandler extends ArcticleHandler {
  handleRequest = (arcticle, filterTerm) => {
    if (arcticle.title === "") {
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
    }
    return super.handleRequest(arcticle, filterTerm);
  };
}

export default ArcticleTitleIsEmptyHandler;
