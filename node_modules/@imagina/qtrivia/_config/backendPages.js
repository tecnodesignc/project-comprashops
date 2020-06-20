export default {
  trivias: {
    permission: 'itrivia.trivias.manage',
    activated: true,
    path: '/itrivia/trivias/index',
    name: 'qtrivia.admin.trivias.index',
    page: () => import('@imagina/qtrivia/_layouts/admin/trivias/index'),
    layout: () => import('src/layouts/master'),
    title: 'qtrivia.sidebar.adminTrivias',
    icon: 'fas fa-brain',
    authenticated: true
  },
  
  questions: {
    permission: 'itrivia.questions.manage',
    activated: true,
    path: '/itrivia/questions/index/trivia/:id',
    name: 'qtrivia.admin.questions.index',
    page: () => import('@imagina/qtrivia/_layouts/admin/questions/index'),
    layout: () => import('src/layouts/master'),
    title: 'qtrivia.sidebar.adminQuestions',
    icon: 'fas fa-question-circle',
    authenticated: true
  },
  answers: {
    permission: 'itrivia.answers.manage',
    activated: true,
    path: '/itrivia/answers/index/question/:id',
    name: 'qtrivia.admin.answers.index',
    page: () => import('@imagina/qtrivia/_layouts/admin/answers/index'),
    layout: () => import('src/layouts/master'),
    title: 'qtrivia.sidebar.adminAnswers',
    icon: 'fas fa-question-circle',
    authenticated: true
  },
  rangepoints: {
    permission: 'itrivia.rangepoints.manage',
    activated: true,
    path: '/itrivia/rangepoints/index/trivia/:id',
    name: 'qtrivia.admin.rangepoints.index',
    page: () => import('@imagina/qtrivia/_layouts/admin/rangepoints/index'),
    layout: () => import('src/layouts/master'),
    title: 'qtrivia.sidebar.adminRangepoints',
    icon: 'fas fa-award',
    authenticated: true
  },

}
