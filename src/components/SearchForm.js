import React from 'react'
import {Button, Col, Form, Input, Label, Row} from 'reactstrap'

import DatePicker from 'react-datepicker'
import moment from 'moment'

import 'react-datepicker/dist/react-datepicker.css'
import Suggestions from './Suggestions'
import ErrorBar from './ErrorBar'
import {nextPath} from '../routes/history'
import {connect} from 'react-redux'
import {setCurrency, setErrorMessage, setResults, setLoadingResults} from "../actions/actionCreators"
import {getFlights, getSuggestions} from "../apiUtils/requests"

class SearchForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            date: moment(),
            from: "",
            fromApiId: "",
            to: "",
            toApiId: "",
            suggestionsFrom: [],
            suggestionsTo: [],
        }
    }

    handleDateChange = (date) => {
        this.setState({
            date: date
        })
    }

    handlePickedSuggestion = (inputField, value, id) => {
        let suggestions
        inputField === "from" ? suggestions = "suggestionsFrom" : suggestions = "suggestionsTo"
        let idToUpdate
        inputField === "from" ? idToUpdate = "fromApiId" : idToUpdate = "toApiId"
        this.setState({
            [inputField]: value,
            [suggestions]: [],
            [idToUpdate]: id
        })
    }

    handleInputChange = (inputField, event) => {
        const value = event.target.value
        this.setState({[inputField]: value})
        if (value.length > 1) {
            getSuggestions(value)
                .then(({data}) => {
                    inputField === "from" ? inputField = "suggestionsFrom" : inputField = "suggestionsTo"
                    this.setState({
                        [inputField]: data
                    })
                    this.setInputFromSuggestions(inputField, value)
                })
        }
    }

    setInputFromSuggestions = (suggestionsField, value) => {
        let suggestions = suggestionsField === "suggestionsFrom" ? this.state.suggestionsFrom : this.state.suggestionsTo
        if (suggestions) {
            let found = suggestions.find((elem) => {
                return elem.value === value
            })
            if (found) {
                this.handlePickedSuggestion(suggestionsField === "suggestionsFrom" ? "from" : "to", found.value, found.id)
            }
        }
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.setErrorMessage("")

        if (!this.state.fromApiId || !this.state.toApiId) {
            this.props.setErrorMessage("Please choose from the suggestions.")
            return
        }

        this.props.setLoadingResults(true)
        getFlights(this.state.fromApiId, this.state.toApiId, this.state.date.format('DD/MM/YYYY'))
            .then(({data}) => {
                this.setState({
                    data: data.data
                })
                this.props.setResults(data.data)
                this.props.setCurrency(data.currency)
                nextPath('results')
                this.props.setLoadingResults(false)
            })
            .catch(() => {
                this.props.setErrorMessage("Oopps.. Something went wrong. Search results not loaded.")
                this.props.setLoadingResults(false)
            })
    }

    render() {
        const error = this.props.errorMessage ?
            <ErrorBar appError={this.props.errorMessage} dismissError={() => {
                this.props.setErrorMessage("")
            }}/> : null
        return (
            <Col>
                {error}
                <Form onSubmit={this.handleSubmit}>
                    <Row>
                        <Label for="from" className="ml-xs-3 ml-sm-3 ml-lg-0 col-form-label">From:</Label>
                        <Col lg={3}>
                            <Input type="text"
                                   className="form-control"
                                   id="from"
                                   value={this.state.from}
                                   onChange={(e) => this.handleInputChange("from", e)}
                                   required/>
                            <Suggestions suggestions={this.state.suggestionsFrom} name="from"
                                         handlePickedSuggestion={this.handlePickedSuggestion}/>
                        </Col>
                        <Label for="to" className="ml-xs-3 ml-sm-3 ml-lg-0 col-form-label">To:</Label>
                        <Col lg={3}>
                            <Input type="text"
                                   className="form-control"
                                   id="to"
                                   value={this.state.to}
                                   onChange={(e) => this.handleInputChange("to", e)}
                                   required/>
                            <Suggestions suggestions={this.state.suggestionsTo} name="to"
                                         handlePickedSuggestion={this.handlePickedSuggestion}/>
                        </Col>
                        <Label for="date" className="ml-xs-3 ml-sm-3 ml-lg-0 col-form-label">Date:</Label>
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
        setErrorMessage: (errorMessage) => dispatch(setErrorMessage(errorMessage)),
        setLoadingResults: (loadingResults) => dispatch(setLoadingResults(loadingResults))
    })
)(SearchForm)
