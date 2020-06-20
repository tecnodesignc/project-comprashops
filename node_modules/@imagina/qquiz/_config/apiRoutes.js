const moduleName = 'iquiz';
const moduleVersion = 'v1';
const urlBase = `/${moduleName}/${moduleVersion}`


export default {
  urlBase : urlBase,
  version: moduleVersion,
  polls: `${urlBase}/polls`,
  questions: `${urlBase}/questions`,
  answers: `${urlBase}/answers`,
  userQuestionAnswers: `${urlBase}/user-question-answers`,
  userPolls: `${urlBase}/user-polls`,
}
