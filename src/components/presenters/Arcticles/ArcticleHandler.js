class ArcticleHandler {
  constructor() {
    this.handlers = [];
  }

  addHandler = handler => {
    this.handlers.push(handler);
  };

  empty = () => {
    this.handlers = [];
  }

  handleRequest(arcticle, filterTerm) {
    const nextHandler = this.handlers.shift();
    nextHandler.handlers = this.handlers;
    return nextHandler.handleRequest(arcticle, filterTerm);
  }
}

export default ArcticleHandler;
