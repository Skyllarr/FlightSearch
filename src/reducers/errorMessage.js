import {SET_ERROR} from "../actions/actionTypes"

export default (errorMessage = "", action) => {
    switch (action.type) {
        case SET_ERROR:
            return action.errorMessage

        default:
            return errorMessage
    }
}
