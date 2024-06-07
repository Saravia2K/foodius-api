export default class FoodNoAvailable extends Error {
  constructor() {
    super("Algunos platillos ya no están disponibles");
  }
}
