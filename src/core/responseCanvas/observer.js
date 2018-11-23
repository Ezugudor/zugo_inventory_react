import { State } from "./state";

export class Observer {
  static registerAll() {
    State.registerObserverOnViewPortAbove();
    State.registerObserverOnViewPortBelow();
    State.registerObserversAbove();
    State.registerObserversBelow();
  }
}
