const find = (collection, id) => {
  return collection.find(item => item._id === id);
};

export const getContent = (id, type, state) => {
  if (type === "unread") {
    return find(state.response.unread.result, id);
  }
  if (type === "withnotes") {
    return find(state.response.noted.result, id);
  }
  if (type === "processed") {
    return find(state.response.processed.result, id);
  }
  return null;
};
