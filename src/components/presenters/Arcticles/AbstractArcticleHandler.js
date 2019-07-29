class AbstractArcticleHandler {
  HandleRequest = () => {};

  SetSuccessor = successor => {
    this.successor = successor;
  };
}

export default AbstractArcticleHandler;
