import React from "react";

class ArcticleTitle extends React.Component {
  render() {
    return this.props.arcticles.map(arcticle => (
      <div className="arcticle">{arcticle.title}</div>
    ));
  }
}

export default ArcticleTitle;
