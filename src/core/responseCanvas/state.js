import { Callback } from "./callback";
import { Helper } from "./helper";

const stateValues = {
  observers: { above: [], below: [], viewportAbove: [], viewportBelow: [] },
  callbacks: { targetEnter: null, targetExit: null },
  targetsOffsetHeight: [],
  targetsOffsetTop: [],
  previousYOffset: -1,
  canvasClass: null,
  viewPortHeight: 0,
  targetStates: [],
  debugMode: false,
  offsetMargin: 0,
  direction: null,
  offsetValue: 0,
  pageHeight: 0,
  ZERO_MOE: 1,
  targets: []
};

export class State {
  static get targets() {
    return stateValues.targets;
  }

  static set targets(nodeList) {
    const list = [];
    if (nodeList instanceof NodeList) {
      [].forEach.call(nodeList, node => list.push(node));
      stateValues.targets = list;
    }
  }

  static get canvasClass() {
    return stateValues.canvasClass;
  }

  static set canvasClass(string = "canvas") {
    stateValues.canvasClass = string;
  }

  static addIndexDateToTargets() {
    stateValues.targets.forEach((el, index) =>
      el.setAttribute("data-intersect-index", index)
    );
  }

  static get ZERO_MOE() {
    return stateValues.ZERO_MOE;
  }

  static get debugMode() {
    return stateValues.debugMode;
  }

  static set debugMode(bool) {
    if (![true, false].includes(bool))
      throw new Error(`Argument ${bool} is not a valid value`);
    stateValues.debugMode = bool;
  }

  static get direction() {
    return stateValues.direction;
  }

  static set direction(value) {
    if (!["up", "down"].includes(value))
      throw new Error(`Argument ${value} is not a valid direction`);
    stateValues.direction = value;
  }

  static get previousYOffset() {
    return stateValues.previousYOffset;
  }

  static get viewPortHeight() {
    return stateValues.viewPortHeight;
  }

  static setViewPortHeight() {
    stateValues.viewPortHeight = window.innerHeight;
  }

  static get pageHeight() {
    return stateValues.pageHeight;
  }

  static setPageHeight() {
    stateValues.pageHeight = Helper.getPageHeight();
  }

  static get offsetValue() {
    return stateValues.offsetValue;
  }

  static set offsetValue(numb) {
    if (isNaN(numb)) throw new Error(`Argument ${numb} is not a valid value`);
    stateValues.offsetValue = Math.min(Math.max(0, numb), 1);
  }

  static get offsetMargin() {
    return stateValues.offsetMargin;
  }

  static setOffsetMargin() {
    const { offsetValue, viewPortHeight } = stateValues;
    stateValues.offsetMargin = offsetValue * viewPortHeight;
  }

  static get targetStates() {
    return stateValues.targetStates;
  }

  static setTargetStates() {
    stateValues.targetStates = stateValues.targets.map(() => ({
      direction: null,
      state: null
    }));
  }

  static setTargetsOffsetTop() {
    const { targets } = stateValues;
    if (!targets[0])
      throw new Error("Canvas doesn't have target element to monitor");
    stateValues.targetsOffsetTop = targets.map(Helper.getDistanceToTop);
  }

  static get targetsOffsetTop() {
    return stateValues.targetsOffsetTop;
  }

  static setTargetsOffsetHeight() {
    const { targets } = stateValues;
    if (!targets[0])
      throw new Error("Canvas doesn't have target element to monitor");
    stateValues.targetsOffsetHeight = targets.map(el => el.offsetHeight);
  }

  static set previousYOffset(numb) {
    if (isNaN(numb)) throw new Error(`Argument ${numb} is not a valid value`);
    stateValues.previousYOffset = numb;
  }

  static registerTargetEnter(cb) {
    if (typeof cb !== "function")
      throw new Error("Argument passed is not a function");
    stateValues.callbacks.targetEnter = cb;
  }

  static registerTargetExit(cb) {
    if (typeof cb !== "function")
      throw new Error("Argument passed is not a function");
    stateValues.callbacks.targetExit = cb;
  }

  static callTargetExit(response) {
    const { callbacks, targetStates } = stateValues;
    if (callbacks.targetExit && typeof callbacks.targetExit === "function") {
      callbacks.targetExit(response, targetStates);
    }
  }

  static callTargetEnter(response) {
    const { callbacks, targetStates } = stateValues;
    if (callbacks.targetEnter && typeof callbacks.targetEnter === "function") {
      callbacks.targetEnter(response, targetStates);
    }
  }

  static registerObserversAbove() {
    const { targetsOffsetHeight, viewPortHeight, offsetMargin } = stateValues;
    const { observers, targets } = stateValues;
    if (observers.above[0])
      observers.above.forEach(observer => observer.disconnect());
    observers.above = targets.map((target, index) => {
      const marginTop = targetsOffsetHeight[index];
      const marginBottom = -viewPortHeight + offsetMargin;
      const rootMargin = `${marginTop}px 0px ${marginBottom}px 0px`;
      const options = {
        root: null,
        rootMargin,
        threshold: 0
      };
      const observer = new IntersectionObserver(
        Callback.intersectTargetAbove,
        options
      );
      observer.observe(target);
      return observer;
    });
  }

  static registerObserversBelow() {
    const { targetsOffsetHeight, viewPortHeight, offsetMargin } = stateValues;
    const { observers, targets, pageHeight } = stateValues;
    if (observers.below[0])
      observers.below.forEach(observer => observer.disconnect());
    observers.below = targets.map((target, index) => {
      const marginTop = -offsetMargin;
      const marginBottom =
        pageHeight - viewPortHeight + targetsOffsetHeight[index] + offsetMargin;
      const rootMargin = `${marginTop}px 0px ${marginBottom}px 0px`;
      const options = {
        root: null,
        rootMargin,
        threshold: 0
      };
      const observer = new IntersectionObserver(
        Callback.intersectTargetBelow,
        options
      );
      observer.observe(target);
      return observer;
    });
  }

  static registerObserverOnViewPortAbove() {
    const { targetsOffsetHeight, viewPortHeight, offsetMargin } = stateValues;
    const { observers, targets } = stateValues;
    if (observers.viewportAbove[0])
      observers.viewportAbove.forEach(observer => observer.disconnect());
    observers.viewportAbove = targets.map((target, index) => {
      const marginTop = targetsOffsetHeight[index];
      const marginBottom = -(
        viewPortHeight -
        offsetMargin +
        targetsOffsetHeight[index]
      );
      const rootMargin = `${marginTop}px 0px ${marginBottom}px 0px`;
      const options = {
        root: null,
        rootMargin,
        threshold: 0
      };
      const observer = new IntersectionObserver(
        Callback.intersectViewportAbove,
        options
      );
      observer.observe(target);
      return observer;
    });
  }

  static registerObserverOnViewPortBelow() {
    const { targetsOffsetHeight, pageHeight, offsetMargin } = stateValues;
    const { observers, targets, targetsOffsetTop } = stateValues;
    if (observers.viewportBelow[0]);
    observers.viewportBelow.forEach(observer => observer.disconnect());
    observers.viewportBelow = targets.map((target, index) => {
      const marginTop = -(offsetMargin + targetsOffsetHeight[index]);
      const marginBottom =
        pageHeight -
        targetsOffsetTop[index] -
        targetsOffsetHeight[index] -
        offsetMargin;
      const rootMargin = `${marginTop}px 0px ${marginBottom}px 0px`;
      const options = {
        root: null,
        rootMargin,
        threshold: 0
      };
      const observer = new IntersectionObserver(
        Callback.intersectViewportBelow,
        options
      );
      observer.observe(target);
      return observer;
    });
  }

  static unregisterObservers() {
    const { observers } = stateValues;
    if (observers.above[0])
      observers.above.forEach(observer => observer.disconnect());
    if (observers.below[0])
      observers.below.forEach(observer => observer.disconnect());
    if (observers.viewportAbove[0])
      observers.viewportAbove.forEach(observer => observer.disconnect());
    if (observers.viewportBelow[0])
      observers.viewportBelow.forEach(observer => observer.disconnect());
  }

  static updateTargetStateMode(index, mode) {
    if (!stateValues.targetStates[index])
      throw new Error("The element with the provided index has no state data");
    stateValues.targetStates[index].mode = mode;
  }

  static updateTargetStateDirection(index, direction) {
    if (!stateValues.targetStates[index])
      throw new Error("The element with the provided index has no state data");
    stateValues.targetStates[index].direction = direction;
  }
}
