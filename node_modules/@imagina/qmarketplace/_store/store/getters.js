import array from '@imagina/qhelper/_plugins/array'
import cloneDeep from 'lodash.clonedeep'

export const userStoresSelect = (state) => {
  return array.tree(state.userStores, {label : 'name', id : 'id'})
}

