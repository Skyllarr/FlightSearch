import React, {Component} from 'react'
import './App.css'
import {Router, Route} from 'react-router'

import history from './routes/history'
import Home from './components/Home'


class App extends Component {
    render() {
        return (
            <Router history={history}>
                <Route exact path="/" component={Home}/>
            </Router>
        )
    }
}

export default App
