import {SET_CURRENCY} from "../actions/actionTypes"

export default (currency = "", action) => {
    switch (action.type) {
        case SET_CURRENCY:
            return action.currency

        default:
            return currency
    }
}
