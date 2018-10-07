import React from 'react'
import {Button, Col, Form, Input, Label, Row} from 'reactstrap'

import DatePicker from 'react-datepicker'
import moment from 'moment'

import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'
import {API_URL} from "../apiUtils/Urls"
import Suggestions from './Suggestions'
import ErrorBar from './ErrorBar'
import history from '../routes/history'
import {connect} from 'react-redux'
import {setCurrency, setErrorMessage, setResults} from "../actions/actionCreators"

class SearchForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            date: moment(),
            from: "",
            fromId: "",
            to: "",
            toId: "",
            suggestionsFrom: "",
            suggestionsTo: "",
            errorMessage: "",
        }
        this.handleDateChange = this.handleDateChange.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handlePickedSuggestion = this.handlePickedSuggestion.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleDateChange(date) {
        this.setState({
            date: date
        })
    }

    handlePickedSuggestion(name, value, id) {
        let suggestions
        name === "from" ? suggestions = "suggestionsFrom" : suggestions = "suggestionsTo"
        let idToUpdate
        name === "from" ? idToUpdate = "fromId" : idToUpdate = "toId"
        this.setState({[name]: value, [suggestions]: "", [idToUpdate]: id})
    }

    handleInputChange = (name, event) => {
        const value = event.target.value
        this.setState({[name]: value}, () => {
            if (value.length > 1) {
                this.getSuggestions(name, value)
            }
        })
    }

    getSuggestions = (name, value) => {
        axios.get(`${API_URL}places?term=${value}&v=2&locale=en`)
            .then(({data}) => {
                name === "from" ? name = "suggestionsFrom" : name = "suggestionsTo"
                this.setState({
                    [name]: data
                })
            })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.setErrorMessage("")
        if (!this.state.fromId || !this.state.toId) {
            this.props.setErrorMessage("Please choose from the suggestions.")
            return
        }
        axios.get(`${API_URL}flights?v=2&locale=en&flyFrom=${this.state.fromId}&to=${this.state.toId}&dateFrom=${this.state.date.format('DD/MM/YYYY')}`)
            .then(({data}) => {
                this.setState({
                    data: data.data
                })
                this.props.setResults(data.data)
                this.props.setCurrency(data.currency)
                history.push('results')
            })
            .catch(() => {
                this.props.setErrorMessage("Oopps.. Something went wrong. Search results not loaded.")
            })
    }

    render() {
        return (
            <Col>
                {this.props.errorMessage ?
                <ErrorBar appError={this.props.errorMessage} dismissError={() => {
                    this.props.setErrorMessage("")
                }}/> : null}
                <Form onSubmit={this.handleSubmit}>
                    <Row>
                        <Label for="from" className="col-form-label">From:</Label>
                        <Col lg={3}>
                            <Input type="text"
                                   className="form-control"
                                   id="from"
                                   value={this.state.from}
                                   onChange={this.handleInputChange.bind(this, "from")}
                                   required/>
                            <Suggestions suggestions={this.state.suggestionsFrom} name="from"
                                         handlePickedSuggestion={this.handlePickedSuggestion}/>
                        </Col>
                        <Label for="to" className="col-form-label">To:</Label>
                        <Col lg={3}>
                            <Input type="text"
                                   className="form-control"
                                   id="to"
                                   value={this.state.to}
                                   onChange={this.handleInputChange.bind(this, "to")}
                                   required/>
                            <Suggestions suggestions={this.state.suggestionsTo} name="to"
                                         handlePickedSuggestion={this.handlePickedSuggestion}/>
                        </Col>
                        <Label for="date" className="col-form-label">Date:</Label>
                        <Col lg={3}>
                            <DatePicker
                                className="form-control"
                                selected={this.state.date}
                                onChange={this.handleDateChange}
                                required/>
                        </Col>
                        <Col lg={1}>
                            <Button type="submit" className="btn btn-primary float-xs-right">Search</Button>
                        </Col>
                    </Row>
                </Form>
            </Col>
        )
    }
}

export default connect(
    (state) => ({
        results: state.results,
        errorMessage: state.errorMessage,
    }),
    (dispatch) => ({
        setResults: (results) => dispatch(setResults(results)),
        setCurrency: (currency) => dispatch(setCurrency(currency)),
        setErrorMessage: (errorMessage) => dispatch(setErrorMessage(errorMessage))
    })
)(SearchForm)
