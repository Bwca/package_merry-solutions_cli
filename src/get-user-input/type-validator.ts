export class InputValidator {
  public static get checkCommand(): RegExp {
    return /^g(enerate)?$/;
  }

  public static get checkType(): RegExp {
    return /^c(omponent)?$/;
  }
}
