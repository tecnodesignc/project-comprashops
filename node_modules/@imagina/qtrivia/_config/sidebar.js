const pages = config('pages') // Get Pages from config

//Quizs
export default [
  {
    title: 'qtrivia.sidebar.adminGroup',
    icon: 'fas fa-brain',
    children: [
      pages.qtrivia.trivias, // trivia setup
      //pages.qtrivia.questions,
      //pages.qtrivia.answers,
    ]
  },
]
