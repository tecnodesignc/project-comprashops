const pages = config('pages') // Get Pages from config

//Marketplace
export default [
   {
      title: 'qmarketplace.sidebar.adminMarketplace',
      icon: 'fas fa-map-marked-alt',
      children: [
         pages.qmarketplace.stores, // my Stores setup
         pages.qmarketplace.categories, // categories
         pages.qmarketplace.themes, // themes
      ]
   },
   pages.qmarketplace.myStore, // themes
   pages.qmarketplace.myStoreTheme, // themes
   {
      title: 'qmarketplace.sidebar.products',
      icon: 'fas fa-shopping-basket',
      children: [
         pages.qmarketplace.myStoreProducts, // themes
         pages.qmarketplace.myStoreCategoryProducts, // categoriesStore
      ]
   },
   {
      title: 'qmarketplace.sidebar.business.services',
      icon: 'fas fa-shopping-basket',
      children: [
         pages.qmarketplace.myStoreServices, // themes
         pages.qmarketplace.myStoreServicesCategory, // categoriesStore
      ]
   },
   pages.qmarketplace.favoriteUsers, // Seguidores
   pages.qmarketplace.myStorePolls, // orders
   pages.qmarketplace.myStoreReport,
   pages.qmarketplace.myStoreOrders, // orders
   pages.qmarketplace.coupons, // Coupons
   pages.qmarketplace.myNotifications,
   pages.qmarketplace.myChatMessages,
   pages.qmarketplace.myBannersIndex,
   pages.qmarketplace.mySubscription,
   pages.qmarketplace.myStoreContacts,
   {
      title: 'qmarketplace.sidebar.business.levels',
      icon: 'fas fa-shopping-basket',
      children: [
         pages.qmarketplace.levels,
         pages.qmarketplace.levelTypes,
         pages.qmarketplace.levelsCriteria,
         pages.qmarketplace.benefits,
      ]
   },
]
