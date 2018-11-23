import { Helper } from "./helper";
import { State } from "./state";

export class Notifier {
  static notifyTargetEnter = (element, direction, check = true) => {
    const index = Helper.getIndex(element);
    const response = { element, index, direction };
    State.updateTargetStateDirection(index, direction);
    State.updateTargetStateMode(index, "enter");

    if (check && direction === "down") {
      notifyOthers(index, "above");
    }
    if (check && direction === "up") {
      notifyOthers(index, "below");
    }

    State.callTargetEnter(response);
  };

  static notifyTargetExit = (element, direction) => {
    const index = Helper.getIndex(element);
    const response = { element, index, direction };

    State.updateTargetStateDirection(index, direction);
    State.updateTargetStateMode(index, "exit");
    State.callTargetExit(response);
  };
}

function notifyOthers(index, location) {
  const { targets, targetStates } = State;
  if (location === "above") {
    // check if targets below were skipped and notified first
    for (let i = 0; i < index; i++) {
      const targetState = targetStates[i];
      if (targetState.mode === "enter")
        Notifier.notifyTargetEnter(targets[i], "down");
      if (targetState.direction === "up") {
        Notifier.notifyTargetEnter(targets[i], "down", false);
        Notifier.notifyTargetExit(targets[i], "down");
      }
    }
  } else if (location === "below") {
    // check if targets above were skipped and notified first
    const len = targetStates.length;
    for (let i = len - 1; i > index; i--) {
      const targetState = targetStates[i];
      if (targetState.state === "enter")
        Notifier.notifyTargetExit(targets[i], "up");
      if (targetState.direction === "down") {
        Notifier.notifyTargetEnter(targets[i], "up", false);
        Notifier.notifyTargetExit(targets[i], "up");
      }
    }
  }
}
