export const saveStateToStorage = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("swyp-state", serializedState);
  } catch (err) {
    console.error("Error saving state");
  }
};

export const loadStateFromStorage = () => {
  try {
    const serializedState = localStorage.getItem("swyp-state");
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Error fetching state from storage");
  }
};

export const updateState = (oldState, newValues) => {
  return { ...oldState, ...newValues };
};
