import { State } from "./state";

export class Helper {
  static getPageHeight() {
    const body = document.body;
    const html = document.documentElement;
    return Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
  }

  static getDistanceToTop(elem) {
    let distance = 0;
    if (elem.offsetParent) {
      do {
        distance += elem.offsetTop;
        elem = elem.offsetParent;
      } while (elem);
    }
    return distance < 0 ? 0 : distance;
  }

  static getIndex(element) {
    // typecast to number before returnning
    return +element.getAttribute("data-intersect-index");
  }

  static updateDirection() {
    const className = State.canvasClass;
    const scrolledOffset = document.querySelector(`.${className}`)
      ? document.querySelector(`.${className}`).scrollTop
      : window.pageYOffset;
    if (scrolledOffset > State.previousYOffset) {
      State.direction = "down";
    } else if (scrolledOffset < State.previousYOffset) {
      State.direction = "up";
    }
    State.previousYOffset = scrolledOffset;
  }
}
