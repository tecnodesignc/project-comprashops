export default {
  analytics: {
    permission: 'ianalytics.analytics.manage',
    activated: true,
    path: '/qanalytics/analytics',
    name: 'qanalytics.admin.analytics.index',
    page: () => import('@imagina/qanalytics/_pages/admin/google-analytics/index'),
    layout: () => import('src/layouts/admin'),
    title: 'qcommerce.sidebar.adminCategories',
    icon: 'fas fa-layer-group',
    authenticated: true,
  },

  //create
}
