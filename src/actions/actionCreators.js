import {
    SET_RESULTS,
    SET_ERROR,
    SET_CURRENCY,
} from './actionTypes'

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
