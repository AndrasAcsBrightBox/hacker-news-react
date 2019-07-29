import React from 'react';
import AbstractArcticleHandler from "./AbstractArcticleHandler";

class ArcticleTitleIsEmptyHandler extends AbstractArcticleHandler {
  HandleRequest = (arcticle, filterTerm) => {
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
    return this.successor.HandleRequest(arcticle, filterTerm);
  };
}

export default ArcticleTitleIsEmptyHandler;
