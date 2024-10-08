const id = "1";
export class Debugger {
  static setup({ offsetValue, targets }) {
    const targetClass = targets[0].getAttribute("class");
    setupOffset({ id, offsetValue, targetClass });
  }

  static updateOffset(offsetMargin) {
    const idVal = getOffsetId();
    const el = document.querySelector(`#${idVal}`);
    el.style.top = `${offsetMargin}px`;
  }

  static notifyStep(state) {
    const idVal = getStepId();
    const elA = document.querySelector(`#${idVal}_above`);
    const elB = document.querySelector(`#${idVal}_below`);
    const display = state === "enter" ? "block" : "none";

    if (elA) elA.style.display = display;
    if (elB) elB.style.display = display;
  }
}

function getStepId(i) {
  return `scrollama__debug-step--${id}-${i}`;
}

function getOffsetId() {
  return `scrollama__debug-offset--${id}`;
}

function setupOffset({ offsetValue, targetClass }) {
  const el = document.createElement("div");
  el.setAttribute("id", getOffsetId());
  el.setAttribute("class", "scrollama__debug-offset");

  el.style.position = "fixed";
  el.style.left = "0";
  el.style.width = "100%";
  el.style.height = "0px";
  el.style.borderTop = "2px dashed black";
  el.style.zIndex = "9999";

  const text = document.createElement("p");
  text.innerText = `".${targetClass}" trigger: ${offsetValue}`;
  text.style.fontSize = "12px";
  text.style.fontFamily = "monospace";
  text.style.color = "black";
  text.style.margin = "0";
  text.style.padding = "6px";
  el.appendChild(text);
  document.body.appendChild(el);
}
