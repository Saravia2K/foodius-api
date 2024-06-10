export default class CouldNotDeleteFood extends Error {
  constructor() {
    super("Food could not be deleted from database");
  }
}
