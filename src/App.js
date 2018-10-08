import React, {Component} from 'react'
import './App.css'
import {Route, Router} from 'react-router'
import {Col} from 'reactstrap'

import {getHistory} from './routes/history'
import Home from './components/Home'
import ResultsForm from './components/ResultsForm'
import SearchForm from './components/SearchForm'


class App extends Component {
    render() {
        return (
            <Router history={getHistory()}>
                <Col sm="12" lg={{size: 8, offset: 2}} className='mt-5'>
                    <Route path="/" component={SearchForm}/>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/results" component={ResultsForm}/>
                </Col>
            </Router>
        )
    }
}

export default App
