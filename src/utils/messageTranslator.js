export const messageTranslator = message => {
  const testPattern = /^E\d+/;
  if (testPattern.test(message)) {
    const dirtymMessage = getStringBtwBoundry("{", "}", message);
    const cleanMessage = getStringBtwBoundry('"', '"', dirtymMessage);
    return `Business name ${cleanMessage} is already taken`;
  }
  return message;
};

const getStringBtwBoundry = (startWhere, endWhere, string) => {
  const start = string.indexOf(startWhere) + 1;
  const end = string.lastIndexOf(endWhere);
  return string.slice(start, end);
};
