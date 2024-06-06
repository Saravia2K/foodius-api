export default class NoBusinessFound extends Error {
  constructor() {
    super("Business not found");
  }
}
