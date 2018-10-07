import {SET_RESULTS} from "../actions/actionTypes"

export default (results = {}, action) => {
    switch (action.type) {
        case SET_RESULTS:
            return action.results

        default:
            return results
    }
}
