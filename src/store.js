import {createStore} from 'redux'

import rootReducer from "./reducers/rootReducer"

let store

export function getStore() {
    if (!store) {
        store = createStore(rootReducer)
    }
    return store
}
