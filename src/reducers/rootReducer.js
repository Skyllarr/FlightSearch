import {combineReducers} from 'redux'
import errorMessage from './errorMessage'
import results from './results'
import currency from './currency'
import loadingResults from './loadingResults'

export default combineReducers({
    results,
    errorMessage,
    currency,
    loadingResults,
})
