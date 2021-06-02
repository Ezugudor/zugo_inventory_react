export const getNote = response => {
  return response.notes.length
    ? response.notes[response.notes.length - 1].note
    : null;
};

export const sortNotes = notes => {
  const items = [...notes];
  return items.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
};
