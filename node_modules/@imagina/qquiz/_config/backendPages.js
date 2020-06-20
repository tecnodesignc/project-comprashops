export default {
  polls: {
    permission: 'iquiz.polls.manage',
    activated: true,
    path: '/iquiz/polls/index',
    name: 'qquiz.admin.polls.index',
    page: () => import('@imagina/qquiz/_layouts/admin/polls/index'),
    layout: () => import('src/layouts/master'),
    title: 'qquiz.sidebar.adminPolls',
    icon: 'fas fa-poll',
    authenticated: true
  },
  questions: {
    permission: 'iquiz.questions.manage',
    activated: true,
    path: '/iquiz/questions/index/poll/:id',
    name: 'qquiz.admin.questions.index',
    page: () => import('@imagina/qquiz/_layouts/admin/questions/index'),
    layout: () => import('src/layouts/master'),
    title: 'qquiz.sidebar.adminQuestions',
    icon: 'fas fa-question-circle',
    authenticated: true
  },
  answers: {
    permission: 'iquiz.answers.manage',
    activated: true,
    path: '/iquiz/answers/index/question/:id',
    name: 'qquiz.admin.answers.index',
    page: () => import('@imagina/qquiz/_layouts/admin/answers/index'),
    layout: () => import('src/layouts/master'),
    title: 'qquiz.sidebar.adminAnswers',
    icon: 'fas fa-question-circle',
    authenticated: true
  },
  
}
