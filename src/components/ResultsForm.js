import React from 'react'

import SearchForm from "./SearchForm"
import {connect} from "react-redux"
import {Table} from 'reactstrap'
import './ResultsForm.css'

const ResultsForm = (props) => (
    <div>
        <SearchForm/>
        <div className="container mt-5 table-wrapper-scroll-y">
            {props.results && props.results[0] ?
                <Table striped table-fixed>
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Price in {props.currency}</th>
                    </tr>
                    </thead>
                    <tbody className="table-scroller">{props.results.map(function (item, key) {
                        return (
                            <tr key={key}>
                                <td>{new Date(item.dTimeUTC * 1000).toDateString()}</td>
                                <td>{item.flyFrom}</td>
                                <td>{item.flyTo}</td>
                                <td>{item.price}</td>
                            </tr>
                        )

                    })}</tbody>
                </Table> : null}
        </div>
    </div>
)

export default connect(
    (state) => ({
        results: state.results,
        errorMessage: state.errorMessage,
        currency: state.currency,
    }),
)(ResultsForm)
