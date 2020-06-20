const pages = config('pages') // Get Pages from config

//Quizs
export default [
  {
    title: 'qquiz.sidebar.adminGroup',
    icon: 'fas fa-poll',
    children: [
      pages.qquiz.polls, // poll setup
      //pages.qquiz.questions,
      //pages.qquiz.answers,
    ]
  },
]
