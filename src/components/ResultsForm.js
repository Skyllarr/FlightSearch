import React from 'react'
import {connect} from "react-redux"
import {Table} from 'reactstrap'
import './ResultsForm.css'
import {setCurrency, setResults} from "../actions/actionCreators"

class ResultsForm extends React.Component {

    render() {
        let loader
        let info
        let items

        if (this.props.loadingResults) {
            loader = (
                // By Ahm masum [CC BY-SA 4.0 (https://creativecommons.org/licenses/by-sa/4.0)]
                // from Wikimedia Commons (https://commons.wikimedia.org/wiki/File:Loading_icon.gif")
                <img width="256" alt="Loading icon" className="loader"
                     src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"/>
            )
        } else if (this.props.results.length > 0) {
            items = this.props.results.map((item, key) => {
                return (
                    <tr key={key}>
                        <td>{item.departureTime.toLocaleString()}</td>
                        <td>{item.arrivalTime.toLocaleString()}</td>
                        <td>{`${item.cityFrom} (${item.flyFrom})`}</td>
                        <td>{`${item.cityTo} (${item.flyTo})`}</td>
                        <td>{item.price}</td>
                    </tr>
                )
            })
        } else {
            info = (
                <div className="no-results-info">
                    No results
                </div>
            )
        }

        return (
            <div>
                <div className="container mt-5 table-wrapper-scroll-y">
                    <Table striped>
                        <thead>
                        <tr>
                            <th>Departure</th>
                            <th>Arrival</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Price in {this.props.currency}</th>
                        </tr>
                        </thead>
                        <tbody className="table-scroller">
                        {items}
                        </tbody>
                    </Table>
                    {info}
                    {loader}
                </div>
            </div>
        )
    }
}

export default connect(
    (state) => {
        const results = [...state.results].map(flight => {
            const arrivalTime = new Date(flight.aTimeUTC * 1000)
            const departureTime = new Date(flight.dTimeUTC * 1000)
            const departureTimeDays = new Date(departureTime)
            departureTimeDays.setHours(0, 0, 0, 0)

            return {
                ...flight,
                arrivalTime,
                departureTime,
                departureTimeDays,
            }
        }).sort((a, b) => {
            if (a.departureTimeDays.getTime() === b.departureTimeDays.getTime()) {
                if (a.price === b.price) {
                    return a.dTimeUTC - b.dTimeUTC
                }
                return a.price - b.price
            }
            return a.departureTimeDays.getTime() - b.departureTimeDays.getTime()
        })

        return {
            results,
            errorMessage: state.errorMessage,
            currency: state.currency,
            loadingResults: state.loadingResults,
        }
    },
    (dispatch) => ({
        setResults: (results) => dispatch(setResults(results)),
        setCurrency: (currency) => dispatch(setCurrency(currency))
    })
)(ResultsForm)
