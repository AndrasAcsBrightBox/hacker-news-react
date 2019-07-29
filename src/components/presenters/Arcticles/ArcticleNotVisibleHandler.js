import React from "react";
import AbstractArcticleHandler from "./AbstractArcticleHandler";

class ArcticleNotVisibleHandler extends AbstractArcticleHandler {
  HandleRequest = (arcticle, filterTerm) => {
    if (arcticle.visible === false) {
      return <React.Fragment key={arcticle.index} />;
    }
    return this.successor.HandleRequest(arcticle, filterTerm);
  };
}

export default ArcticleNotVisibleHandler;
