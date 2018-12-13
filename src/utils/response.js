export const getNote = response => {
  return response.notes[0] ? response.notes[0].note : null;
};
