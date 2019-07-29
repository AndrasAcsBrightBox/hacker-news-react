import React from "react";

import ArcticleNotVisibleHandler from "./Arcticles/ArcticleNotVisibleHandler";
import ArcticleTitleIsEmptyHandler from "./Arcticles/ArcticleTitleIsEmptyHandler";
import ArcticleFilledHandler from "./Arcticles/ArcticleFilledHandler";

class Arcticles extends React.Component {
  render() {
    const arcticleNotVisibleHanlder = new ArcticleNotVisibleHandler();
    const arcticleTitleIsEmptyHandler = new ArcticleTitleIsEmptyHandler();
    const arcticleFilledHandler = new ArcticleFilledHandler();

    arcticleNotVisibleHanlder.SetSuccessor(arcticleTitleIsEmptyHandler);
    arcticleTitleIsEmptyHandler.SetSuccessor(arcticleFilledHandler);

    return this.props.arcticles.map(arcticle =>
      arcticleNotVisibleHanlder.HandleRequest(arcticle, this.props.filterTerm)
    );
  }
}

export default Arcticles;
