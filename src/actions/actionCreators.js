import {SET_CURRENCY, SET_ERROR, SET_RESULTS,} from './actionTypes'

export const setResults = results => ({
    type: SET_RESULTS,
    results,
})

export const setErrorMessage = errorMessage => ({
    type: SET_ERROR,
    errorMessage,
})

export const setCurrency = currency => ({
    type: SET_CURRENCY,
    currency,
})
