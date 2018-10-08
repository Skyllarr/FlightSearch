import {SET_LOADING_RESULTS} from "../actions/actionTypes"

export default (loadingResults = false, action) => {
    switch (action.type) {
        case SET_LOADING_RESULTS:
            return action.loadingResults

        default:
            return loadingResults
    }
}
