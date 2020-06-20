const moduleName = 'itrivia';
const moduleVersion = 'v1';
const urlBase = `/${moduleName}/${moduleVersion}`


export default {
  urlBase : urlBase,
  version: moduleVersion,
  trivias: `${urlBase}/trivias`,
  questions: `${urlBase}/questions`,
  answers: `${urlBase}/answers`,
  rangepoints: `${urlBase}/range-points`,
  userQuestionAnswers: `${urlBase}/user-question-answers`,
  userTrivias: `${urlBase}/user-trivias`,
}
