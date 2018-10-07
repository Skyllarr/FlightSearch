import React, {Component} from 'react'
import './App.css'
import {Route, Router} from 'react-router'
import {Col} from 'reactstrap'

import history from './routes/history'
import Home from './components/Home'


class App extends Component {
    render() {
        return (
            <Router history={history}>
                <Col sm="12" lg={{size: 8, offset: 2}} className='mt-5'>
                    <Route exact path="/" component={Home}/>
                </Col>
            </Router>
        )
    }
}

export default App
