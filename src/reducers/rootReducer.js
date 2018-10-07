import {combineReducers} from 'redux'
import errorMessage from './errorMessage'
import results from './results'
import currency from './currency'

export default combineReducers({
    results,
    errorMessage,
    currency,
})
