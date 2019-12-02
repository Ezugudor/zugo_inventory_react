export class InputManager {
  static generateType(el) {
    switch (el.type) {
      case "shorttext":
      case "firstname":
      case "lastname":
      case "address":
        return "text";
      case "mobile":
        return "tel";
      case "date":
      case "dob":
        return "date";
      case "tel":
        return "tel";
      case "email":
        return "email";
      case "bvn":
        return "number";
      default:
        return "text";
    }
  }

  static generatePlaceholder(el) {
    switch (el.type) {
      case "address":
        return "Like 16 Karimu Ikotun VI, Lagos";
      case "mobile":
        return "Like 08136868448";
      case "tel":
        return "Like 01729011";
      case "email":
        return "Like jendoe@cool.com";
      case "bvn":
        return "Like 22123803000";
      case "branch":
        return "Choose Branch";
      default:
        return "Enter Your Answer Here";
    }
  }
}
