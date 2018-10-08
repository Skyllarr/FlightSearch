import {API_URL} from "./Urls"
import axios from "axios/index"

export function getSuggestions(value) {
    return axios.get(`${API_URL}places?term=${value}&v=2&locale=en`)
}

export function getFlights(from, to, date) {
    return axios.get(`${API_URL}flights?v=2&locale=en&flyFrom=${from}&to=${to}&dateFrom=${date}`)
}
