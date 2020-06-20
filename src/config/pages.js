import corePages from '@imagina/qsite/_config/master/pages'//Core pages [Do not remove]

let responsePages = {
  ...corePages,
  //Add here more pages...#example
 store : {
    category: {//Page home
      permission: 'icommence.category.index',
      activated: true,
      path: '/catogory/:slug',
      name: 'store.category',
      layout: () => import('src/layouts/master'),
      page: () => import('src/pages/front/store/index'),
      title: 'app.layout.page.category',
      icon: 'icon name',
      authenticated: false
    }
  }
}

//======= Add or update pages
//#example: responsePages.<title-page> = <'title'>

export default responsePages
