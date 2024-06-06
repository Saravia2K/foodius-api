export default class NoOrderPlates extends Error {
  constructor() {
    super("An order cannot be created with 0 plates in its details");
  }
}
