import {createBrowserHistory} from 'history'

let history

export function getHistory() {
    if (!history) {
        history = createBrowserHistory()
    }
    return history
}

export function nextPath(path) {
    getHistory().push(path)
}
