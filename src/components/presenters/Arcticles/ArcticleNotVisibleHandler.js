import React from "react";
import ArcticleHandler from "./ArcticleHandler";

class ArcticleNotVisibleHandler extends ArcticleHandler {
  handleRequest = (arcticle, filterTerm) =>  {
    if (arcticle.visible === false) {
      return <React.Fragment key={arcticle.index} />;
    }
    return super.handleRequest(arcticle, filterTerm);
  };
}

export default ArcticleNotVisibleHandler;
