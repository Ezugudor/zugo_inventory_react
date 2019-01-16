/**
 * Check if question intro section has a child component
 * @param {array} questionIntro
 * @param {string} childName
 */
export const hasChild = (questionIntro, childName) => {
  const childIndex = questionIntro.children.findIndex(
    child => child.name === childName
  );
  return childIndex > -1;
};

/**
 * get the index of a question intro child
 * @param {array} questionIntro
 * @param {string} childName
 */
export const getChildIndex = (questionIntro, childName) => {
  return questionIntro.children.findIndex(child => child.name === childName);
};
