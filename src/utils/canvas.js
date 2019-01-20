export const getFirstSection = formQuestions => {
  return formQuestions.find(question => question.type === "section");
};

export const getNextSection = (formQuestions, currentQuestionId) => {
  const currentQuestionIndex = formQuestions.findIndex(
    question => question.id === currentQuestionId
  );
  const nextQuestion = formQuestions[currentQuestionIndex + 1];
  return nextQuestion.type === "section" ? nextQuestion : null;
};
