export default {
  items: {
    permission: 'iredeems.items.manage',
    activated: true,
    path: '/iredeems/items/index',
    name: 'qredeems.admin.items.index',
    page: () => import('@imagina/qredeems/_layouts/admin/items/index'),
    layout: () => import('src/layouts/master'),
    title: 'qredeems.sidebar.adminItems',
    icon: 'apps',
    authenticated: true
  },
  redeems: {
    permission: 'iredeems.redeems.manage',
    activated: true,
    path: '/iredeems/redeems/index',
    name: 'qredeems.admin.redeems.index',
    page: () => import('@imagina/qredeems/_layouts/admin/redeems/index'),
    layout: () => import('src/layouts/master'),
    title: 'qredeems.sidebar.adminRedeems',
    icon: 'transfer_within_a_station',
    authenticated: true
  },

}
