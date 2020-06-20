const pages = config('pages') // Get Pages from config

//Quizs
export default [
  {
    title: 'qredeems.sidebar.adminGroup',
    icon: 'control_point',
    children: [
      pages.qredeems.items, // items setup
      pages.qredeems.redeems,
    ]
  },
]
