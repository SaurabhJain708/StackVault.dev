export class InsufficientTokensError extends Error {
  constructor(message = "Insufficient tokens") {
    super(message);
    this.name = "InsufficientTokensError";
  }
}
