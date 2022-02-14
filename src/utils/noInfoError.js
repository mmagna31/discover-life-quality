class NoInfoAvailableError extends Error {
  constructor(message) {
    super(message);
    this.name = "NoInfoAvailableError";
  }
}

export default NoInfoAvailableError;
