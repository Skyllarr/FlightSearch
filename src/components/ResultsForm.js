import React from 'react'
import {connect} from "react-redux"
import {Table} from 'reactstrap'
import './ResultsForm.css'
import {setCurrency, setResults} from "../actions/actionCreators"

class ResultsForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            results: props.results
        }
    }

    render() {
        return (
            <div>
                <div className="container mt-5 table-wrapper-scroll-y">

                        <Table striped>
                            <thead>
                            <tr>
                                <th>Date</th>
                                <th>From</th>
                                <th>To</th>
                                <th>Price in {this.props.currency}</th>
                            </tr>
                            </thead>
                            {this.props.results && this.props.results[0] ?
                            <tbody className="table-scroller">{this.props.results.map(function (item, key) {
                                return (
                                    <tr key={key}>
                                        <td>{new Date(item.dTimeUTC * 1000).toString()}</td>
                                        <td>{item.cityFrom}</td>
                                        <td>{item.cityTo}</td>
                                        <td>{item.price}</td>
                                    </tr>
                                )

                            })}</tbody>: null}
                        </Table>
                </div>
            </div>
        )
    }
}

export default connect(
    (state) => ({
        results: state.results,
        errorMessage: state.errorMessage,
        currency: state.currency,
    }),
    (dispatch) => ({
        setResults: (results) => dispatch(setResults(results)),
        setCurrency: (currency) => dispatch(setCurrency(currency))
    })
)(ResultsForm)
