export const getNote = response => {
  return response.notes[0] ? response.notes[0].note : null;
};

export const sortNotes = notes => {
  const items = [...notes];
  return items.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
};
