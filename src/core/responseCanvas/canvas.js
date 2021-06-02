import { Observer } from "./observer";
import { Debugger } from "./debugger";
import { State } from "./state";

export class ResponseCanvas {
  static unmountObservers() {
    State.unregisterObservers();
    return this;
  }

  static setUp({ targets, canvasClass, offset = 0.47, debug = false }) {
    State.canvasClass = canvasClass;
    State.offsetValue = offset;
    State.targets = targets;
    State.debugMode = debug;
    setUpDebugMode();
    State.addIndexDateToTargets();
    State.setTargetStates();
    initialize();
    return this;
  }

  static onTargetEnter(cb) {
    State.registerTargetEnter(cb);
    return this;
  }

  static onTargetExit(cb) {
    State.registerTargetExit(cb);
    return this;
  }
}

function initialize() {
  // Warning order of initialization is important
  State.setViewPortHeight();
  State.setPageHeight();
  State.setOffsetMargin();
  State.setTargetsOffsetHeight();
  State.setTargetsOffsetTop();
  Observer.registerAll();

  if (State.debugMode) {
    Debugger.updateOffset(State.offsetMargin);
  }
}

function setUpDebugMode() {
  const { offsetValue, targets, debugMode } = State;
  if (debugMode) Debugger.setup({ offsetValue, targets });
}
