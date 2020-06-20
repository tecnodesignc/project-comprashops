export const RESET = (state) => {
    state.userStores = []
    state.storeSelected = false
};

export function SET_STORE_SELECTED(state, data) {
    state.storeSelected = data;
}

export function SET_USER_STORES(state, data) {
  state.userStores = data;
}



