export default class UserAlreadyExists extends Error {
  public code: string = "P2002";
  public meta = {
    target: "usuario",
  };

  constructor() {
    super("Este usuario ya existe");
  }
}
