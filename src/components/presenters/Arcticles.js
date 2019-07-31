import React from "react";

import ArcticleHandler from "./Arcticles/ArcticleHandler";
import ArcticleNotVisibleHandler from "./Arcticles/ArcticleNotVisibleHandler";
import ArcticleTitleIsEmptyHandler from "./Arcticles/ArcticleTitleIsEmptyHandler";
import ArcticleFilledHandler from "./Arcticles/ArcticleFilledHandler";

class Arcticles extends React.Component {
  render() {
    const arcticleHandler = new ArcticleHandler();
    return this.props.arcticles.map(arcticle => {
      arcticleHandler.empty();
      arcticleHandler.addHandler(new ArcticleNotVisibleHandler());
      arcticleHandler.addHandler(new ArcticleTitleIsEmptyHandler());
      arcticleHandler.addHandler(new ArcticleFilledHandler());

      return arcticleHandler.handleRequest(arcticle, this.props.filterTerm);
    });
  }
}

export default Arcticles;
