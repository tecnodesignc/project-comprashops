
export default {
  index: {
    permission: null,
    activated: true,
    path: 'tiendas/categoria/:slug',
    name: 'stores.index',
    page: () => import('@imagina/qmarketplace/_layouts/frontend/store/index'),
    layout: () => import('src/layouts/master'),
    title: 'qmarketplace.layout.store',
    icon: 'fas fa-layer-group',
    //authenticated: true
  },
  store: {
    permission: null,
    activated: true,
    path: 'tienda/:slug',
    name: 'stores.show',
    page: () => import('@imagina/qmarketplace/_layouts/frontend/store/show'),
    layout: () => import('src/layouts/master'),
    title: 'qmarketplace.layout.store',
    icon: 'fas fa-layer-group',
    //authenticated: true
  },
  checkout: {
    permission: null,
    activated: true,
    path: 'tienda/:slug/checkout/',
    name: 'marketplace.checkout',
    page: () => import('@imagina/qmarketplace/_layouts/frontend/store/checkout/index'),
    layout: () => import('src/layouts/master'),
    title: 'qmarketplace.sidebar.checkout',
    icon: 'fas fa-layer-group',
    //authenticated: true
  },
  about: {
    permission: null,
    activated: true,
    path: 'tienda/:slug/nosotros',
    name: 'stores.about',
    page: () => import('@imagina/qmarketplace/_layouts/frontend/store/about'),
    layout: () => import('src/layouts/master'),
    title: 'qmarketplace.sidebar.aboutAs',
    icon: 'fas fa-layer-group',
    //authenticated: true
  },
  wishList: {
    permission: null,
    activated: true,
    path: 'tienda/:slug/wish-list',
    name: 'stores.product.wishlist',
    page: () => import('@imagina/qmarketplace/_layouts/frontend/store/products/wishlist'),
    layout: () => import('src/layouts/master'),
    title: 'qmarketplace.layout.wishList',
    icon: 'fas fa-layer-group',
    //authenticated: true
  },
  product: {
    permission: null,
    activated: true,
    path: 'tienda/:slug/:product',
    name: 'stores.product.show',
    page: () => import('@imagina/qmarketplace/_layouts/frontend/store/products/show'),
    layout: () => import('src/layouts/master'),
    title: 'qmarketplace.layout.store',
    icon: 'fas fa-layer-group',
    //authenticated: true
  },
  category: {
    permission: null,
    activated: true,
    path: 'tienda/:slug/categoria/:category',
    name: 'stores.product.index',
    page: () => import('@imagina/qmarketplace/_layouts/frontend/store/products/index'),
    layout: () => import('src/layouts/master'),
    title: 'qmarketplace.layout.store',
    icon: 'fas fa-layer-group',
    //authenticated: true
  },

  products: {
    permission: null,
    activated: true,
    path: 'tienda/:slug/products/:search',
    name: 'stores.products.all',
    page: () => import('@imagina/qmarketplace/_layouts/frontend/store/products/all'),
    layout: () => import('src/layouts/master'),
    title: 'qmarketplace.layout.store',
    icon: 'fas fa-layer-group',
    //authenticated: true
  },
  bestCompany: {
    permission: null,
    activated: true,
    path: 'mejores-empresas',
    name: 'stores.best-company.search',
    page: () => import('@imagina/qmarketplace/_layouts/frontend/general/bestCompanies'),
    layout: () => import('src/layouts/master'),
    title: 'qmarketplace.layout.bestCompany',
    icon: 'fas fa-layer-group',
    //authenticated: true
  },

}
