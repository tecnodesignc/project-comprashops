import cache from '@imagina/qhelper/_plugins/cache'
import axios from 'axios'
import config from '@imagina/qsite/_config/master/index'
import crud from '@imagina/qcrud/_services/baseService'
import Quasar from 'quasar'
import array from '@imagina/qhelper/_plugins/array'

//Define slected store
export const SET_STORE = ({commit, dispatch, state, rootState}, storeId = false) => {
   return new Promise(async resolve => {
      if (rootState.quserAuth.authenticated) {
         let storeSelected = storeId

         //Search store in cache or Store
         if (!storeSelected) {
            storeSelected = await cache.get.item('marketplace.store.selected')
            if (!storeSelected && state.userStores.length) storeSelected = state.userStores[0].id
         }
         //Set selected store in cache and store
         if (storeSelected) {
            commit('SET_STORE_SELECTED', storeSelected)
            cache.set('marketplace.store.selected', storeSelected)
         }
      }
      //Resolve promise
      resolve(true)
   })
}

//Get suer Stores
export const GET_USER_STORES = ({commit, dispatch, state, rootState}) => {
   return new Promise((resolve, reject) => {
      if (rootState.quserAuth.authenticated) {
         let params = {
            refresh: true,
            params: {filter: {user: rootState.quserAuth.userId}}
         }

         //Request
         crud.index('apiRoutes.qmarketplace.store', params).then(response => {
            if (response.data.length) {
               commit('SET_USER_STORES', response.data)
            } else {
               commit('SET_USER_STORES', [])
            }
            resolve(response.data)
         }).catch(error => resolve([]))
      } else resolve([])
   })
}
