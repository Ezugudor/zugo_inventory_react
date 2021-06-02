import { Notifier } from "./notifier";
import { Helper } from "./helper";
import { State } from "./state";

export class Callback {
  // if TOP edge of target crosses threshold,
  // bottom must be > 0 which means it is on "screen" (shifted by offset)
  static intersectTargetAbove(entries) {
    Helper.updateDirection();
    entries.forEach(entry => {
      const { isIntersecting, boundingClientRect, target } = entry;
      // bottom is how far bottom edge of target element is from top of viewport
      const { bottom, height } = boundingClientRect;
      const bottomAdjusted = bottom - State.offsetMargin;
      const targetIndex = Helper.getIndex(target);
      const targetState = State.targetStates[targetIndex];
      if (bottomAdjusted >= -State.ZERO_MOE) {
        if (
          isIntersecting &&
          State.direction === "down" &&
          targetState.mode !== "enter"
        ) {
          Notifier.notifyTargetEnter(target, State.direction);
        } else if (
          !isIntersecting &&
          State.direction === "up" &&
          targetState.mode === "enter"
        ) {
          Notifier.notifyTargetExit(target, State.direction);
        } else if (
          !isIntersecting &&
          bottomAdjusted >= height &&
          State.direction === "down" &&
          targetState.mode === "enter"
        ) {
          Notifier.notifyTargetExit(target, State.direction);
        }
      }
    });
  }

  static intersectTargetBelow(entries) {
    Helper.updateDirection();
    entries.forEach(entry => {
      const { isIntersecting, boundingClientRect, target } = entry;
      const { bottom, height } = boundingClientRect;
      const bottomAdjusted = bottom - State.offsetMargin;
      const targetIndex = Helper.getIndex(target);
      const targetState = State.targetStates[targetIndex];

      if (
        bottomAdjusted >= -State.ZERO_MOE &&
        bottomAdjusted < height &&
        isIntersecting &&
        State.direction === "up" &&
        targetState.mode !== "enter"
      ) {
        Notifier.notifyTargetEnter(target, State.direction);
      } else if (
        bottomAdjusted <= State.ZERO_MOE &&
        !isIntersecting &&
        State.direction === "down" &&
        targetState.mode === "enter"
      ) {
        Notifier.notifyTargetExit(target, State.direction);
      }
    });
  }

  /*
	if there is a scroll event where a target never intersects (therefore
	skipping an enter/exit trigger), use this fallback to detect if it is
	in view
  */

  static intersectViewportAbove(entries) {
    Helper.updateDirection();
    entries.forEach(entry => {
      const { isIntersecting, target } = entry;
      const index = Helper.getIndex(target);
      const targetState = State.targetStates[index];
      if (
        isIntersecting &&
        State.direction === "down" &&
        targetState.state !== "enter" &&
        targetState.direction !== "down"
      ) {
        Notifier.notifyTargetEnter(target, "down");
        Notifier.notifyTargetExit(target, "down");
      }
    });
  }

  static intersectViewportBelow(entries) {
    Helper.updateDirection();
    entries.forEach(entry => {
      const { isIntersecting, target } = entry;
      const index = Helper.getIndex(target);
      const targetState = State.targetStates[index];
      if (
        isIntersecting &&
        State.direction === "up" &&
        targetState.state !== "enter" &&
        targetState.direction !== "up"
      ) {
        Notifier.notifyTargetEnter(target, "up");
        Notifier.notifyTargetExit(target, "up");
      }
    });
  }
}
