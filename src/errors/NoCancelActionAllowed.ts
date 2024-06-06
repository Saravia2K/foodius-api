export default class NoCancelActionAllowed extends Error {
  constructor() {
    super("You cannot cancel an order in this action");
  }
}
